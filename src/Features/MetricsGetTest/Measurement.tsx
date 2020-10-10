import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from './reducer';
import { Provider, createClient, useQuery } from 'urql';
import LinearProgress from '@material-ui/core/LinearProgress';
import Chip from '../../components/Chip';
import { IState } from '../../store';

const client = createClient({
  url: 'https://react.eogresources.com/graphql',
});

const query = `
query($metricName: String!) {
  getLastKnownMeasurement(metricName: $metricName) {
    metric
    value
    unit
    at
  }
}
`;

const getMeasurement = (state: IState) => {
  const { metric,value,unit, at } = state.measurement;
  return {
    metric,
    value,
    unit,
    at
  };
};

export default () => {
  return (
    <Provider value={client}>
      <Measurement />
    </Provider>
  );
};

const Measurement = () => {

  const metricName ="oilTemp";

  const dispatch = useDispatch();
  const { metric, value, unit, at } = useSelector(getMeasurement);

  const [result] = useQuery({
    query,
    variables: {
      metricName
    },
    pollInterval: 1200,
    // necessary so it updates from network:
    requestPolicy: 'cache-and-network',
  });


  const { fetching, data, error } = result;

  useEffect(() => {
    if (error) {
      dispatch(actions.getMeasurementApiErrorReceived({ error: error.message }));
      return;
    }
    if (!data) return;
    const  getMetric  = data.getLastKnownMeasurement;
    dispatch(actions.measurementDataRecevied(getMetric));
  }, [dispatch, data, error]);

  if (fetching) return <LinearProgress />;

  return <Chip label={`Mesure ${metric}: ${value} ${unit} at ${at} `} />;
};
