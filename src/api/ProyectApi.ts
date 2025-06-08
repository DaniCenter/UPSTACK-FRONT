import { AxiosError } from "axios";
import api from "../lib/axios";
import { DashboardViewProyects, Proyect, ProyectComplete, ProyectoFormData } from "../types";

export async function createProyect(data: ProyectoFormData) {
  try {
    const response = await api.post("/proyects", data);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    } else {
      throw new Error("Error al crear el proyecto");
    }
  }
}

export async function getProyects() {
  try {
    const response = await api.get("/proyects");
    return response.data as DashboardViewProyects;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    } else {
      throw new Error("Error al obtener los proyectos");
    }
  }
}

export async function getProyectById(proyectId: Proyect["_id"]) {
  try {
    const response = await api.get(`/proyects/${proyectId}`);
    return response.data as ProyectComplete;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    } else {
      throw new Error("Error al obtener los proyectos");
    }
  }
}

export async function updateProyect(proyectId: Proyect["_id"], data: ProyectoFormData) {
  try {
    const response = await api.put(`/proyects/${proyectId}`, data);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    } else {
      throw new Error("Error al actualizar el proyecto");
    }
  }
}

export async function deleteProyect(proyectId: Proyect["_id"]) {
  try {
    const response = await api.delete(`/proyects/${proyectId}`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    } else {
      throw new Error("Error al eliminar el proyecto");
    }
  }
}
