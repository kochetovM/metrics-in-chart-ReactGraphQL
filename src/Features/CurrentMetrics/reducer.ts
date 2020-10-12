import { createSlice, PayloadAction } from "redux-starter-kit";
import { ApiErrorAction } from "../../ApiErrorAction";

export type NewMeasurement = {
  at: number;
  metric: string;
  unit: string;
  value: number;
};

const initialState: { [key: string]: number } = {};

const slice = createSlice({
  name: "currentMeasurement",
  initialState,
  reducers: {
    newMeasurementReceived: (state, action: PayloadAction<NewMeasurement>) => {
      state[action.payload.metric as string] = action.payload.value;
    },
    currentMeasurementApiError: (
      state,
      action: PayloadAction<ApiErrorAction>
    ) => state,
    metricDeleted: (state, action: PayloadAction<string[]>) => {
      const deletedKey = Object.keys(state).filter(
        item => !action.payload.includes(item)
      );
      delete state[(deletedKey as unknown) as string];
    }
  }
});

export const reducer = slice.reducer;
export const actions = slice.actions;
