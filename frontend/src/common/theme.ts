import { createTheme } from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";
import { getDisplayName } from "next/dist/next-server/lib/utils";

// Create a theme instance.
const theme = createTheme({
  overrides: {
    MuiCssBaseline: {
      "@global": {
        ".authForm": {
          maxWidth: "380px",
          width: "100%",
          marginTop: "20px",
        },
        ".link": {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          textDecoration: "underline",
          cursor: "pointer",
        },
        ul: {
          listStyleType: "none",
          paddingInlineStart: "0",
          margin: "0",
        },
        //TODO: fix the hover underline effect
        "link:hover": {
          textDecoration: "none",
        },
      },
    },
    MuiIconButton: {
      root: {
        padding: "calc(20px - 0.75rem)",
        borderRadius: "4px",
        color: "white",
        "&:hover": {
          backgroundColor: "rgba(255,255,255, 0.16)",
        },
      },
    },
    MuiLink: {
      root: {
        "&:hover": {
          textDecoration: "none",
        },
        "& .MuiTypography-body1": {
          color: "white",
        },
        "&.MuiTypography-colorPrimary": {
          color: "white",
          display: "inline",
        },
      },
    },
    MuiTypography: {
      body1: {
        fontSize: "0.875rem",
        color: "rgba(255,255,255,0.72)",
      },
    },
  },
  palette: {
    nav: {
      main: "#ccc",
      light: "rgb(0, 120, 242)",
    },
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#2a2a2a",
      light: "rgba(255,255,255,0.72)",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#fff",
    },
  },
});

export default theme;
