import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import ProyectForm from "../../components/proyects/ProyectForm";
import { ProyectoFormData } from "../../types";
import { createProyect } from "../../api/ProyectApi";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function CreateProyectView() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const initialValues: ProyectoFormData = {
    proyectName: "",
    clientName: "",
    description: "",
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProyectoFormData>({ defaultValues: initialValues });

  const mutate = useMutation({
    mutationFn: createProyect,
    onSuccess: (data) => {
      navigate("/");
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["proyects"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const handleForm = (data: ProyectoFormData) => {
    mutate.mutate(data);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-2 mb-4">
          <h1 className="text-2xl font-bold">Crear Proyecto</h1>
          <p className="text-gray-500">Crea un nuevo proyecto para tu empresa</p>
        </div>

        <Link to="/">
          <button className="btn btn-primary cursor-pointer border-none bg-blue-500 text-white font-bold py-2 px-4 rounded">Volver</button>
        </Link>
      </div>

      <form onSubmit={handleSubmit(handleForm)} noValidate className="shadow-md p-4 rounded-md">
        <ProyectForm register={register} errors={errors} />

        <button type="submit" className="w-full cursor-pointer border-none bg-blue-500 text-white font-bold py-2 px-4 rounded">
          Crear Proyecto
        </button>
      </form>
    </div>
  );
}
