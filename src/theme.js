import { createTheme } from "@material-ui/core"

let theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 1000,
      lg: 1280,
      xl: 1920,
    },
  },
  palette: {
    primary: {
      main: "#329C89",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "rgba(26, 59, 88, 0.67)",
      contrastText: "#ffffff",
    },
  },

  typography: {
    fontFamily: "Poppins",
    h1: {
      fontSize: "32px",
      lineHeight: "54px",
      fontWeight: "bold",
    },
    h2: {
      fontSize: "28px",
      lineHeight: "48px",
      fontWeight: "normal",
    },
    h3: {
      fontSize: "25px",
      lineHeight: "43px",
      fontWeight: "300",
    },
    h4: {
      fontSize: "22px",
      fontStyle: "normal",
      fontWeight: "600",
      lineHeight: "38px",
    },
    h5: {
      fontSize: "20px",
      fontWeight: "400",
      lineHeight: "32px",
    },
    h6: {
      fontSize: "18px",
      fontWeight: "400",
      lineHeight: "28px",
    },

    subtitle1: {
      fontSize: "12px",
      fontWeight: 500,
      lineHeight: "15px",
      letterSpacing: "0em",
    },
  },

  overrides: {
    MuiInput: {
      input: {
        "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
          "-webkit-appearance": "none",
          display: "none",
        },
      },
    },

    MuiOutlinedInput: {
      root: {
        // background: "#FFFFFF",
        // border: "1px solid #CBDBEA",
        borderRadius: "8px",
      },
      input: {
        // background: "#FFFFFF",
        // border: ,
        borderRadius: "8px",
      },
      // multiline: {
      //   background: "#FFFFFF",
      //   border: "1px solid #CBDBEA",
      //   borderRadius: "8px",
      // },
      // input: {
      //   background: "#FFFFFF",
      //   border: "1px solid #CBDBEA",
      //   borderRadius: "8px",
      // },
    },
    MuiButton: {
      disableElevation: true,
      label: {
        fontWeight: "600",

        textTransform: "none",
      },
      sizeSmall: {
        fontSize: "14px",
      },

      contained: {
        "&:hover": {
          backgroundColor: "#329C89",
        },
        fontSize: "18px",
        fontWeight: "700",
        color: "white",
        backgroundColor: "#329C89",
        boxShadow:
          "0px 0px 0px -0px rgb(0 0 0 / 20%), 0px 0px 0px 0px rgb(0 0 0 / 14%), 0px 0px 0px 0px rgb(0 0 0 / 12%)",

        borderRadius: "8px",
      },

      // root: {
      //   fontSize: "18px",

      //   fontFamily: "Poppins",
      //   lineHeight: "30px",
      //   boxShadow:
      //     "0px 0px 0px -0px rgb(0 0 0 / 20%), 0px 0px 0px 0px rgb(0 0 0 / 14%), 0px 0px 0px 0px rgb(0 0 0 / 12%)",
      //   borderRadius: "30px",
      //   padding: "14px 36px",
      // },

      outlined: {
        fontSize: "23px",

        fontFamily: "Montserrat",
        lineHeight: "30px",
        boxShadow:
          "0px 0px 0px -0px rgb(0 0 0 / 20%), 0px 0px 0px 0px rgb(0 0 0 / 14%), 0px 0px 0px 0px rgb(0 0 0 / 12%)",
        borderRadius: "30px",
        padding: "14px 36px",
      },
    },

    MuiInput: {
      input: {
        "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
          "-webkit-appearance": "none",
          display: "none",
        },
      },
    },

    MuiIconButton: {
      root: {
        padding: "5px",
      },
    },
    MuiSvgIcon: {
      root: {
        fontSize: "30px",
      },
    },
  },
})
theme.overrides = {
  ...theme.overrides,

  MuiButton: {
    ...theme.overrides.MuiButton,
    contained: {
      ...theme.overrides.MuiButton.contained,
      [theme.breakpoints.down("sm")]: {
        fontSize: "18px",
      },
    },
  },
}
theme.typography = {
  ...theme.typography,
  h1: {
    ...theme.typography.h1,
    [theme.breakpoints.down("sm")]: {
      fontSize: "25px",
      lineHeight: "35px",
    },
  },
  h2: {
    ...theme.typography.h2,
    [theme.breakpoints.down("sm")]: {
      fontSize: "22px",
      lineHeight: "27px",
    },
  },
  h3: {
    ...theme.typography.h3,
    [theme.breakpoints.down("sm")]: {
      fontSize: "20px",
      lineHeight: "25px",
    },
  },
  h4: {
    ...theme.typography.h3,
    [theme.breakpoints.down("sm")]: {
      fontSize: "18px",
      lineHeight: "23px",
    },
  },
  h5: {
    ...theme.typography.h5,
    [theme.breakpoints.down("sm")]: {
      fontSize: "14px",
      lineHeight: "22px",
    },
  },
  h6: {
    ...theme.typography.h6,
    [theme.breakpoints.down("sm")]: {
      fontSize: "13px",
      lineHeight: "20px",
    },
  },
  subtitle1: {
    ...theme.typography.h6,
    [theme.breakpoints.down("sm")]: {
      fontSize: "11px",
      lineHeight: "12px",
    },
  },
}
export default theme
