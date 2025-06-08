import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Task } from "../../types";
import { useNavigate, useParams } from "react-router-dom";
import { deleteTask } from "../../api/TaskApi";
import { toast } from "react-toastify";

type TaskCardProps = {
  task: Task;
  canEdit: boolean;
};

export function TaskCard({ task, canEdit }: TaskCardProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { proyectId } = useParams();

  const mutation = useMutation({
    mutationFn: (taskId: Task["_id"]) => {
      return deleteTask(taskId, proyectId!);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["proyect", proyectId] });
      toast.success("Tarea eliminada correctamente");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return (
    <li className="bg-white rounded-lg p-4 shadow-md">
      <div>
        <h1 className="text-xl font-bold">Nombre: {task.name}</h1>
        <p className="text-gray-500 text-sm">Descripción: {task.description}</p>
      </div>

      <div className="flex gap-2">
        <button
          className="bg-blue-500 text-white p-1 rounded-md cursor-pointer"
          onClick={() => {
            navigate(`${location.pathname}?viewTask=${task._id}`);
          }}
        >
          Ver detalles
        </button>
        {canEdit && (
          <>
            <button
              className="bg-yellow-500 text-white p-1 rounded-md cursor-pointer"
              onClick={() => {
                navigate(`${location.pathname}?taskId=${task._id}`);
              }}
            >
              Editar
            </button>
            <button
              className="bg-red-500 text-white p-1 rounded-md cursor-pointer"
              onClick={() => {
                mutation.mutate(task._id);
              }}
            >
              Eliminar
            </button>
          </>
        )}
      </div>
    </li>
  );
}
