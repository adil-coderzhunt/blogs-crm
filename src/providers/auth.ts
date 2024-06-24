import { AuthProvider } from "@refinedev/core";
import { API_BASE_URL } from "./data";
import axios from "axios";

export const authProvider: AuthProvider = {
  login: async ({ email, password }) => {
    console.log("email and password is ", email, password);
    try {
      const res = await axios.post(`${API_BASE_URL}/auth/login`, {
        email: email,
        password: password,
      });
      console.log(">> response is ", res);
      localStorage.setItem("access_token", res.data.result.token);
      //localStorage.setItem("refresh_token", data.login.refreshToken);
      console.log("login successful");
      return {
        success: true,
        redirectTo: "/",
      };
    } catch (error) {
      console.log(">> error is", error);
      return {
        success: false,
        error: {
          message: "Login failed",
          name: error.response.data.message
            ? error.response.data.message
            : "Invalid email or password",
        },
      };
    }

    // console.log(">> i am in the loginf unction");
    // const profileObj = credential ? parseJwt(credential) : null;

    // if (profileObj) {
    //   localStorage.setItem(
    //     "user",
    //     JSON.stringify({
    //       ...profileObj,
    //       avatar: profileObj.picture,
    //     })
    //   );

    //   localStorage.setItem("token", `${credential}`);

    //   return {
    //     success: true,
    //     redirectTo: "/",
    //   };
    // }

    // return {
    //   success: false,
    // };
  },
  logout: async () => {
    console.log(">> i am in the logout function");
    const token = localStorage.getItem("access_token");

    if (token && typeof window !== "undefined") {
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
      axios.defaults.headers.common = {};
      window.google?.accounts.id.revoke(token, () => {
        return {};
      });
    }

    return {
      success: true,
      redirectTo: "/login",
    };
  },
  onError: async (error) => {
    console.log("> i am in the on error function");
    console.error(error);
    return { error };
  },
  check: async () => {
    console.log(">> i am in the check function");
    const token = localStorage.getItem("access_token");

    if (token) {
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      error: {
        message: "Check failed",
        name: "Token not found",
      },
      logout: true,
      redirectTo: "/login",
    };
  },
  getPermissions: async () => null,
  getIdentity: async () => {
    const user = localStorage.getItem("user");
    if (user) {
      return JSON.parse(user);
    }

    return null;
  },
};
