import React from "react";

import {
  Box,
  CircularProgress,
  makeStyles,
  createStyles
} from "@material-ui/core";

const useStyles = makeStyles(theme =>
  createStyles({
    progress: {
      margin: theme.spacing(2)
    }
  })
);
const Loading = () => {
  const classes = useStyles();
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="400px"
    >
      <CircularProgress className={classes.progress} />
    </Box>
  );
};

export default Loading;
