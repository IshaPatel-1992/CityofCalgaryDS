import { defaultColor, mapColorObjYearly } from "./constants.js";

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
  // export const getCrimeRateColor = (crimeRate) => {
  //   for (const colorObj of mapColorObj) {
  //     if (Array.isArray(colorObj.range)) {
  //       const [min, max] = colorObj.range;
  //       if (crimeRate >= min && crimeRate < max) {
  //         return colorObj.color;
  //       }
  //     } else if (crimeRate > colorObj.range) {
  //       return colorObj.color;
  //     }
  //   }
  //   return defaultColor;
  // };

  export const getCrimeRateColor = (crimeRate, mapColorObj) => {
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

  export const sleep = ms => new Promise(r => setTimeout(r, ms));


  export const generateDynamicColorObj = async(numOfYear) => {
    return mapColorObjYearly.map(({ range, color }) => {
      const newRange = range[1]? [range[0] * numOfYear, range[1] * numOfYear] : [range[0] * numOfYear]; // Scale range by years
      return {
        range: newRange,
        color,
        label: newRange[1] 
        ? `${newRange[0]} ≤ Crime Number < ${newRange[1]}`
        : `${newRange[0]} ≤ Crime Number`
      };
    });
  };


  export const calculateYearsFrom2018 = () => {
    const currentYear = new Date().getFullYear(); // Get the current year
    return currentYear - 2018 + 1; // Include 2018 as part of the range
  };
