import axios from "axios";
import { Dimensions } from "react-native";
import Constants from "expo-constants";
const SECONDARY_API_KEY = Constants.expoConfig.extra.GOOGLE_PLACES_API_KEY_ONE;
const API_KEY = Constants.expoConfig.extra.GOOGLE_PLACES_API_KEY_TWO;
const URL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json";
const URL_DETAILS = "https://maps.googleapis.com/maps/api/place/details/json";

interface GooglePlacesParams {
  location: string;
  key: string;
  keyword: string;
  rankby?: string;
  opennow: boolean;
  pagetoken?: string;
  type?: string;
}

const getGooglePlaces = async (
  location = null,
  nextPageToken = null,
  filters = null
) => {
  try {
    const keywords = Object.entries(filters ? filters : {})
      .filter(([_, value]) => value === true)
      .map(([key]) => key.toLowerCase())
      .join(" | ");

    const userLocation = `${location.latitude},${location.longitude}`;
    const params: GooglePlacesParams = {
      location: userLocation,
      key: SECONDARY_API_KEY,
      keyword: keywords,
      opennow: true,
      rankby: "distance",
      type: "food",
    };

    if (nextPageToken) {
      params.pagetoken = nextPageToken;
    }

    const response = await axios.get(URL, { params });

    let error;
    if (response.data.results.length === 0) error = true;
    return {
      results: response.data.results,
      nextPageToken: response.data.next_page_token,
      error: error,
    };
  } catch (error) {
    return { results: null, nextPageToken: null, error: error.message };
  }
};

const getRestaurantDetailsFromGooglePlaces = async (placeId: string) => {
  try {
    const response = await axios.get(URL_DETAILS, {
      params: {
        key: SECONDARY_API_KEY,
        place_id: placeId,
      },
    });
    return { result: response.data.result, error: null };
  } catch (error) {
    return { result: null, error: error.message };
  }
};

const getPhotoURL = (photoReference) => {
  const baseUrl = "https://maps.googleapis.com/maps/api/place/photo";
  const { width, height } = Dimensions.get("window");
  const maxWidth = Math.round(width * 0.9);
  const maxHeight = Math.round(height * 0.9);
  const url = `${baseUrl}?maxwidth=${maxWidth}&maxheight=${maxHeight}&photoreference=${photoReference}&key=${SECONDARY_API_KEY}`;
  return url;
};

import storage from "@react-native-firebase/storage";
global.Buffer = global.Buffer || require("buffer").Buffer;
const saveImage = async (photoReference, place_id) => {
  try {
    const baseUrl = "https://maps.googleapis.com/maps/api/place/photo";
    const { width, height } = Dimensions.get("window");
    const maxWidth = Math.round(width * 0.9);
    const maxHeight = Math.round(height * 0.9);
    const url = `${baseUrl}?maxwidth=${maxWidth}&maxheight=${maxHeight}&photoreference=${photoReference}&key=${SECONDARY_API_KEY}`;

    const response = await axios.get(url, { responseType: "arraybuffer" });
    const imageData = Buffer.from(response.data, "binary");

    // Generate a unique filename or use a custom one
    const filename = `places/${place_id}/${Date.now()}.jpg`;

    // Upload the image to Firebase Storage
    const reference = storage().ref(filename);
    await reference.put(imageData);

    // Get the storage URL for the uploaded image
    const storageUrl = await reference.getDownloadURL();
    return storageUrl;
  } catch (error) {
    console.error("Error occurred while saving the image:", error);
    throw new Error("Failed to save the image.");
  }
};

export {
  getGooglePlaces,
  getRestaurantDetailsFromGooglePlaces,
  getPhotoURL,
  saveImage,
};
