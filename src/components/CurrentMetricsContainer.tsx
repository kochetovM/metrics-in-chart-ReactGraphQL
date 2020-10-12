import React from "react";
import {
  Card,
  createStyles,
  Typography,
  makeStyles,
  Grid
} from "@material-ui/core";

const useStyles = makeStyles(
  createStyles({
    card: {
      maxWidth: "130px",
      padding: "7px 7px"
    },
    container: {
      width: "50%"
    }
  })
);

const CurrentMetricCard = ({
  metric,
  value
}: {
  metric: string;
  value: number;
}) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <Typography variant="body2" gutterBottom>
        {metric}
      </Typography>
      <Typography variant="h6">{value}</Typography>
    </Card>
  );
};

export default ({
  currentMetrics
}: {
  currentMetrics: { [key: string]: number };
}) => {
  const classes = useStyles();

  return (
    <Grid
      container
      spacing={2}
      className={classes.container}
      direction="row"
      justify="flex-start"
      alignItems="flex-start"
    >
      {Object.entries(currentMetrics).map(([metric, value], i) => {
        return (
          <Grid item xs={3} key={metric + i}>
            <CurrentMetricCard metric={metric} value={value} />
          </Grid>
        );
      })}
    </Grid>
  );
};
