import axios from "axios";

let lastRequest = 0;

export class GeocodingService {
  static async getCoordinates(locationName) {
    // Simple rate limiting - wait 1 second between requests
    const now = Date.now();
    if (now - lastRequest < 1000) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    lastRequest = Date.now();

    const response = await axios.get(
      "https://nominatim.openstreetmap.org/search",
      {
        params: {
          q: locationName,
          format: "json",
          limit: 1,
        },
        headers: {
          "User-Agent": "UberApp/1.0 (your-email@domain.com)",
          Referer: "UberApp",
        },
      }
    );

    if (response.data && response.data.length > 0) {
      const result = response.data[0];
      return {
        latitude: result.lat,
        longitude: result.lon,
        address: result.display_name,
      };
    }

    return null;
  }

  static async reverseGeocode(lat, lon) {
    const now = Date.now();
    if (now - lastRequest < 1000) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    lastRequest = Date.now();

    const response = await axios.get(
      "https://nominatim.openstreetmap.org/reverse",
      {
        params: {
          lat: lat,
          lon: lon,
          format: "json",
        },
        headers: {
          "User-Agent": "UberApp/1.0 (your-email@domain.com)",
          Referer: "UberApp",
        },
      }
    );

    return {
      address: response.data.display_name,
    };
  }
}
