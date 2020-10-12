import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSubscription } from "urql";
import CurrentMetricsContainer from "../../components/CurrentMetricsContainer";
import { IState } from "../../store";
import { getAvaiableCharts } from "../ChartsMenu/AvailableCharts";
import { actions, NewMeasurement } from "./reducer";

const newMeasurement = `
    subscription NewMeasurement {
        newMeasurement {
            metric
            at
            value
            unit
        }
    }
`;

const handleSub = (messages: any[] = [], response: any): any => {
  return response.newMeasurement;
};

export const getCurrentMetrics = (state: IState) => {
  return {
    currentMetrics: state.currentMetrics
  };
};

export const CurrentMetrics = () => {
  const dispatch = useDispatch();
  const [res] = useSubscription({ query: newMeasurement }, handleSub);
  const { selectedMetrics } = useSelector(getAvaiableCharts);
  const { currentMetrics } = useSelector(getCurrentMetrics);

  const { data, error } = res;

  useEffect(() => {
    if (error) {
      dispatch(actions.currentMeasurementApiError({ error: error.message }));
      return;
    }
    if (!data) return;

    const typedData = (data as any) as NewMeasurement;

    const { metric } = typedData;

    if (selectedMetrics.includes(metric)) {
      dispatch(actions.newMeasurementReceived(typedData));
    }
  }, [dispatch, data, error, selectedMetrics]);

  useEffect(() => {
    dispatch(actions.metricDeleted(selectedMetrics));
  }, [selectedMetrics, dispatch]);

  return <CurrentMetricsContainer currentMetrics={currentMetrics} />;
};
