import React from "react";
import AppBar from "@material-ui/core/AppBar";
import { Box, Button, Link, makeStyles, useTheme } from "@material-ui/core";
import { LogoIcon } from "../../../assets/icons";
import NavLink from "./NavLink";
import { useRouter } from "next/dist/client/router";
import { Language, PersonAdd } from "@material-ui/icons";

const links = [
  {
    title: "Store",
    url: "/",
  },
  {
    title: "News",
    url: "/news",
  },
  {
    title: "Faq",
    url: "/faq",
  },
  {
    title: "Unreal engine",
    url: "https://www.unrealengine.com/",
  },
];

const Header: React.FC = () => {
  const classes = useStyles();
  const router = useRouter();
  const theme = useTheme();
  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Box>
        <LogoIcon className={classes.logo} />
      </Box>
      <ul className={classes.navList}>
        {links.map((link) => (
          <NavLink
            key={link.title}
            {...link}
            isActive={router.pathname === link.url}
          />
        ))}
      </ul>
      <Box marginLeft="auto" display="flex" height="100%" alignItems="center">
        <Box
          display="flex"
          alignItems="center"
          className={classes.highlightIcon}
        >
          <Language className={classes.languageIcon} />
        </Box>
        <Link
          href="/login"
          className={`link ${classes.highlightIcon} ${classes.signInWrapper}`}
        >
          <PersonAdd />
          <span className={classes.signIn}>Sign In</span>
        </Link>
        <Button className={classes.getEpic}>get epic games</Button>
      </Box>
    </AppBar>
  );
};

const useStyles = makeStyles((theme) => ({
  getEpic: {
    backgroundColor: theme.palette.nav.light,
    height: "100%",
    color: theme.palette.nav.main,
    fontSize: "9.75px",
    borderRadius: "0px",
    letterSpacing: "1px",
    "&:hover": {
      backgroundColor: "#007dfc",
    },
  },
  signIn: {
    color: theme.palette.nav.main,
    textTransform: "uppercase",
    fontSize: "9.75px",
    letterSpacing: "2px",
    marginLeft: "16px",
  },
  signInWrapper: {
    "&.MuiTypography-colorPrimary": {
      display: "flex",
    },
    alignItems: "center",
    height: "100%",
    margin: "0 16px",
    "&:hover": {
      textDecoration: "none",
    },
  },
  highlightIcon: {
    "& svg": {
      color: theme.palette.nav.main,
    },
    "&:hover svg": {
      color: "#e7e7e7",
    },
  },
  languageIcon: {
    margin: "0 16px",
    cursor: "pointer",
  },
  appBar: {
    backgroundColor: theme.palette.secondary.main,
    height: "52px",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
  },
  logo: {
    color: "white",
    width: "36px",
    height: "36px",
    marginLeft: "1em",
    marginTop: "6px",
  },
  navList: {
    display: "flex",
    marginLeft: "16px",
    height: "100%",
  },
}));

export default Header;
