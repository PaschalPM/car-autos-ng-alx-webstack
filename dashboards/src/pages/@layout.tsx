import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Dashboard from "@mui/icons-material/Dashboard";
import Home from "@mui/icons-material/Home";
import Logout from "@mui/icons-material/Logout";
import MyBreadcrumbs from "../components/MyBreadcrumbs";
import { BsFillPeopleFill } from "react-icons/bs";
import { RiAdvertisementFill } from "react-icons/ri";
import { AiFillProfile } from "react-icons/ai";
import { Outlet } from "react-router-dom";
import MyListItem from "../components/MyListItem";
import useAppStore from "../store/app";
import { ucfirst } from "../libs/utils";
import { useNavigate } from "react-router-dom";
import MySnackbar from "../components/prompts/MySnackbar";
import MyAlert from "../components/prompts/MyAlert";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Layout() {
  const { username, isManager } = useAppStore((state) => state.userProfile);
  const logout = useAppStore((state) => state.logout);
  const openSnackbar = useAppStore((state) => state.openSnackbar);
  const resetSnackbar = useAppStore((state) => state.resetSnackbar);
  const openAlert = useAppStore((state) => state.openAlert);
  const pageTitle = useAppStore((state) => state.pageTitle);
  const navigate = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleLogout = () => {
    openSnackbar(
      "Logging out.",
      () => {
        resetSnackbar();
      },
      () => {
        openAlert(
          "Logged out.",
          () => {
            navigate("/");
            logout();
          },
          "success"
        );
      }
    );
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const listGenerator = (isManager: boolean | undefined) => {
    return isManager
      ? ["Dashboard", "My Marketers", "My Adverts", "My Profile"]
      : ["Dashboard", "My Adverts", "My Profile"];
  };
  const firstListIconsGen = (isManager: boolean | undefined) => {
    return isManager
      ? [
          <Dashboard />,
          <BsFillPeopleFill size={24} />,
          <RiAdvertisementFill size={24} />,
          <AiFillProfile size={24} />,
        ]
      : [
          <Dashboard />,
          <RiAdvertisementFill size={24} />,
          <AiFillProfile size={24} />,
        ];
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Grid container spacing={2} alignItems={"center"}>
              <Grid item xs={9} sm={10} lg={11}>
                <Typography variant="h5">{pageTitle}</Typography>
              </Grid>
              <Grid item xs={3} sm={2} lg={1}>
                <Typography variant="subtitle2" sx={{ fontSize: ".95em" }}>
                  Hi {ucfirst(username)}
                </Typography>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {listGenerator(isManager as boolean).map((text, index) => (
              <MyListItem
                uniqueText={text}
                key={text}
                open={open}
                ListItemMainIcon={
                  firstListIconsGen(isManager as boolean)[index]
                }
              />
            ))}
          </List>
          <Divider />
          <List>
            <MyListItem
              uniqueText="Home"
              open={open}
              ListItemMainIcon={<Home />}
            />
            <MyListItem
              uniqueText="Logout"
              open={open}
              ListItemMainIcon={<Logout />}
              notNav={true}
              handleClick={handleLogout}
              color="secondary.dark"
            />
          </List>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          <MyBreadcrumbs/>
          <Box sx={{ position: "relative" }}>
            <Outlet />
          </Box>
        </Box>
      </Box>
      <MySnackbar />
      <MyAlert />
    </>
  );
}
