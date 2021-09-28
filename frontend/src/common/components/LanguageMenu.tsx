import { Box, makeStyles } from "@material-ui/core";
import { Language } from "@material-ui/icons";
import React from "react";

const languages = ["English", "Deutsch", "Polski"];

const LanguageMenu: React.FC = () => {
  const classes = useStyles();
  return (
    <Box
      display="flex"
      alignItems="center"
      className={`highlightIcon ${classes.languageWrapper}`}
      position="relative"
    >
      <Language className={classes.languageIcon} />
      <ul className={classes.languageList}>
        {languages.map((lang) => (
          <li className={classes.languageItem} key={lang}>
            {lang}
          </li>
        ))}
      </ul>
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  languageWrapper: {
    cursor: "pointer",
    "&:hover ul": {
      visibility: "visible",
    },
  },
  languageIcon: {
    margin: "0 16px",
    cursor: "pointer",
  },
  languageList: {
    visibility: "hidden",
    position: "absolute",
    top: "25px",
    left: "-60px",
    textAlign: "center",
    backgroundColor: theme.palette.secondary.main,
    minWidth: "180px",
    color: theme.palette.nav.main,
    padding: ".5em 0",
    "&:hover": {
      visibility: "visible",
    },
  },
  languageItem: {
    textTransform: "uppercase",
    fontSize: ".825em",
    padding: "8px 0",
    cursor: "pointer",
    "&:hover": {
      color: "white",
    },
  },
}));

export default LanguageMenu;
