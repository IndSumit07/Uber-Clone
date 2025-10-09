import axios from "axios";

let lastRequest = 0;

export class DistanceService {
  static async calculateDistanceTime(origin, destination) {
    // Rate limiting
    const now = Date.now();
    if (now - lastRequest < 1000) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    lastRequest = Date.now();

    try {
      // First, geocode both locations
      const [originCoords, destCoords] = await Promise.all([
        this.geocodeLocation(origin),
        this.geocodeLocation(destination),
      ]);

      if (!originCoords || !destCoords) {
        return null;
      }

      // Calculate distance and time using OpenRouteService
      const route = await this.getRoute(
        originCoords.longitude,
        originCoords.latitude,
        destCoords.longitude,
        destCoords.latitude
      );

      if (route) {
        return {
          origin: {
            name: origin,
            ...originCoords,
          },
          destination: {
            name: destination,
            ...destCoords,
          },
          distance: route.distance,
          duration: route.duration,
          success: true,
        };
      }

      return null;
    } catch (error) {
      console.error("Distance calculation error:", error);
      return null;
    }
  }

  static async geocodeLocation(locationName) {
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
        latitude: parseFloat(result.lat),
        longitude: parseFloat(result.lon),
        address: result.display_name,
      };
    }
    return null;
  }

  static async getRoute(startLon, startLat, endLon, endLat) {
    // Using OpenRouteService for routing (free tier available)
    const response = await axios.get(
      `https://api.openrouteservice.org/v2/directions/driving-car`,
      {
        params: {
          start: `${startLon},${startLat}`,
          end: `${endLon},${endLat}`,
        },
        headers: {
          Authorization: process.env.OPENROUTE_API_KEY, // Get free API key from openrouteservice.org
        },
      }
    );

    if (response.data && response.data.features.length > 0) {
      const route = response.data.features[0].properties.segments[0];
      return {
        distance: (route.distance / 1000).toFixed(2), // Convert to km
        duration: Math.round(route.duration / 60), // Convert to minutes
      };
    }
    return null;
  }

  // Alternative: Use MapBox API (also has free tier)
  static async getRouteMapBox(startLon, startLat, endLon, endLat) {
    const response = await axios.get(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${startLon},${startLat};${endLon},${endLat}`,
      {
        params: {
          access_token: import.meta.env.VITE_MAPBOX_API_KEY, // Get from mapbox.com
          geometries: "geojson",
        },
      }
    );

    if (response.data && response.data.routes.length > 0) {
      const route = response.data.routes[0];
      return {
        distance: (route.distance / 1000).toFixed(2), // km
        duration: Math.round(route.duration / 60), // minutes
      };
    }
    return null;
  }
}
