import { Link } from "react-router-dom";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { useState } from "react";
import { UserConfirmAccountForm } from "../../types";
import { useMutation } from "@tanstack/react-query";
import { confirmAccount } from "../../api/AuthApi";
import { toast } from "react-toastify";

export default function ConfirmAccountView() {
  const [token, setToken] = useState<UserConfirmAccountForm["token"]>("");

  const { mutate } = useMutation({
    mutationFn: confirmAccount,
    onSuccess: () => {
      console.log("Cuenta confirmada");
      toast.success("Cuenta confirmada");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Error al confirmar la cuenta");
    },
  });

  const handleComplete = (value: UserConfirmAccountForm["token"]) => {
    mutate({ token: value });
  };

  return (
    <>
      <h1 className="text-5xl font-black text-white">Confirma tu Cuenta</h1>
      <p className="text-2xl font-light text-white mt-5">
        Ingresa el código que recibiste {""}
        <span className=" text-fuchsia-500 font-bold"> por e-mail</span>
      </p>
      <form className="space-y-8 p-10 bg-white mt-10">
        <label className="font-normal text-2xl text-center block">Código de 6 dígitos</label>
        <PinInput onChange={(value) => setToken(value)} value={token} onComplete={handleComplete}>
          <PinInputField className="w-10 h-10 text-center bg-gray-100 mx-1" />
          <PinInputField className="w-10 h-10 text-center bg-gray-100 mx-1" />
          <PinInputField className="w-10 h-10 text-center bg-gray-100 mx-1" />
          <PinInputField className="w-10 h-10 text-center bg-gray-100 mx-1" />
          <PinInputField className="w-10 h-10 text-center bg-gray-100 mx-1" />
          <PinInputField className="w-10 h-10 text-center bg-gray-100 mx-1" />
        </PinInput>
      </form>

      <nav className="mt-10 flex flex-col space-y-4">
        <Link to="/auth/new-code" className="text-center text-gray-300 font-normal">
          Solicitar un nuevo Código
        </Link>
      </nav>
    </>
  );
}
