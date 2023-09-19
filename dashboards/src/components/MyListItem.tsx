import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import React from "react"
import { NavLink, useLocation } from "react-router-dom"
import { urlPath, isPathActive, baseColor } from "../libs/utils"

type Props = {
    open:boolean,
    ListItemMainIcon: React.ReactNode,
    uniqueText: string,
    color?: string
}

export default function MyListItem({open, ListItemMainIcon, uniqueText, color}:Props) {
  const {pathname} = useLocation()
  const isActive = isPathActive(pathname, urlPath(uniqueText))
  return (
    <ListItem disablePadding sx={{ display: "block", backgroundColor:`${isActive ? baseColor: ''}`}}>
      <NavLink to={urlPath(uniqueText)}>
            <ListItemButton
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
                  color:`${isActive ? '#fff': color? color: baseColor}`
                }}
              >
                {ListItemMainIcon}
              </ListItemIcon>
              <ListItemText primary={uniqueText} sx={{ opacity: open ? 1 : 0, color:`${isActive ? '#fff': color? color: baseColor}` }} />
            </ListItemButton>
                  </NavLink>
          </ListItem>
  )
}
