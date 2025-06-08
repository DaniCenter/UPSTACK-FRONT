import { Proyect } from "../../types";
import { Link } from "react-router-dom";
type ProyectCardProps = {
  proyect: Proyect;
  onDelete: () => void;
  isManager: boolean;
};

export function ProyectCard({ proyect, onDelete, isManager }: ProyectCardProps) {
  return (
    <div className="bg-white p-5 shadow-md border border-gray-200 ">
      <span className="text-gray-500 text-sm font-bold mb-2 border-blue-500 border-2 rounded-md px-2 py-1 inline-block">
        {isManager ? "Propietario" : "Integrante"}
      </span>
      <h2 className="text-lg font-bold text-blue-500">{proyect.proyectName}</h2>
      <p className="text-gray-500 text-sm">Descripción: {proyect.description}</p>

      <div className="flex justify-end gap-2 mt-4">
        <Link to={`/proyects/${proyect._id}/ver`} className="bg-blue-500 text-white px-4 rounded-md hover:bg-blue-600 cursor-pointer">
          Ver
        </Link>
        {isManager && (
          <>
            <button onClick={onDelete} className="bg-red-500 text-white px-4 rounded-md hover:bg-red-600 cursor-pointer">
              Eliminar
            </button>
            <Link
              to={`/proyects/${proyect._id}/edit`}
              className="bg-yellow-500 text-white px-4 rounded-md hover:bg-yellow-600 cursor-pointer"
            >
              Editar
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
