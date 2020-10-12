import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "urql";
import Select from "../../components/Select";
import { LinearProgress } from "@material-ui/core";
import { IState } from "../../store";
import { actions } from "./reducer";

const query = `
query {
    getMetrics 
}
`;

export const getAvaiableCharts = (state: IState) => {
  const {
    metrics,
    currentSelectedMetric,
    selectedMetrics,
    deletedMetric
  } = state.availableCharts;
  return {
    metrics,
    selectedMetrics,
    currentSelectedMetric,
    deletedMetric
  };
};

const AvaiableCharts = () => {
  const dispatch = useDispatch();
  const { selectedMetrics, metrics } = useSelector(getAvaiableCharts);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    dispatch(actions.metricsSelected(event.target.value as string[]));
  };

  const handleDelete = (metric: string) => (e: any) => {
    dispatch(actions.metricDeleted(metric));
  };

  const [result] = useQuery({
    query
  });
  const { fetching, data, error } = result;

  useEffect(() => {
    if (error) {
      dispatch(actions.metricsApiErrorReceived({ error: error.message }));
      return;
    }
    if (!data) return;

    const { getMetrics } = data;

    dispatch(actions.metricsDataReceived(getMetrics));
  }, [dispatch, data, error]);

  if (fetching) return <LinearProgress />;

  return (
    <Select
      options={metrics}
      selectedOptions={selectedMetrics}
      handleChange={handleChange}
      handleDelete={handleDelete}
    />
  );
};

export default () => {
  return <AvaiableCharts />;
};
