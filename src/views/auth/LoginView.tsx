import { useForm } from "react-hook-form";
import { UserLoginForm } from "../../types";
import { ErrorMessage } from "../../components/ErrorMessage";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../api/AuthApi";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

export default function LoginView() {
  const navigate = useNavigate();
  const initialValues: UserLoginForm = {
    email: "",
    password: "",
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: login,
    onSuccess: async () => {
      toast.success("Inicio de sesión exitoso");
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleLogin = (formData: UserLoginForm) => {
    mutate(formData);
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleLogin)} className="space-y-8 p-10 bg-white" noValidate>
        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl">Email</label>

          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
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

        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl">Password</label>

          <input
            type="password"
            placeholder="Password de Registro"
            className="w-full p-3  border-gray-300 border"
            {...register("password", {
              required: "El Password es obligatorio",
            })}
          />
          {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
        </div>

        <input
          type="submit"
          value="Iniciar Sesión"
          className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
        />
      </form>

      <nav className="flex justify-center items-center gap-2">
        <Link to="/auth/register">¿No tienes una cuenta? Regístrate</Link>
        <Link to="/auth/forgot-password">¿Olvidaste tu contraseña? Recupérala</Link>
      </nav>
    </>
  );
}
