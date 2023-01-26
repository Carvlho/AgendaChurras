import { RootState } from "./index";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type ChurrasState = {
  churras:
    | [
        {
          data: string;
          describe: string;
          observation: string;
          contributors:
            | [
                {
                  name: string;
                  value: string;
                  paid: boolean;
                }
              ]
            | [];
        }
      ]
    | [];
  isError: boolean | null;
  isSuccess: boolean;
  errorMessage: string | null;
};

const initialState: ChurrasState = {
  churras: [],
  isError: null,
  isSuccess: false,
  errorMessage: null,
};

export const setChurras = createAsyncThunk(
  "churras/setChurras",
  async (body: any, thunkAPI) => {
    try {
      return { body };
    } catch (error: any) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const addContributors = createAsyncThunk(
  "churras/addContributors",
  async (body: any, thunkAPI) => {
    try {
      return { body };
    } catch (error: any) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteContributors = createAsyncThunk(
  "churras/deleteContributors",
  async (body: any, thunkAPI) => {
    try {
      return { body };
    } catch (error: any) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const setContributorPaied = createAsyncThunk(
  "churras/setContributorPaied",
  async (body: any, thunkAPI) => {
    try {
      return { body };
    } catch (error: any) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const churrasSlice = createSlice({
  name: "churras",
  initialState: initialState,
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.errorMessage = null;

      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setChurras.fulfilled, (state, { payload }: any) => {
      console.log(payload);

      state.churras = [...state.churras, payload.body];
      state.isSuccess = true;

      return state;
    });

    builder.addCase(addContributors.fulfilled, (state, { payload }: any) => {
      console.log(payload);

      const { eventID, name, value, paid } = payload.body;

      const id = parseInt(eventID);

      state.churras[id].contributors.push({ name, value, paid });

      state.isSuccess = true;

      return state;
    });

    builder.addCase(deleteContributors.fulfilled, (state, { payload }: any) => {
      console.log(payload);

      const { eventID, contributorID } = payload.body;

      state.churras[eventID].contributors.splice(contributorID, 1);

      state.isSuccess = true;

      return state;
    });

    builder.addCase(
      setContributorPaied.fulfilled,
      (state, { payload }: any) => {
        const { eventID, contributorID, paid } = payload.body;

        state.churras[eventID].contributors[contributorID].paid = paid;

        state.isSuccess = true;

        return state;
      }
    );
  },
});

export const { clearState } = churrasSlice.actions;

export const churrasSelector = (state: RootState) => state.churras;
