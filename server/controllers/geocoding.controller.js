import { GeocodingService } from "../services/geocoding.service.js";

export const GeocodingController = {
  async getCoordinates(req, res) {
    const { location } = req.body;

    if (!location) {
      return res.json({ success: false, message: "Location is required" });
    }

    const result = await GeocodingService.getCoordinates(location);

    if (result) {
      res.json({ success: true, data: result });
    } else {
      res.json({ success: false, message: "Location not found" });
    }
  },

  async reverseGeocode(req, res) {
    const { lat, lon } = req.body;

    if (!lat || !lon) {
      return res.json({
        success: false,
        message: "Latitude and longitude are required",
      });
    }

    const result = await GeocodingService.reverseGeocode(lat, lon);
    res.json({ success: true, data: result });
  },
};
