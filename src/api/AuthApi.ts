import { AxiosError } from "axios";
import api from "../lib/axios";
import {
  UserConfirmAccountForm,
  UserRegisterForm,
  RequestConfirmationCodeForm,
  UserLoginForm,
  ForgotPasswordForm,
  NewPasswordForm,
} from "../types";

export async function getUser() {
  try {
    const response = await api.get("/auth/user");
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    } else {
      throw new Error("Error al obtener el usuario");
    }
  }
}

export async function registerUser(formData: UserRegisterForm) {
  try {
    const response = await api.post("/auth/create-account", formData);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    } else {
      throw new Error("Error al registrar el usuario");
    }
  }
}

export async function confirmAccount(formData: UserConfirmAccountForm) {
  try {
    const response = await api.post("/auth/confirm-account", formData);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    } else {
      throw new Error("Error al confirmar la cuenta");
    }
  }
}

export async function requestConfirmationCode(formData: RequestConfirmationCodeForm) {
  try {
    const response = await api.post("/auth/new-code", formData);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    } else {
      throw new Error("Error al solicitar el código de confirmación");
    }
  }
}

export async function login(formData: UserLoginForm) {
  try {
    const response = await api.post("/auth/login", formData);
    localStorage.setItem("AUTH_TOKEN", response.data.token);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    } else {
      throw new Error("Error al iniciar sesión");
    }
  }
}

export async function forgotPassword(formData: ForgotPasswordForm) {
  try {
    const response = await api.post("/auth/forgot-password", formData);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    } else {
      throw new Error("Error al solicitar la recuperación de contraseña");
    }
  }
}

export async function validateToken(token: string) {
  try {
    const response = await api.post("/auth/validate-token", { token });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    } else {
      throw new Error("Error al validar el token");
    }
  }
}

export async function updatePassword(newPasswordForm: NewPasswordForm, token: string) {
  try {
    const response = await api.post(`/auth/update-password/${token}`, newPasswordForm);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    } else {
      throw new Error("Error al actualizar la contraseña");
    }
  }
}
