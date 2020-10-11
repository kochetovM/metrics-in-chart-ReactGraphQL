import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Provider, createClient, useQuery } from "urql";
import Select from "../../components/Select";
import { LinearProgress } from "@material-ui/core";
import { IState } from "../../store";
import { actions } from "./reducer";
import { initialState } from "urql/dist/types/hooks/constants";

const query = `query{ getMetrics }`;
const client = createClient({
  url: "https://react.eogresources.com/graphql"
});

export const getAvailableCharts = (state: IState) => {
  const { metrics } = state.availableCharts;
  return {
    metrics
  };
};
export default () => {
  return (
    <Provider value={client}>
      <AvailableCharts />
    </Provider>
  );
};

const AvailableCharts = () => {
  const dispatch = useDispatch();
  const { metrics } = useSelector(getAvailableCharts);

  const [optionlist, setOptionlist] = useState(metrics);
  const initselect: string[] = [];
  const [selectedMetrics, setSelectedMetrics] = useState(initselect);

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
    const getMetrics = data.getMetrics;
    setOptionlist(getMetrics);
    dispatch(actions.metricsDataReceived(getMetrics));

    //console.log("data", getMetrics);
  }, [data, error]);

  if (fetching) return <LinearProgress />;

  const handleChange = (event: React.ChangeEvent<{ value: string[] }>) => {
    const currentSelected = event.target.value.filter(
      curr => !selectedMetrics.includes(curr)
    )[0];

    setOptionlist(optionlist.filter(e => e !== currentSelected));
    setSelectedMetrics(selectedMetrics.concat([currentSelected]));
  };
  const handleDelete = (name: string) => {
    setOptionlist([...optionlist, name]);
    const newList: string[] = selectedMetrics.filter(e => e != name);
    setSelectedMetrics(newList);
  };

  return (
    <Select
      options={optionlist}
      selectedOptions={selectedMetrics}
      handleChange={handleChange}
      handleDelete={handleDelete}
    />
  );
};
