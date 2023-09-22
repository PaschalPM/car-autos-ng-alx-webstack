import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { urlPath, isPathActive } from "../libs/utils";

type Props = {
  open: boolean;
  ListItemMainIcon: React.ReactNode;
  uniqueText: string;
  color?: string;
  notNav?: boolean;
  handleClick?: () => void;
};

const TempListItem = ({
  open,
  uniqueText,
  color,
  notNav,
  ListItemMainIcon,
  handleClick,
  isActive,
}: Props & {
  isActive: boolean;
}) => {
  return (
    <ListItemButton
      onClick={() => {
        notNav && handleClick && handleClick();
      }}
      sx={{
        minHeight: 48,
        justifyContent: open ? "initial" : "center",
        px: 2.5,
      }}
    >
      <ListItemIcon
        sx={{
          minWidth: 0,
          mr: open ? 3 : "auto",
          justifyContent: "center",
          color: `${isActive ? "#fff" : color ? color : "primary.light"}`,
        }}
      >
        {ListItemMainIcon}
      </ListItemIcon>
      <ListItemText
        primary={uniqueText}
        sx={{
          opacity: open ? 1 : 0,
          color: `${isActive ? "#fff" : color ? color : "primary.light"}`,
        }}
      />
    </ListItemButton>
  );
};

export default function MyListItem({
  open,
  ListItemMainIcon,
  uniqueText,
  color,
  notNav,
  handleClick,
}: Props) {
  const { pathname } = useLocation();
  const isActive = isPathActive(pathname, urlPath(uniqueText));

  const listItem = (
    <TempListItem
      ListItemMainIcon={ListItemMainIcon}
      isActive={isActive}
      open={open}
      uniqueText={uniqueText}
      color={color}
      handleClick={handleClick}
      notNav={notNav}
    />
  );
  return (
    <ListItem
      disablePadding
      sx={{
        display: "block",
        backgroundColor: `${isActive ? "primary.main" : ""}`,
      }}
    >
      {notNav ? (
        listItem
      ) : (
        <NavLink to={urlPath(uniqueText)}>{listItem}</NavLink>
      )}
    </ListItem>
  );
}
