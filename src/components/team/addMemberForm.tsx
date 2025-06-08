import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { ErrorMessage } from "../ErrorMessage";
import { TeamMemberForm } from "../../types";
import { findUserByEmail } from "../../api/TeamApi";
import { SearchResult } from "./SearchResult";

export default function AddMemberForm() {
  const initialValues: TeamMemberForm = {
    email: "",
  };
  const params = useParams();
  const proyectId = params.proyectId!;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const mutation = useMutation({
    mutationFn: findUserByEmail,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleSearchUser = async (data: TeamMemberForm) => {
    mutation.mutate({ projectId: proyectId, formData: data });
  };

  const handleReset = () => {
    reset();
    mutation.reset();
  };

  return (
    <>
      <form className="mt-10 space-y-5" onSubmit={handleSubmit(handleSearchUser)} noValidate>
        <div className="flex flex-col gap-3">
          <label className="font-normal text-2xl" htmlFor="name">
            E-mail de Usuario
          </label>
          <input
            id="name"
            type="text"
            placeholder="E-mail del usuario a Agregar"
            className="w-full p-3  border-gray-300 border"
            {...register("email", {
              required: "El Email es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "E-mail no válido",
              },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>

        <input
          type="submit"
          className=" bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
          value="Buscar Usuario"
        />

        {mutation.isPending && <p>Buscando usuario...</p>}
        {mutation.isError && <p>Error al buscar usuario</p>}
        {mutation.isSuccess && <SearchResult user={mutation.data.user} reset={handleReset} />}
      </form>
    </>
  );
}
