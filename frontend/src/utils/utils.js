import { mapColorObj, defaultColor } from "./constants";

export const getRandomNumber = () => {
  return Math.floor(Math.random() * 201); // 201 to include 200
};

export const getUniqueID = (item) => {
  const communityName = item.name || "unknownCommunity";
  // Create a unique ID by concatenating properties
  const uniqueID = communityName.replace(/\s+/g, "-") + "-" + Date.now() + "-" + Math. floor(Math. random() * 100);
  // console.log("uniqueID============"+uniqueID);
  return uniqueID;
};

  // Color mapping based on crime rate
  export const getCrimeRateColor = (crimeRate) => {
    for (const colorObj of mapColorObj) {
      if (Array.isArray(colorObj.range)) {
        const [min, max] = colorObj.range;
        if (crimeRate >= min && crimeRate < max) {
          return colorObj.color;
        }
      } else if (crimeRate > colorObj.range) {
        return colorObj.color;
      }
    }
    return defaultColor;
  };
