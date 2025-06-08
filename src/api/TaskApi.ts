import api from "../lib/axios";
import { isAxiosError } from "axios";
import { Proyect, Task, TaskFormData } from "../types";

export const deleteTask = async (taskId: Task["_id"], proyectId: Proyect["_id"]) => {
  try {
    const response = await api.delete(`/proyects/${proyectId}/tasks/${taskId}`);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
  }
};

export const updateTask = async ({
  proyectId,
  taskId,
  formData,
}: {
  proyectId: Proyect["_id"];
  taskId: Task["_id"];
  formData: TaskFormData;
}) => {
  try {
    const response = await api.put(`/proyects/${proyectId}/tasks/${taskId}`, formData);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
  }
};

export const getTaskById = async (taskId: Task["_id"], idProyect: Proyect["_id"]) => {
  try {
    const response = await api.get<{ task: Task }>(`/proyects/${idProyect}/tasks/${taskId}`);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
  }
};

export const createTask = async ({ task, idProyect }: { task: TaskFormData; idProyect: Proyect["_id"] }) => {
  try {
    const response = await api.post(`/proyects/${idProyect}/tasks`, task);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
  }
};

export const updateStatusTask = async ({
  proyectId,
  taskId,
  status,
}: {
  proyectId: Proyect["_id"];
  taskId: Task["_id"];
  status: Task["status"];
}) => {
  try {
    const response = await api.put(`/proyects/${proyectId}/tasks/${taskId}/status`, { status });
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
  }
};
