import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "urql";
import HistoryChart from "../../components/HistoryChart";
import { IState } from "../../store";
import { getAvaiableCharts } from "../ChartsMenu/AvailableCharts";
import { actions } from "./reducer";

const query = `
    query($metricName: String!, $afterTime: Timestamp) {
        getMultipleMeasurements(input: {
            metricName: $metricName,
            after: $afterTime 
          }) {
            metric,
            measurements {
                metric,
                at, value, unit
              }
        }
    }
`;

const calc30minsago = Date.now() - 30 * 60 * 1000;

const getHistoryMetrics = (state: IState) => {
  return {
    historyMetrics: state.historyMetrics
  };
};

const HistoryMetrics = () => {
  const dispatch = useDispatch();
  const { currentSelectedMetric, deletedMetric } = useSelector(
    getAvaiableCharts
  );
  const { historyMetrics } = useSelector(getHistoryMetrics);

  const [result] = useQuery({
    query,
    variables: {
      metricName: currentSelectedMetric,
      afterTime: calc30minsago
    }
  });
  const { data, error } = result;

  useEffect(() => {
    if (error) {
      dispatch(actions.historyMetricApiError({ error: error.message }));
      return;
    }

    if (!data) return;

    if (deletedMetric !== "" && currentSelectedMetric === "") {
      dispatch(actions.historyMetricNotActive(deletedMetric));
      return;
    }

    if (!currentSelectedMetric || currentSelectedMetric !== "") {
      const { getMultipleMeasurements } = data;
      const { measurements } = getMultipleMeasurements[0];
      if (measurements.length !== 0) {
        const toDispatch = {
          key: currentSelectedMetric,
          measurements
        };
        dispatch(actions.historyMetricReceived(toDispatch));
      }
    }
  }, [dispatch, data, currentSelectedMetric, deletedMetric, error]);

  return <HistoryChart data={historyMetrics} />;
};

export default HistoryMetrics;
