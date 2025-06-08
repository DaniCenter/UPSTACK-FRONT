import api from "../lib/axios";
import { isAxiosError } from "axios";
import { ChangePasswordForm, UserFormData } from "../types";

export async function updateProfile(formData: UserFormData) {
  try {
    const response = await api.put("/auth/profile", formData);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
  }
}

export async function updatePassword(formData: ChangePasswordForm) {
  try {
    const response = await api.post("/auth/update-password", formData);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
  }
}
