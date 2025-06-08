import { useForm } from "react-hook-form";
import { Proyect, ProyectoFormData } from "../../types";
import ProjectForm from "./ProyectForm";
import { useMutation } from "@tanstack/react-query";
import { updateProyect } from "../../api/ProyectApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
type EditProyectFormProps = {
  proyect: Proyect;
};

export function EditProyectForm({ proyect }: EditProyectFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProyectoFormData>({ defaultValues: proyect });

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (data: ProyectoFormData) => {
      return updateProyect(proyect._id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["proyects"] });
      queryClient.invalidateQueries({ queryKey: ["editProyect", proyect._id] });
      toast.success("Proyecto actualizado correctamente");
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (data: ProyectoFormData) => {
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <ProjectForm register={register} errors={errors} />

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
        Guardar cambios
      </button>
    </form>
  );
}
