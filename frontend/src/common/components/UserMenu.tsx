import { Box, makeStyles } from "@material-ui/core";
import { Person } from "@material-ui/icons";
import React from "react";
import { UserData } from "../../auth/auth.api";

interface UserMenuProps {
  userData: UserData;
  onLogout: () => void;
}

const userMenuLinks = [
  {
    title: "account",
    url: "/account",
  },
  {
    title: "Redeem code",
    url: "/redeem",
  },
  {
    title: "Coupons",
    url: "/coupons",
  },
  {
    title: "wishlist",
    urL: "/wishlist",
  },
];

const UserMenu: React.FC<UserMenuProps> = ({ userData, onLogout }) => {
  const classes = useStyles();
  return (
    <Box
      display="flex"
      alignItems="center"
      className={`highlightIcon ${classes.userMenuWrapper}`}
      position="relative"
    >
      <Person className={classes.languageIcon} />
      <span className={classes.userName}>{userData.displayName}</span>
      <ul className={classes.userMenu}>
        {userMenuLinks.map((link) => (
          <li className={classes.userMenuItem} key={link.title}>
            {link.title}
          </li>
        ))}
        <li onClick={onLogout} className={classes.userMenuItem}>
          Log out
        </li>
      </ul>
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  userName: {
    color: theme.palette.nav.main,
    textTransform: "uppercase",
    fontSize: "8.75px",
    letterSpacing: "2px",
    textIndent: "-8px",
  },
  userMenuWrapper: {
    marginRight: "16px",
    cursor: "pointer",
    "&:hover ul": {
      visibility: "visible",
    },
  },
  languageIcon: {
    margin: "0 16px",
    cursor: "pointer",
  },
  userMenu: {
    visibility: "hidden",
    position: "absolute",
    top: "25px",
    left: "-20px",
    textAlign: "center",
    backgroundColor: theme.palette.secondary.main,
    minWidth: "180px",
    color: theme.palette.nav.main,
    padding: ".5em 0",
    "&:hover": {
      visibility: "visible",
    },
  },
  userMenuItem: {
    textTransform: "uppercase",
    fontSize: ".825em",
    padding: "8px 0",
    cursor: "pointer",
    "&:hover": {
      color: "white",
    },
  },
}));

export default UserMenu;
