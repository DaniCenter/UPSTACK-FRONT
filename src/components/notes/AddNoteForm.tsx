import { useForm } from "react-hook-form";
import type { NoteFormData } from "../../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "../../api/NoteApi";
import { toast } from "react-toastify";
import { useLocation, useParams } from "react-router-dom";

export default function AddNoteForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NoteFormData>();
  const { proyectId } = useParams();
  const location = new URLSearchParams(useLocation().search);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["task"] });
      toast.success("Nota creada correctamente");
      reset();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (data: NoteFormData) => {
    mutate({ proyectId: proyectId!, taskId: location.get("viewTask")!, formData: data });
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="flex flex-col gap-2">
        <label htmlFor="content">Contenido</label>
        <textarea
          id="content"
          className={`border border-gray-300 rounded-md p-2 ${errors.content ? "border-red-500 border-2" : ""} `}
          {...register("content", { required: "El contenido es requerido" })}
        />
        {errors.content && <p className="text-red-500">{errors.content.message as string}</p>}
      </div>

      <input
        type="submit"
        value="Agregar"
        className="bg-blue-500 text-white p-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors duration-300 hover:cursor-pointer"
        disabled={isPending}
      />
    </form>
  );
}
