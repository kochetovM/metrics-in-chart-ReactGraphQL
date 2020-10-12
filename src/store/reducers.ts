import { reducer as weatherReducer } from "../Features/Weather/reducer";
import { reducer as chartsReducer } from "../Features/ChartsMenu/reducer";
import { reducer as historyMetricsReducer } from "../Features/HistoryMetrics/reducer";
import { reducer as currentMetricsReducer } from "../Features/CurrentMetrics/reducer";

export default {
  weather: weatherReducer,
  availableCharts: chartsReducer,
  currentMetrics: currentMetricsReducer,
  historyMetrics: historyMetricsReducer
};
