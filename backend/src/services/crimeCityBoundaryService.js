import combineCrimeBoundaryModel from "../models/combineCrimeBoundary.model.js";

export const getCrimeDataGroupedByCommunity = async () => {
  try {
    console.log("start>>>>>>>>>>>>>>>>>>>>>>>>>>");
    const result = await combineCrimeBoundaryModel.aggregate([
      {
        $group: {
          _id: "$community",
          totalCrimeCount: { $sum: "$crime_count" },
          cityBoundaryData: { $first: "$cityBoundaryData" },
        },
      },
      {
        $project: {
          _id: 0,
          community: "$_id",
          totalCrimeCount: 1,
          cityBoundaryData: 1,
        },
      },
    ]);
    console.log("end>>>>>>>>>>>>>>>>>>>>>");
    return result;
  } catch (error) {
    throw new Error(`Error querying crime data: ${error.message}`);
  }
};
