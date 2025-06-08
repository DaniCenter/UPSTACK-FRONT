import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TeamMember } from "../../types";
import { toast } from "react-toastify";
import { addMemberToTeam } from "../../api/TeamApi";
import { useNavigate, useParams } from "react-router-dom";

type SearchResultProps = {
  user: TeamMember;
  reset: () => void;
};

export function SearchResult({ user, reset }: SearchResultProps) {
  const params = useParams();
  const proyectId = params.proyectId!;
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: addMemberToTeam,
    onSuccess: () => {
      toast.success("Miembro agregado al equipo");
      queryClient.invalidateQueries({ queryKey: ["team", proyectId] });
      reset();
      navigate(location.pathname, { replace: true });
    },
    onError: () => {
      toast.error("Error al agregar miembro al equipo");
    },
  });

  const handleAddMemberToTeam = () => {
    mutate({ projectId: proyectId, id: user._id });
  };

  return (
    <div className="flex flex-col gap-2 bg-gray-100 p-4 rounded-md">
      <h4 className="text-lg font-bold">Resultado de la búsqueda</h4>
      <p className="text-sm">Nombre: {user.name}</p>
      <p className="text-sm">Email: {user.email}</p>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 hover:cursor-pointer"
        onClick={handleAddMemberToTeam}
      >
        Agregar al equipo
      </button>
    </div>
  );
}
