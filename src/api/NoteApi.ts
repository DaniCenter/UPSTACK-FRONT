import { NoteFormData } from "../types";
import api from "../lib/axios";
import { isAxiosError } from "axios";

export type NoteAPIType = {
  formData: NoteFormData;
  proyectId: string;
  taskId: string;
  noteId: string;
};

export async function createNote({ proyectId, taskId, formData }: Pick<NoteAPIType, "proyectId" | "taskId" | "formData">) {
  try {
    const response = await api.post(`/proyects/${proyectId}/tasks/${taskId}/notes`, formData);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
    throw new Error("Error al crear la nota");
  }
}

export async function deleteNote({ proyectId, taskId, noteId }: Pick<NoteAPIType, "proyectId" | "taskId" | "noteId">) {
  try {
    const response = await api.delete(`/proyects/${proyectId}/tasks/${taskId}/notes/${noteId}`);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
    throw new Error("Error al eliminar la nota");
  }
}
