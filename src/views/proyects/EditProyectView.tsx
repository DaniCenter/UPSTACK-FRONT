import { Link, Navigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProyectById } from "../../api/ProyectApi";
import { EditProyectForm } from "../../components/proyects/EditProyectForm";

export function EditProyectView() {
  const { proyectId } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["editProyect", proyectId],
    queryFn: () => getProyectById(proyectId as string),
    retry: false,
  });

  if (isLoading) return <div>Cargando...</div>;
  if (isError) return <Navigate to="/404" />;
  if (data)
    return (
      <div className="container">
        <div className="flex flex-col gap-2 mb-4">
          <h1 className="text-2xl font-bold">Editar Proyecto</h1>
          <Link to="/" className="text-blue-500 hover:text-blue-600 cursor-pointer underline">
            Volver a la lista de proyectos
          </Link>
        </div>
        <EditProyectForm proyect={data.proyect} />
      </div>
    );
}
