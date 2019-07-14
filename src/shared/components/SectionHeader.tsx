import React from "react";
import Typography from "@material-ui/core/Typography";
import { createStyles, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme =>
  createStyles({
    sectionContainer: {
      marginTop: "10px",
      marginBottom: "10px"
    },
    title: {
      fontWeight: "bold"
    }
  })
);

export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

const SectionHeader = (props: SectionHeaderProps) => {
  const { title, subtitle } = props;
  const classes = useStyles();

  return (
    <div className={classes.sectionContainer}>
      <Typography variant="subtitle1" className={classes.title}>
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="body1" gutterBottom>
          {subtitle}
        </Typography>
      )}
    </div>
  );
};

export default SectionHeader;
