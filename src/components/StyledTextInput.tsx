import { KeyboardTypeOptions, TextInput } from "react-native";
import {
  SpacingProps,
  BorderProps,
  BackgroundColorProps,
  VariantProps,
  useRestyle,
  createVariant,
  composeRestyleFunctions,
  useTheme,
} from "@shopify/restyle";
import { Theme } from "../../theme";
import Text from "./Text";
import Box from "./Box";
import LinearGradient from "./LinearGradient";

const restyleFunctions = composeRestyleFunctions<Theme, RestyleProps>([
  createVariant({ themeKey: "inputVariants" }),
]);

type RestyleProps = SpacingProps<Theme> &
  BorderProps<Theme> &
  BackgroundColorProps<Theme> &
  VariantProps<Theme, "inputVariants">;

type Props = RestyleProps & {
  placeholder: string;
  keyboardType: KeyboardTypeOptions;
  value: string;
  message: string | null;
  onChangeText: Function;
  secure?: boolean;
  onEndSubmit?: () => void;
  color?: string;
};

const StyledTextInput = ({
  placeholder,
  keyboardType,
  message,
  value,
  onChangeText,
  secure,
  color,
  onEndSubmit,
  ...rest
}: Props) => {
  const props = useRestyle(restyleFunctions, rest);
  const theme = useTheme();
  const { success, red } = theme.colors;
  return (
    <>
      <TextInput
        {...props}
        placeholder={placeholder}
        keyboardType={keyboardType}
        value={value}
        onChangeText={(text) => onChangeText(text)}
        secureTextEntry={secure}
        placeholderTextColor={
          message ? red : color ? theme.colors[color] : success
        }
        onEndEditing={onEndSubmit ? onEndSubmit : () => {}}
      />
      {message && (
        <Box
          width="100%"
          borderRadius={5}
          flexDirection="row"
          justifyContent="flex-start"
          alignItems="center"
          overflow="hidden"
        >
          <LinearGradient variant="error" gradient />
          <Box padding="s">
            <Text variant={"body"} fontWeight={"normal"} color="white">
              {message}
            </Text>
          </Box>
        </Box>
      )}
    </>
  );
};

export default StyledTextInput;
