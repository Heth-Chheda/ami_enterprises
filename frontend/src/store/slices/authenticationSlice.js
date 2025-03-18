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
    users: [],
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
        (state.user = action.payload.user),
        localStorage.setItem("user", JSON.stringify(action.payload));
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
    getAllUsersPending: (state) => {
      state.loading = true;
      state.error = null;
    },
    getAllUsersSuccess: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },
    getAllUsersFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    removeUser: (state, action) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
    // ✅ Start fetching user by name/email
    getUserByUsernameOrEmailRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    // ✅ If successful
    getUserByUsernameOrEmailSuccess(state, action) {
      state.loading = false;
      // state.user = action.payload;
      state.isAuthenticated = true;
    },
    // ✅ If failed
    getUserByUsernameOrEmailFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    // ✅ Request State
    updateUserRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },

    updateUserSuccess(state, action) {
      // console.log("Updated user:", action.payload.user);
      state.loading = false;
      state.message = action.payload.message;
    },

    // ✅ Failed State
    updateUserFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
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

// Action to fetch users
export const getAllUsers = () => async (dispatch) => {
  dispatch(authenticationSlice.actions.getAllUsersPending());
  try {
    const res = await axios.get(
      "http://localhost:4000/api/v1/authentication/admin/getAllUsers",
      {
        withCredentials: true,
      }
    );
    dispatch(authenticationSlice.actions.getAllUsersSuccess(res.data.users)); // ✅ Success action
  } catch (error) {
    dispatch(
      authenticationSlice.actions.getAllUsersFailed(
        error.response?.data?.message || "Failed to fetch users"
      )
    ); // ✅ Error action
  }
};
// Delete user
export const deleteUser = (id) => async (dispatch) => {
  try {
    await axios.delete(
      `http://localhost:4000/api/v1/authentication/users/${id}`
    );
    dispatch(authenticationSlice.actions.removeUser(id));
  } catch (error) {
    console.error("Failed to delete user:", error);
  }
};

// ✅ Async action to get user by username or email
export const getUserByUsernameOrEmail = (search) => async (dispatch) => {
  const params = { search };
  console.log("Request Params:", params);
  dispatch(authenticationSlice.actions.getUserByUsernameOrEmailRequest());
  try {
    const res = await axios.get(
      `http://localhost:4000/api/v1/authentication/admin/getUserByNameOrEmail?search=${search}`,
      {
        withCredentials: true,
      }
    );
    dispatch(
      authenticationSlice.actions.getUserByUsernameOrEmailSuccess(res.data.user)
    );
    return res.data.user; // ✅ Return the data for direct use
  } catch (error) {
    dispatch(
      authenticationSlice.actions.getUserByUsernameOrEmailFailed(
        error.response?.data?.message || "Failed to get user information"
      )
    );
    throw error; // ✅ Throw the error to handle it in the component if needed
  }
};

// ✅ Action to update user by email
export const updateUserByEmail = (email, data) => async (dispatch) => {
  console.log(`➡️ Called updateUserByEmail with email: ${email}`);
  console.log(`➡️ Data sent:`, data);

  dispatch(authenticationSlice.actions.updateUserRequest());

  try {
    const response = await axios.put(
      `http://localhost:4000/api/v1/authentication/admin/updateUserByEmail/${email}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    dispatch(authenticationSlice.actions.updateUserSuccess(response.data));
  } catch (error) {
    dispatch(
      authenticationSlice.actions.updateUserFailed(
        error.response?.data?.message ||
          "Failed to update user. Please try again."
      )
    );
  }
};

export default authenticationSlice.reducer;
