import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { User } from "@/types/User";
import { PostSigninParams, postSignin } from "@/api/user";

const initialState: User = {
  id: 1,
  email: "",
  username: "",
  password: "",
  name: {
    firstname: "",
    lastname: "",
  },
  address: {
    city: "",
    street: "",
    number: 0,
    zipcode: "",
    geolocation: {
      lat: "",
      long: "",
    },
  },
  phone: "",
};

export const signin = createAsyncThunk<
  User,
  PostSigninParams,
  {
    rejectValue: {
      resultCode: "404";
      message: string;
    };
  }
>("auth/signin", async (params, { rejectWithValue }) => {
  try {
    const response = await postSignin(params.username, params.password);

    return response.data;
  } catch (err: any) {
    return rejectWithValue(err.response.data);
  }
});

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signin.fulfilled, (state, action) => {
      state = action.payload;
    });
  },
});

export const {} = auth.actions;
export default auth.reducer;
