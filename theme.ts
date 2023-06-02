import { createTheme } from "@shopify/restyle";

const palette = {
  purpleLight: "#8C6FF7",
  purplePrimary: "#5A31F4",
  purpleDark: "#3F22AB",

  greenLight: "#56DCBA",
  greenPrimary: "#0ECD9D",
  greenDark: "#0A906E",

  orangeLight: "#FECC00",
  orangePrimary: "#FE8C00",
  orangeDark: "#FE3C00",
  pinkRed: "#ff5252",
  redLight: "#ff4000",
  redPrimary: "#ff3000",
  redDark: "#ff1000",
  darkGray: "#333",
  grayPrimary: "#d0d0d0",
  grayLight: "#E0E0E0",

  transparent: "transparent",
  black: "#0B0B0B",
  white: "#FFFFFF",
};

const theme = createTheme({
  colors: {
    mainBackground: palette.white,
    mainForeground: palette.black,

    cardPrimaryBackground: palette.white,
    cardShadowColor: "#000",
    secondaryCardBackground: palette.white,
    secondaryCardText: palette.grayPrimary,
    primaryCardText: palette.white,

    buttonPrimaryBackground: palette.greenLight,
    buttonPrimaryText: palette.white,

    error: palette.pinkRed,
    success: palette.greenLight,
    orangeDark: palette.orangeDark,
    orange: palette.orangePrimary,
    orangeLight: palette.orangeLight,

    redDark: palette.redDark,
    red: palette.redPrimary,
    redLight: palette.redLight,

    greenDark: palette.greenDark,
    green: palette.greenPrimary,
    greenLight: palette.greenLight,

    darkGray: palette.darkGray,
    gray: palette.grayPrimary,
    grayLight: palette.grayLight,
    transparent: palette.transparent,
    black: palette.black,
    white: palette.white,
  },
  zIndices: {
    ["-z-30"]: -30,
    ["-z-20"]: -20,
    ["-z-10"]: -10,
    ["z-0"]: 0,
    ["z-10"]: 10,
    ["z-20"]: 20,
    ["z-30"]: 30,
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
    auto: "auto",
  },

  inputVariants: {
    defaults: {
      height: 60,
    },
    login: {
      backgroundColor: "grayLight",
      padding: "s",
      borderRadius: 4,
      width: { phone: "100%", tablet: "100%" },
      flex: 1,
      minHeight: { phone: 50 },
      maxHeight: { phone: 60, tablet: 70 },
    },
  },
  textVariants: {
    defaults: {},
    logo: {
      fontWeight: "bold",
      fontSize: 48,
      lineHeight: 48.5,
      color: "orange",
    },
    header: {
      fontWeight: "bold",
      fontSize: { phone: 34, tablet: 48 },
      color: "black",
    },
    subheader: {
      fontWeight: "600",
      fontSize: { phone: 28, tablet: 34 },
      color: "black",
    },
    body: {
      fontSize: { phone: 16, tablet: 28 },
      color: "black",
    },
  },
  buttonVariants: {
    defaults: {
      width: "100%",
      borderRadius: 10,
      flexDirection: "row",
      alignItems: "center",
      overflow: "hidden",
    },
    login: {
      width: "100%",
      flex: 1,
      color: "white",
      backgroundColor: "darkGray",
      justifyContent: "center",
    },
    logout: {
      zIndex: "z-0",
      flex: 1,
    },
    swipeScreenButton: {
      height: 60,
      width: 60,
    },
    ["auth-nav"]: {
      width: "100%",
      flex: 1,
    },
  },
  cardVariants: {
    defaults: {
      // We can define defaults for the variant here.
      // This will be applied after the defaults passed to createVariant and before the variant defined below.
      width: "100%",
      height: "100%",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
      padding: {
        phone: "s",
        tablet: "m",
      },
    },
    regular: {
      // We can refer to other values in the theme here, and use responsive props
      padding: {
        phone: "s",
        tablet: "m",
      },
    },
    swipe: {
      backgroundColor: "cardPrimaryBackground",
      borderRadius: 20,
      width: "95%",
      flex: 15,
      shadowColor: "cardShadowColor",
      overflow: "hidden",
      position: "absolute",
      padding: {
        phone: 0,
        tablet: 0,
      },
    },
    elevated: {
      padding: {
        phone: "s",
        tablet: "m",
      },
      shadowColor: "cardShadowColor",
      shadowOpacity: 0.2,
      shadowOffset: { width: 0, height: 5 },
      shadowRadius: 15,
      elevation: 5,
    },
  },
  linearGradientVariants: {
    defaults: {
      height: "100%",
      width: "100%",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
    },
    main: {
      zIndex: "z-10",
    },
    login: {},
    red: {
      zIndex: "z-10",
    },
    green: {
      zIndex: "z-10",
    },
    shadow: {
      zIndex: "z-0",
    },
    burger: {},
    white: {
      zIndex: "z-0",
    },
    error: {
      zIndex: "z-0",
    },
    gray: {
      zIndex: "z-0",
    },
  },

  logoVariants: {
    defaults: {
      color: "orangeDark",
    },
  },
  defaults: {
    // We can define a default text variant here.
  },

  breakpoints: {
    phone: {
      width: 0,
      height: 0,
    },
    longPhone: {
      width: 0,
      height: 812,
    },
    tablet: {
      width: 481,
      height: 768,
    },
    largeTablet: 1024,
  },
});

export type Theme = typeof theme;

const darkTheme: Theme = {
  ...theme,
  colors: {
    ...theme.colors,
    mainBackground: palette.black,
    mainForeground: palette.white,

    secondaryCardBackground: palette.darkGray,
    secondaryCardText: palette.white,
  },
};
export { darkTheme, theme };
