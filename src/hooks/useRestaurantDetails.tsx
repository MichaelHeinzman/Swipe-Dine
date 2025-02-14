import { useEffect, useState } from "react";
import { RestaurantDetails as RestaurantDetailsGoogle } from "../api/google/googleTypes";
import { getRestaurantDetailsFromGooglePlaces } from "../api/google/google";
import {
  checkDocumentExists,
  uploadRestaurantToFirestore,
} from "../lib/firebaseHelpers";
import { getUserLocation } from "../utils/geolocation";
import { distanceTo } from "geolocation-utils";
import { convertDistance } from "geolib";

const useRestaurantDetails = (
  id: string,
  discover = false,
  filters = {},
  viewDetails = true
) => {
  const [restaurant, setRestaurant] = useState<RestaurantDetailsGoogle>();
  const [loading, setLoading] = useState(false);
  const handleNewRestaurant = async (id, filters, setRestaurant) => {
    try {
      const data = await getRestaurantDetailsFromGooglePlaces(id);
      if (data.result) {
        setRestaurant(data.result);
        await updateExistingRestaurant(data.result, filters);
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleExistingRestaurant = async (
    existsResult,
    filters,
    setRestaurant
  ) => {
    const existingRestaurant = existsResult.data;
    const newFilters = Object.entries(filters)
      .filter(([key, value]) => value === true)
      .map(([key, value]) => key);

    if (newFilters.length > 0) {
      await updateExistingRestaurant(existingRestaurant, filters);
    }

    setRestaurant(existingRestaurant);
  };

  const updateExistingRestaurant = async (existingRestaurant, filters) => {
    await uploadRestaurantToFirestore(existingRestaurant, filters);
  };

  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      setLoading(true);
      const existsResult = await checkDocumentExists(id);

      if (existsResult.exists && existsResult.data?.reviews) {
        await handleExistingRestaurant(existsResult, filters, setRestaurant);
        setLoading(false);
      } else {
        // If useRestaurantDetails was called in a discover page don't fetch details.
        !discover && (await handleNewRestaurant(id, filters, setRestaurant));
        setRestaurant(existsResult.data);
        setLoading(false);
      }
    };

    if (!restaurant) {
      fetchRestaurantDetails();
    }
  }, [viewDetails]);

  return {
    restaurant: restaurant ? { ...restaurant } : null,
    loading,
  };
};

export default useRestaurantDetails;
