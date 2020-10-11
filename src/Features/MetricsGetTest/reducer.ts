import { createSlice, PayloadAction } from "redux-starter-kit";

export type Measurement = {
  metric: string;
  at: number;
  value: number;
  unit: string;
};

export type ApiErrorAction = {
  error: string;
};

const initialState = {
  metric: "",
  value: 0,
  unit: "",
  at: 0
};

//const toF = (c: number) => (c * 9) / 5 + 32;

const slice = createSlice({
  name: "measurement",
  initialState,
  reducers: {
    measurementDataRecevied: (state, action: PayloadAction<Measurement>) => {
      const { metric, value, unit, at } = action.payload;
      state.metric = metric;
      state.value = value;
      state.unit = unit;
      state.at = at;
    },
    getMeasurementApiErrorReceived: (
      state,
      action: PayloadAction<ApiErrorAction>
    ) => state
  }
});

export const reducer = slice.reducer;
export const actions = slice.actions;
