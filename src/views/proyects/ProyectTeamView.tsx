import { Link, useNavigate, useParams } from "react-router-dom";
import AddMemberModal from "../../components/team/AddMemberModal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProyectTeam, removeMemberFromTeam } from "../../api/TeamApi";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";
import { toast } from "react-toastify";

export default function ProyectTeamView() {
  const navigate = useNavigate();
  const { proyectId } = useParams();
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["team", proyectId],
    queryFn: () => getProyectTeam({ projectId: proyectId! }),
    retry: false,
  });

  const { mutate } = useMutation({
    mutationFn: ({ projectId, userId }: { projectId: string; userId: string }) => removeMemberFromTeam({ projectId, userId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["team", proyectId] });
      toast.success("Integrante eliminado del proyecto");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  if (isLoading) return <div>Cargando...</div>;
  if (isError) return <div>Error al cargar el equipo</div>;

  if (data) {
    return (
      <div className="container">
        <button
          onClick={() => navigate(`/proyects/${proyectId}/ver/team?addMember=true`)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 cursor-pointer"
        >
          Agregar Colaborador
        </button>

        <Link to={`/proyects/${proyectId}/ver`} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 cursor-pointer">
          Volver a Proyecto
        </Link>

        <h2 className="text-5xl font-black my-10">Miembros actuales</h2>
        {data.length ? (
          <ul role="list" className="divide-y divide-gray-100 border border-gray-100 mt-10 bg-white shadow-lg">
            {data?.map((member) => (
              <li className="flex justify-between gap-x-6 px-5 py-10">
                <div className="flex min-w-0 gap-x-4">
                  <div className="min-w-0 flex-auto space-y-2">
                    <p className="text-2xl font-black text-gray-600">{member.name}</p>
                    <p className="text-sm text-gray-400">{member.email}</p>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-x-6">
                  <Menu as="div" className="relative flex-none">
                    <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                      <span className="sr-only">opciones</span>
                      <EllipsisVerticalIcon className="h-9 w-9" aria-hidden="true" />
                    </Menu.Button>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                        <Menu.Item>
                          <button
                            type="button"
                            className="block px-3 py-1 text-sm leading-6 text-red-500"
                            onClick={() => mutate({ projectId: proyectId!, userId: member._id })}
                          >
                            Eliminar del Proyecto
                          </button>
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center py-20">No hay miembros en este equipo</p>
        )}

        <AddMemberModal />
      </div>
    );
  }
}
