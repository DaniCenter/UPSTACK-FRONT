import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { Proyect, Task, TaskFormData } from "../../types";
import { useForm } from "react-hook-form";
import TaskForm from "./TaskForm";
import { useMutation } from "@tanstack/react-query";
import { updateTask } from "../../api/TaskApi";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

type EditTaskModalProps = {
  taskToEdit: Task;
  proyectId: Proyect["_id"];
};

export default function EditTaskModal({ taskToEdit, proyectId }: EditTaskModalProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormData>({
    defaultValues: {
      ...taskToEdit,
      name: taskToEdit.name,
      description: taskToEdit.description,
    },
  });

  const mutation = useMutation({
    mutationFn: (data: TaskFormData) => {
      return updateTask({ proyectId, taskId: taskToEdit._id, formData: data });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["proyect", proyectId] });
      queryClient.invalidateQueries({ queryKey: ["task", taskToEdit._id] });
      toast.success("Tarea actualizada correctamente");
      navigate(location.pathname, { replace: true });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (data: TaskFormData) => {
    mutation.mutate(data);
  };

  return (
    <Transition appear show={true} as={Fragment}>
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
                  Editar Tarea
                </Dialog.Title>

                <p className="text-xl font-bold">
                  Realiza cambios a una tarea en {""}
                  <span className="text-fuchsia-600">este formulario</span>
                </p>

                <form className="mt-10 space-y-3" noValidate onSubmit={handleSubmit(onSubmit)}>
                  <TaskForm errors={errors} register={register} />

                  <input
                    type="submit"
                    className=" bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
                    value="Guardar Tarea"
                  />
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
