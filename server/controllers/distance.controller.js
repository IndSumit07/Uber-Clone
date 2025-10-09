import { DistanceService } from "../services/distance.service.js";

export const DistanceController = {
  async calculateRoute(req, res) {
    const { origin, destination } = req.body;

    if (!origin || !destination) {
      return res.json({
        success: false,
        message: "Origin and destination are required",
      });
    }

    const result = await DistanceService.calculateDistanceTime(
      origin,
      destination
    );

    if (result) {
      res.json({ success: true, data: result });
    } else {
      res.json({ success: false, message: "Could not calculate route" });
    }
  },
};
