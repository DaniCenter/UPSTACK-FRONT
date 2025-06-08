import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProyect, getProyects } from "../api/ProyectApi";
import { ProyectCard } from "../components/proyects/ProyectCard";
import { toast } from "react-toastify";
import { useAuth } from "../hooks/useAuth";

export default function DashboardView() {
  const queryClient = useQueryClient();
  const { data: user, isLoading: isLoadingUser } = useAuth();
  const { data, isLoading } = useQuery({
    queryKey: ["proyects"],
    queryFn: getProyects,
  });

  const mutation = useMutation({
    mutationFn: deleteProyect,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Proyecto eliminado correctamente");
      queryClient.invalidateQueries({ queryKey: ["proyects"] });
    },
  });

  if (isLoading || isLoadingUser) return <div>Cargando...</div>;

  if (data && user)
    return (
      <div className="container">
        <div className="flex flex-col gap-2 mb-4">
          <h1 className="text-2xl font-bold">Mis Proyectos</h1>
          <p className="text-gray-500">Maneja tus proyectos de manera fácil y eficiente</p>
        </div>

        <Link to="/proyects/create">
          <button className="cursor-pointer border-none bg-blue-500 text-white font-bold py-2 px-4 rounded">Crear Proyecto</button>
        </Link>

        {!data.proyects.length ? (
          <div className="flex flex-col items-center justify-center">
            No hay proyectos, crea uno con{" "}
            <Link to="/proyects/create" className="text-blue-500 hover:text-blue-600 cursor-pointer underline">
              Crear Proyecto
            </Link>
          </div>
        ) : (
          <div className="flex flex-col mt-4">
            {data.proyects.map((proyect) => (
              <ProyectCard
                key={proyect._id}
                proyect={proyect}
                onDelete={() => mutation.mutate(proyect._id)}
                isManager={proyect.manager === user._id}
              />
            ))}
          </div>
        )}
      </div>
    );
}
