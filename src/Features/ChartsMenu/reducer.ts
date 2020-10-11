import { ApiErrorAction } from "../../ApiErrorAction";
import { createSlice, PayloadAction } from "redux-starter-kit";

export type AvailableCharts = {
  metrics: Array<string>;
};

const initialState = {
  metrics: <string[]>[]
};

const slice = createSlice({
  name: "availableCharts",
  initialState,
  reducers: {
    metricsDataReceived: (state, action: PayloadAction<string[]>) => {
      state.metrics = action.payload;
    },
    metricsApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) =>
      state
  }
});

export const reducer = slice.reducer;
export const actions = slice.actions;
