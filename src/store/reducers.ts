import { reducer as weatherReducer } from "../Features/Weather/reducer";
import { reducer as measurementReducer } from "../Features/MetricsGetTest/reducer";
import { reducer as availableCharts } from "../Features/ChartsMenu/reducer";

export default {
  weather: weatherReducer,
  measurement: measurementReducer,
  availableCharts: availableCharts
};
