import { Dimensions, Image, StyleSheet } from "react-native";
import React from "react";
import Box from "./Box";
import Text from "./Text";
import useRestaurantDetails from "../hooks/useRestaurantDetails";
import { Ionicons } from "@expo/vector-icons";
import {
  addRestaurantToFavoritesListInFirestore,
  removeRestaurantFromFavoritesInFirestore,
  removeRestaurantFromMatchedInFirestore,
} from "../lib/firebaseHelpers";
import useAuth from "../hooks/useAuth";
import { useTheme } from "@shopify/restyle";
import { Theme } from "../../theme";
import { TouchableOpacity } from "react-native-gesture-handler";

const ProfileRestaurantItem = ({ place_id, favorites }) => {
  const theme = useTheme<Theme>();
  const { orangeDark } = theme.colors;
  const { user } = useAuth();
  const { restaurant, loading } = useRestaurantDetails(place_id);
  const favorited = favorites?.includes(place_id);

  const handleFavoritedPressed = () => {
    if (favorited) removeRestaurantFromFavoritesInFirestore(place_id, user.uid);
    // remove from favorites

    addRestaurantToFavoritesListInFirestore(place_id, user.uid);
  };

  const handleDeletePressed = () => {
    removeRestaurantFromFavoritesInFirestore(place_id, user.uid);
    removeRestaurantFromMatchedInFirestore(place_id, user.uid);
  };
  const tablet = Dimensions.get("window").width > 500;
  return (
    <Box
      width={Dimensions.get("window").width}
      flex={1}
      paddingLeft="l"
      paddingRight="l"
    >
      <Box
        flex={1}
        shadowColor={"black"}
        shadowRadius={8}
        shadowOpacity={0.14}
        shadowOffset={{ width: 0, height: 4 }}
        backgroundColor={"white"}
        borderRadius={10}
      >
        <Box
          flex={1}
          width="100%"
          borderRadius={10}
          flexDirection={"row"}
          backgroundColor={"darkGray"}
          overflow="hidden"
        >
          <Box flex={1} height="100%">
            <Image
              source={{
                uri: restaurant?.photos
                  ? restaurant?.photos[0]?.photoUrl
                  : "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png",
              }}
              style={{ width: "100%", height: "100%" }}
            />
          </Box>
          <Box
            flex={2}
            height="100%"
            flexDirection={"row"}
            justifyContent={"flex-start"}
            alignItems="flex-start"
            padding="s"
          >
            <Box
              flex={1.5}
              height="100%"
              justifyContent={"space-between"}
              alignItems="flex-start"
              paddingBottom="s"
            >
              <Text variant="body" color="white">
                {restaurant?.name}
              </Text>

              <Ionicons
                name="md-car-outline"
                size={tablet ? 50 : 32}
                color={"white"}
                onPress={() => {}}
              />
            </Box>

            <Box flex={0.5}></Box>
          </Box>

          <Box
            position={"absolute"}
            top={0}
            right={0}
            padding="m"
            paddingTop="s"
            height="100%"
            justifyContent={"space-between"}
            alignItems="flex-end"
          >
            <Ionicons
              name="md-star"
              size={tablet ? 36 : 25}
              color={favorited ? orangeDark : "white"}
              onPress={handleFavoritedPressed}
            />
            <TouchableOpacity onPress={handleDeletePressed}>
              <Text variant="body" color="white">
                Delete
              </Text>
            </TouchableOpacity>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileRestaurantItem;
