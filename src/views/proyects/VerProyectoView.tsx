import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getProyectById } from "../../api/ProyectApi";
import NewTasks from "../../components/tasks/NewTasks";
import { TasksList } from "../../components/tasks/TasksList";
import { EditTaskData } from "../../components/tasks/EdiTaskData";
import TaskModalDetails from "../../components/tasks/TaskModalDetails";
import { isManager } from "../../lib/policies";
import { useAuth } from "../../hooks/useAuth";
import { useMemo } from "react";

export function VerProyectoView() {
  const { proyectId } = useParams();
  const navigate = useNavigate();

  const { data: user } = useAuth();
  const { data, isLoading } = useQuery({
    queryKey: ["proyect", proyectId],
    queryFn: () => getProyectById(proyectId as string),
  });

  const canEdit = useMemo(() => data?.proyect.manager === user?._id, [data, user]);

  if (isLoading) return <div>Cargando...</div>;

  if (data && user)
    return (
      <div className="container">
        <Link to="/" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 cursor-pointer">
          Volver
        </Link>

        <h1 className="text-2xl font-bold">{data.proyect.proyectName}</h1>
        <p className="text-gray-500">Descripción: {data.proyect.description}</p>
        <p className="text-gray-500">Cliente: {data.proyect.clientName}</p>

        {isManager(data.proyect.manager, user._id) && (
          <>
            <button
              onClick={() => navigate(`${location.pathname}?newTask=true`)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 cursor-pointer"
            >
              Agregar Tarea
            </button>

            <Link to={`team`} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 cursor-pointer">
              Colaboradores
            </Link>
          </>
        )}

        <TasksList tasks={data.proyect.tasks} canEdit={canEdit} />

        <NewTasks />
        <EditTaskData />
        <TaskModalDetails />
      </div>
    );
}
