import React, { useState } from "react";
import {
  createStyles,
  makeStyles,
  SwipeableDrawer,
  List,
  ListItemText,
  ListItem,
  Tabs,
  Tab
} from "@material-ui/core";

import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";

const useStyles = makeStyles(theme =>
  createStyles({
    appBar: {
      position: "relative",
      boxShadow: "none",
      borderBottom: `1px solid ${theme.palette.grey["100"]}`,
      backgroundColor: "white"
    },
    inline: {
      display: "inline"
    },
    flex: {
      display: "flex",
      [theme.breakpoints.down("sm")]: {
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center"
      }
    },
    link: {
      textDecoration: "none",
      color: "inherit"
    },
    tagline: {
      display: "inline-block",
      marginLeft: 10,
      [theme.breakpoints.up("md")]: {
        paddingTop: "0.8em"
      }
    },
    tabContainer: {
      marginLeft: 32,
      [theme.breakpoints.down("sm")]: {
        display: "none"
      }
    },
    tabItem: {
      paddingTop: 20,
      paddingBottom: 20,
      minWidth: "auto"
    }
  })
);

export interface TopBarProps extends RouteComponentProps<any> {
  currentPath: string;
}

const TopBar = withRouter((props: TopBarProps) => {
  const classes = useStyles();
  const [menuDrawer, setMenuDrawer] = useState(false);
  const [value, setValue] = useState(0);

  const handleChange = (_: any, value: number) => {
    setValue(value);
  };
  const mobileMenuOpen = () => {
    setMenuDrawer(true);
  };
  const mobileMenuClose = () => {
    setMenuDrawer(false);
  };

  const current = () => {
    if (props.currentPath === "home") {
      return 0;
    }
    if (props.currentPath === "impossibleRoutes") {
      return 1;
    }
  };

  const Routes = [
    { path: "/", name: "Home" },
    {
      path: "/impossibleRoutes",
      name: "Impossible Routes"
    }
  ];

  return (
    <AppBar position="absolute" color="default" className={classes.appBar}>
      <Toolbar>
        <Grid container spacing={10} alignItems="baseline">
          <Grid item xs={12} className={classes.flex}>
            <div className={classes.inline}>
              <Typography variant="h6" color="inherit" noWrap>
                <Link to="/" className={classes.link}>
                  <span className={classes.tagline}>Smove Booking</span>
                </Link>
              </Typography>
            </div>
            <div className={classes.tabContainer}>
              <SwipeableDrawer
                anchor="right"
                open={menuDrawer}
                onClose={mobileMenuClose}
                onOpen={mobileMenuOpen}
              >
                <AppBar title="Menu">
                  <List>
                    {Routes.map((item, index) => (
                      <ListItem
                        key={item.name}
                        to={{
                          pathname: item.path,
                          search: props.location.search
                        }}
                        component={Link}
                        button
                      >
                        <ListItemText primary={item.name} />
                      </ListItem>
                    ))}
                  </List>
                </AppBar>
              </SwipeableDrawer>
              <Tabs
                value={current() || value}
                indicatorColor="primary"
                textColor="primary"
                onChange={handleChange}
              >
                {Routes.map((item, index) => (
                  <Tab
                    key={index}
                    to={{
                      pathname: item.path,
                      search: props.location.search
                    }}
                    component={Link}
                    classes={{ root: classes.tabItem }}
                    label={item.name}
                  />
                ))}
              </Tabs>
            </div>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
});

export default TopBar;
