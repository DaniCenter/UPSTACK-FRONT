import { isAxiosError } from "axios";
import api from "../lib/axios";
import { TeamMember, TeamMemberForm } from "../types";

export async function findUserByEmail({ projectId, formData }: { projectId: string; formData: TeamMemberForm }) {
  try {
    const response = await api.post(`/proyects/${projectId}/team/find`, formData);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
  }
}

export async function addMemberToTeam({ projectId, id }: { projectId: string; id: string }) {
  try {
    const response = await api.post(`/proyects/${projectId}/team`, { id });
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
  }
}

export async function getProyectTeam({ projectId }: { projectId: string }) {
  try {
    const response = await api.get(`/proyects/${projectId}/team`);
    return response.data.team as TeamMember[];
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
  }
}

export async function removeMemberFromTeam({ projectId, userId }: { projectId: string; userId: string }) {
  try {
    const response = await api.delete(`/proyects/${projectId}/team/${userId}`);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
  }
}
