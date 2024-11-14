import { getCrimeDataGroupedByCommunity } from "../services/crimeCityBoundaryService.js";

export const getCrimeData = async (req, res) => {
    try {
      const data = await getCrimeDataGroupedByCommunity();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };