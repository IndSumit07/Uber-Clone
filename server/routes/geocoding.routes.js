import express from "express";
import { GeocodingController } from "../controllers/geocoding.controller.js";

const geocodingRouter = express.Router();

geocodingRouter.post("/geocode", GeocodingController.getCoordinates);
geocodingRouter.post("/reverse-geocode", GeocodingController.reverseGeocode);

export default geocodingRouter;
