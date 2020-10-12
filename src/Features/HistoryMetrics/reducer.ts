import { NewMeasurement } from "./../CurrentMetrics/reducer";
import { createSlice, PayloadAction } from "redux-starter-kit";
import { ApiErrorAction } from "../../ApiErrorAction";

const initialState: {
  [key: string]: NewMeasurement[];
} = {};

type Action = {
  key: string;
  measurements: NewMeasurement[];
};

const slice = createSlice({
  name: "historyMetrics",
  initialState,
  reducers: {
    historyMetricReceived: (state, action: PayloadAction<Action>) => {
      state[action.payload.key] = action.payload.measurements;
    },
    historyMetricApiError: (state, action: PayloadAction<ApiErrorAction>) =>
      state,
    historyMetricNotActive: (state, action: PayloadAction<string>) => {
      delete state[action.payload];
    }
  }
});

export const reducer = slice.reducer;
export const actions = slice.actions;
