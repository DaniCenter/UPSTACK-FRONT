import NewPasswordToken from "../../components/auth/NewPasswordToken";
import NewPasswordForm from "../../components/auth/NewPasswordForm";
import { useState } from "react";

export default function NewPasswordView() {
  const [token, setToken] = useState("");
  const [isValidToken, setIsValidToken] = useState(false);

  return (
    <>
      <h1 className="text-5xl font-black text-white">Recuperar contraseña</h1>
      <p className="text-2xl font-light text-white mt-5">Ingresa el codigo que recibiste en tu correo</p>

      {!isValidToken ? (
        <NewPasswordToken setToken={setToken} token={token} setIsValidToken={setIsValidToken} />
      ) : (
        <NewPasswordForm token={token} />
      )}
    </>
  );
}
