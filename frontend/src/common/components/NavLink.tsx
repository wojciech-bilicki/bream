import { Link, makeStyles } from "@material-ui/core";
import React from "react";

interface NavLinkProps {
  title: string;
  url: string;
  isActive?: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ isActive, url, title }) => {
  const classes = useStyles({ isActive });
  return (
    <li className={classes.navLinkWrapper}>
      <Link href={url} classes={{ root: classes.link }}>
        {title}
      </Link>
    </li>
  );
};

type StyleProps = Pick<NavLinkProps, "isActive">;

const useStyles = makeStyles((theme) => ({
  navLinkWrapper: {
    textTransform: "uppercase",
    fontSize: "10px",
    letterSpacing: "2px",
  },
  link: {
    "&.MuiTypography-colorPrimary": {
      color: theme.palette.nav.main,
      display: "flex",
    },
    alignItems: "center",
    padding: "0 12px",
    height: "100%",
    position: "relative",
    "&:hover": {
      textDecoration: "none",
      color: "#e7e7e7",
      "&:before": {
        height: "5px",
      },
    },
    "&:before": {
      content: "''",
      backgroundColor: theme.palette.nav.light,
      position: "absolute",
      left: "0",
      bottom: "0",
      width: "100%",
      height: (props: StyleProps) => (props.isActive ? "5px" : "0"),
      transition: "height .2s ease-in-out",
    },
  },
}));

export default NavLink;
