import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import TaskForm from "./TaskForm";
import { useForm } from "react-hook-form";
import { TaskFormData } from "../../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "../../api/TaskApi";
import { toast } from "react-toastify";

export default function AddTaskModal() {
  const location = useLocation();
  const navigate = useNavigate();
  const { proyectId } = useParams();
  const queryParams = new URLSearchParams(location.search);
  const queryClient = useQueryClient();
  const modalOpen = queryParams.get("newTask") ? true : false;

  const mutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      toast.success("Tarea creada correctamente");
      navigate(location.pathname, { replace: true });
      reset();
      queryClient.invalidateQueries({ queryKey: ["proyect", proyectId] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TaskFormData>();

  const onSubmit = (data: TaskFormData) => {
    mutation.mutate({ task: data, idProyect: proyectId as string });
  };

  return (
    <>
      <Transition appear show={modalOpen} as={Fragment}>
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
                  <Dialog.Title as="h3" className="font-black text-4xl  my-5">
                    Nueva Tarea
                  </Dialog.Title>

                  <p className="text-xl font-bold">
                    Llena el formulario y crea {""}
                    <span className="text-fuchsia-600">una tarea</span>
                  </p>

                  <form onSubmit={handleSubmit(onSubmit)}>
                    <TaskForm errors={errors} register={register} />

                    <button type="submit" className="bg-fuchsia-600 text-white px-4 py-2 rounded-md mt-4 w-full cursor-pointer">
                      Crear Tarea
                    </button>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
