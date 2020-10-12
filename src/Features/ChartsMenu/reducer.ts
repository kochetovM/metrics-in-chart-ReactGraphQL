import { ApiErrorAction } from "./../../ApiErrorAction";
import { createSlice, PayloadAction } from "redux-starter-kit";

export type KnownMetrics = {
  metrics: string[];
};

const initialState = {
  metrics: [] as string[],
  selectedMetrics: [] as string[],
  currentSelectedMetric: "",
  deletedMetric: ""
};

const slice = createSlice({
  name: "metrics",
  initialState,
  reducers: {
    metricsDataReceived: (state, action: PayloadAction<string[]>) => {
      state.metrics = action.payload;
    },
    metricsApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) =>
      state,
    metricsSelected: (state, action: PayloadAction<string[]>) => {
      const currentSelected = action.payload.filter(
        curr => !state.selectedMetrics.includes(curr)
      )[0];
      state.currentSelectedMetric = currentSelected as string;
      state.selectedMetrics = action.payload;
      state.deletedMetric = "";
    },
    metricDeleted: (state, action: PayloadAction<string>) => {
      state.selectedMetrics = state.selectedMetrics.filter(
        m => m !== action.payload
      );
      state.deletedMetric = action.payload;
      state.currentSelectedMetric = "";
    }
  }
});

export const reducer = slice.reducer;
export const actions = slice.actions;
