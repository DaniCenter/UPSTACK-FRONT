import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Navigate, useParams } from "react-router-dom";
import { getTaskById, updateStatusTask } from "../../api/TaskApi";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import statusTranslation from "../../locales/es";
import { useMutation } from "@tanstack/react-query";
import { Task } from "../../types";
import { useQueryClient } from "@tanstack/react-query";
import NotesPanel from "../notes/NotesPanel";

export default function TaskModalDetails() {
  const queryParams = new URLSearchParams(useLocation().search);
  const show = queryParams.get("viewTask") ? true : false;
  const taskId = queryParams.get("viewTask");
  const navigate = useNavigate();
  const { proyectId } = useParams();
  const queryClient = useQueryClient();

  const { data, isError, error } = useQuery({
    queryKey: ["task", taskId],
    queryFn: () => getTaskById(taskId!, proyectId!),
    enabled: !!taskId,
    retry: false,
  });

  const { mutate } = useMutation({
    mutationFn: updateStatusTask,
    onError: (error) => {
      toast.error(error.message, { toastId: "error" });
    },
    onSuccess: () => {
      toast.success("Estado actualizado correctamente", { toastId: "success" });
      queryClient.invalidateQueries({ queryKey: ["proyect", proyectId] });
      queryClient.invalidateQueries({ queryKey: ["task", taskId] });
    },
  });

  const handleChangeStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const data = {
      proyectId: proyectId!,
      taskId: taskId!,
      status: e.target.value as Task["status"],
    };
    mutate(data);
  };

  if (isError) {
    toast.error(error.message, { toastId: "error" });
    return <Navigate to={`${location.pathname}`} />;
  }

  return (
    <>
      <Transition appear show={show} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => {
            navigate(location.pathname, { replace: true });
          }}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/60" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                  {data?.task.completedBy && (
                    <>
                      <h1 className="text-2xl font-bold text-slate-600 my-5">Historial de cambios</h1>
                      {data?.task.completedBy.map((change) => (
                        <ol key={change.user._id} className="flex flex-col gap-2">
                          <li>
                            {change.user.name} - {change.status}
                          </li>
                        </ol>
                      ))}
                    </>
                  )}

                  <Dialog.Title as="h3" className="font-black text-4xl text-slate-600 my-5">
                    {data?.task.name}
                  </Dialog.Title>
                  <p className="text-lg text-slate-500 mb-2">Descripción:</p>
                  <p className="text-slate-500">{data?.task.description}</p>
                  <div className="my-5 space-y-3">
                    <label className="font-bold">Estado Actual:</label>

                    <select
                      className="w-full p-2 rounded-md border border-slate-300"
                      onChange={handleChangeStatus}
                      value={data?.task.status}
                    >
                      {Object.keys(statusTranslation).map((status) => (
                        <option key={status} value={status}>
                          {statusTranslation[status]}
                        </option>
                      ))}
                    </select>
                  </div>

                  <NotesPanel notes={data?.task.notes || []} />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
