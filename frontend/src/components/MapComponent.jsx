import React, { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { getUniqueID } from "../utils/utils";
import LegendComponent from "./LegendComponent";
import { getCrimeRateColor } from "../utils/utils";
import Dashboard from "./Dashboard";
import { sleep } from "../utils/utils";

const MapComponent = () => {
  const mapContainer = useRef(null);
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState(null);
  const dashboardRef = useRef(null);
  const dashboardSectionRef = useRef(null);
  const [shouldScroll, setShouldScroll] = useState(false);
  const [isObservered, setIsObserver] = useState(false);

  useEffect(() => {
    if (shouldScroll && dashboardSectionRef.current) {
      // Create a MutationObserver to watch changes in the DOM
      if(isObservered) {
        const dashboardElement = dashboardSectionRef.current;
        const dashboardHeight = dashboardElement.offsetHeight;
        const viewportHeight = window.innerHeight;
        const scrollPosition =
          dashboardElement.getBoundingClientRect().top +
          window.scrollY -
          (viewportHeight - dashboardHeight);

        window.scrollTo({
          top: scrollPosition,
          behavior: "smooth",
        });

        setShouldScroll(false);
      }else {
        const observer = new MutationObserver(() => {
          if (dashboardSectionRef.current) {
            const dashboardElement = dashboardSectionRef.current;
            const dashboardHeight = dashboardElement.offsetHeight;
            const viewportHeight = window.innerHeight;
            const scrollPosition =
              dashboardElement.getBoundingClientRect().top +
              window.scrollY -
              (viewportHeight - dashboardHeight);
  
            window.scrollTo({
              top: scrollPosition,
              behavior: "smooth",
            });
  
            setShouldScroll(false);
            setIsObserver(true);
          }
        });
  
        // Start observing the Dashboard section for changes (like rendering or height updates)
        observer.observe(dashboardSectionRef.current, {
          childList: true,
          subtree: true,
          attributes: true,
        });
  
        // Clean up observer on unmount
        return () => {
          if (observer) {
            observer.disconnect();
          }
        };
      }

    }
  }, [shouldScroll]);

  useEffect(() => {
    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: "https://tiles.openfreemap.org/styles/liberty", // OpenFreeMap tiles
      center: [-114.0719, 51.0447],
      zoom: 11,
    });

    let popup;

    map.on("load", () => {
      map.setStyle({
        ...map.getStyle(),
        glyphs: "https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf",
      });
      map.addControl(new maplibregl.NavigationControl(), "top-right");

      // Fetch community data
      fetch("/api/crimeboundarydata")
        .then((response) => response.json())
        .then((data) => {
          data.forEach((item) => {
            const uniqueID = getUniqueID(item);
            // Ensure coordinates form a closed polygon loop
            const coordinates =
              item.cityBoundaryData.geometry.coordinates[0][0].map((coord) => [
                coord[0],
                coord[1],
              ]);
            if (coordinates[0] !== coordinates[coordinates.length - 1]) {
              coordinates.push(coordinates[0]);
            }

            const crimeRate = item.totalCrimeCount;
            const communityName = item.cityBoundaryData.properties.name;
            const fillColor = getCrimeRateColor(crimeRate);

            map.addSource(uniqueID, {
              type: "geojson",
              data: {
                type: "Feature",
                geometry: {
                  type: "Polygon",
                  coordinates: [coordinates],
                },
                properties: {
                  communityName,
                  // address: item.class,
                  crimeRate,
                },
              },
            });

            //       // Add polygon fill layer
            map.addLayer({
              id: uniqueID,
              type: "fill",
              source: uniqueID,
              layout: {},
              paint: {
                "fill-color": fillColor,
                "fill-opacity": 0.6, // Set opacity
              },
            });

            //       // Add outline to the polygon for clearer boundaries
            map.addLayer({
              id: `${uniqueID}-outline`,
              type: "line",
              source: uniqueID,
              layout: {},
              paint: {
                "line-color": "#911b14", // Black outline for contrast
                "line-width": 2, // Thicker outline
              },
            });

            //add crime count as a label
            // map.addLayer({
            //   id: `${uniqueID}-label`,
            //   type: "symbol",
            //   source: uniqueID,
            //   layout: {
            //     "text-field": `${crimeRate}`,
            //     "text-size": [
            //       "interpolate",
            //       ["linear"],
            //       ["zoom"],
            //       6,
            //       8,
            //       10,
            //       12,
            //       14,
            //       16,
            //     ],
            //     "text-offset": [0, 1.5], // Offset to place label nicely
            //     "text-anchor": "top",
            //   },
            //   paint: {
            //     "text-color": "#000",
            //   },
            // });

            map.on("mouseenter", uniqueID, (e) => {
              map.getCanvas().style.cursor = "pointer";
              const coordinates = e.lngLat;
              const properties = e.features[0].properties;

              if (popup) {
                popup.remove();
              }

              popup = new maplibregl.Popup({
                closeButton: false,
                closeOnClick: false,
              })
                .setLngLat(coordinates)
                .setHTML(
                  `<strong>${properties.communityName}</strong><br/>Crime Count: ${properties.crimeRate}`
                )
                .addTo(map);
            });

            map.on("mouseleave", uniqueID, () => {
              map.getCanvas().style.cursor = "";
            });

            // Add an event listener for when the mouse leaves the map container
            map.getContainer().addEventListener("mouseout", () => {
              if (popup) {
                popup.remove();
              }
            });

            map.on("click", uniqueID, (e) => {
              const properties = e.features[0].properties;

              setDetails({
                name: properties.communityName,
                crimeRate: properties.crimeRate,
                year: null,
              });

              // if (dashboardRef.current) {
              //   dashboardRef.current.resetSeletecYear();
              // }
              dashboardRef.current?.resetSeletecYear();
              setShouldScroll(true);
            });
          });
        })
        .then(() => setLoading(false))
        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoading(false);
        });
    });

    return () => map.remove();
  }, []);

  return (
    <div>
      {loading && <div>Loading map data...</div>}
      <div
        ref={mapContainer}
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
        }}
      >
        <div ref={mapContainer} style={{ width: "70%", height: "400px" }} />
      </div>
      <LegendComponent
        style={{ width: "30%", padding: "10px", marginLeft: "10px" }}
      />      
      {details && (
        <div ref={dashboardSectionRef}>
          <Dashboard ref={dashboardRef} communityName={details.name} />
        </div>
      )}
    </div>
  );
};

export default MapComponent;