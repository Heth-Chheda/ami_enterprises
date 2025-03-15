import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const authenticationSlice = createSlice({
  name: "authentication",
  initialState: {
    loading: false,
    error: null,
    message: null,
    user: JSON.parse(localStorage.getItem("user")) || null,
    isAuthenticated: !!localStorage.getItem("user"),
  },
  reducers: {
    registrationRequest(state) {
      (state.loading = true), (state.error = null), (state.message = null);
    },
    registrationSuccess(state, action) {
      (state.loading = false), (state.message = action.payload.message);
    },
    registrationFailed(state, action) {
      (state.loading = false), (state.error = action.payload);
    },
    otpVerificationRequest(state) {
      (state.loading = true), (state.error = null), (state.message = null);
    },
    otpVerificationSuccess(state, action) {
      (state.loading = false),
        (state.message = action.payload.message),
        (state.isAuthenticated = true),
        (state.user = action.payload.user);
    },
    otpVerificationFailed(state, action) {
      (state.loading = false), (state.error = action.payload);
    },
    loginRequest(state) {
      (state.loading = true), (state.error = null), (state.message = null);
    },
    loginSuccess(state, action) {
      (state.loading = false),
        (state.message = action.payload.message),
        (state.isAuthenticated = true),
        (state.user = action.payload.user);
    },
    loginFailed(state, action) {
      (state.loading = false), (state.error = action.payload);
    },
    logoutRequest(state) {
      (state.loading = true), (state.message = null), (state.error = null);
    },
    logoutSuccess(state, action) {
      (state.loading = false),
        (state.message = action.payload),
        (state.isAuthenticated = false),
        (state.user = null),
        localStorage.removeItem("user");
    },
    logoutFailed(state, action) {
      (state.loading = false),
        (state.message = null),
        (state.error = action.payload);
    },

    getUserInformationRequest(state) {
      (state.loading = true), (state.error = null), (state.message = null);
    },
    getUserInformationSuccess(state, action) {
      (state.loading = false),
        (state.user = action.payload.user),
        (state.isAuthenticated = true);
    },
    getUserInformationFailed(state) {
      (state.loading = false),
        (state.user = null),
        (state.isAuthenticated = null);
    },

    forgotPasswordRequest(state) {
      (state.loading = true), (state.error = null), (state.message = null);
    },
    forgotPasswordSuccess(state, action) {
      (state.loading = false), (state.message = action.payload.message);
    },
    forgotPasswordFailed(state, action) {
      (state.loading = false), (state.error = action.payload);
    },

    resetPasswordRequest(state) {
      (state.loading = true), (state.error = null), (state.message = null);
    },
    resetPasswordSuccess(state, action) {
      (state.loading = false),
        (state.message = action.payload.message),
        (state.user = action.payload.user),
        (state.isAuthenticated = true);
    },
    resetPasswordFailed(state, action) {
      (state.loading = false), (state.error = action.payload);
    },
    updatePasswordRequest(state) {
      (state.loading = true), (state.error = null), (state.message = null);
    },
    updatePasswordSuccess(state, action) {
      (state.loading = false), (state.message = action.payload);
    },
    updatePasswordFailed(state, action) {
      (state.loading = false), (state.error = action.payload);
    },

    resetAuthenticationSlice(state) {
      (state.loading = false),
        (state.error = null),
        (state.message = null),
        (state.user = state.user),
        (state.isAuthenticated = state.isAuthenticated);
    },
  },
});

export const resetAuthenticationSlice = () => (dispatch) => {
  dispatch(authenticationSlice.actions.resetAuthenticationSlice());
};

export const registration = (data) => async (dispatch) => {
  dispatch(authenticationSlice.actions.registrationRequest());
  await axios
    .post("http://localhost:4000/api/v1/authentication/register", data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      dispatch(authenticationSlice.actions.registrationSuccess(res.data));
    })
    .catch((error) => {
      dispatch(
        authenticationSlice.actions.registrationFailed(
          error.response.data.message
        )
      );
    });
};

export const otpVerification = (email, otp) => async (dispatch) => {
  dispatch(authenticationSlice.actions.otpVerificationRequest());
  await axios
    .post(
      "http://localhost:4000/api/v1/authentication/verify-otp",
      { email, otp },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => {
      dispatch(authenticationSlice.actions.otpVerificationSuccess(res.data));
    })
    .catch((error) => {
      dispatch(
        authenticationSlice.actions.otpVerificationFailed(
          error.response.data.message
        )
      );
    });
};

export const login = createAsyncThunk(
  "authentication/login",
  async (form, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "http://localhost:4000/api/v1/authentication/login",
        form,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      localStorage.setItem("user", JSON.stringify(res.data));
      return res.data; // ✅ Return data directly for unwrap
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

export const logout = () => async (dispatch) => {
  dispatch(authenticationSlice.actions.logoutRequest());
  await axios
    .get("http://localhost:4000/api/v1/authentication/logout", {
      withCredentials: true,
    })
    .then((res) => {
      dispatch(authenticationSlice.actions.logoutSuccess(res.data.message));
      dispatch(authenticationSlice.actions.resetAuthenticationSlice());
      localStorage.removeItem("user");
    })
    .catch((error) => {
      dispatch(
        authenticationSlice.actions.logoutFailed(error.response.data.message)
      );
    });
};

export const getUserInformation = () => async (dispatch) => {
  dispatch(authenticationSlice.actions.getUserInformationRequest());
  try {
    const res = await axios.get(
      "http://localhost:4000/api/v1/authentication/get-user",
      { withCredentials: true }
    );
    dispatch(authenticationSlice.actions.getUserInformationSuccess(res.data));

    // ✅ Save user info to localStorage
    localStorage.setItem("user", JSON.stringify(res.data));

    // ✅ Return the user data
    return res.data;
  } catch (error) {
    dispatch(
      authenticationSlice.actions.getUserInformationFailed(
        error.response?.data?.message || "Failed to get user information"
      )
    );
    throw error;
  }
};

export const forgotPassword = (email) => async (dispatch) => {
  dispatch(authenticationSlice.actions.forgotPasswordRequest());
  await axios
    .post(
      "http://localhost:4000/api/v1/authentication/password/forgot",
      { email },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => {
      dispatch(authenticationSlice.actions.forgotPasswordSuccess(res.data));
      //Fetching the User information if the login is successfull
    })
    .catch((error) => {
      dispatch(
        authenticationSlice.actions.forgotPasswordFailed(
          error.response.data.message
        )
      );
    });
};

export const resetPassword = (data, token) => async (dispatch) => {
  dispatch(authenticationSlice.actions.resetPasswordRequest());
  await axios
    .put(
      `http://localhost:4000/api/v1/authentication/password/reset/${token}`,
      data,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => {
      dispatch(authenticationSlice.actions.resetPasswordSuccess(res.data));
      //Fetching the User information if the login is successfull
    })
    .catch((error) => {
      dispatch(
        authenticationSlice.actions.resetPasswordFailed(
          error.response.data.message
        )
      );
    });
};

export const updatePassword = (data) => async (dispatch) => {
  dispatch(authenticationSlice.actions.updatePasswordRequest());
  await axios
    .put(`http://localhost:4000/api/v1/authentication/password/update`, data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      dispatch(
        authenticationSlice.actions.updatePasswordSuccess(res.data.message)
      );
      //Fetching the User information if the login is successfull
    })
    .catch((error) => {
      dispatch(
        authenticationSlice.actions.updatePasswordFailed(
          error.response.data.message
        )
      );
    });
};

export default authenticationSlice.reducer;
