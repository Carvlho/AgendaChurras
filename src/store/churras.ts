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
    | any[];
  isError: boolean | null;
  isSuccess: boolean;
  errorMessage: string | null;
  deleteSuccess: boolean;
};

const initialState: ChurrasState = {
  churras: [],
  isError: null,
  isSuccess: false,
  deleteSuccess: false,
  errorMessage: null,
};

export const setChurras = createAsyncThunk(
  "churras/setChurras",
  (body: any) => {
    return { body };
  }
);

export const deleteChurras = createAsyncThunk(
  "churras/deleteChurras",
  (index: number) => {
    return { index };
  }
);

export const addContributors = createAsyncThunk(
  "churras/addContributors",
  (body: any) => {
    return { body };
  }
);

export const deleteContributors = createAsyncThunk(
  "churras/deleteContributors",
  (body: any) => {
    return { body };
  }
);

export const setContributorPaied = createAsyncThunk(
  "churras/setContributorPaied",
  (body: any) => {
    return { body };
  }
);

export const churrasSlice = createSlice({
  name: "churras",
  initialState: initialState,
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.deleteSuccess = false;
      state.errorMessage = null;

      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setChurras.fulfilled, (state, { payload }: any) => {
      state.churras = [...state.churras, payload.body];
      state.isSuccess = true;

      return state;
    });

    builder.addCase(deleteChurras.fulfilled, (state, { payload }: any) => {
      const { index } = payload;

      state.churras.splice(index, 1);

      state.deleteSuccess = true;

      return state;
    });

    builder.addCase(addContributors.fulfilled, (state, { payload }: any) => {
      const { eventID, name, value, paid } = payload.body;

      const id = parseInt(eventID);

      state.churras[id].contributors.push({ name, value, paid });

      state.isSuccess = true;

      return state;
    });

    builder.addCase(deleteContributors.fulfilled, (state, { payload }: any) => {
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
