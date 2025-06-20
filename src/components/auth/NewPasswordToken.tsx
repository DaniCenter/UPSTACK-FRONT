import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { validateToken } from "../../api/AuthApi";
import { toast } from "react-toastify";

type NewPasswordTokenProps = {
  setToken: React.Dispatch<React.SetStateAction<string>>;
  token: string;
  setIsValidToken: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function NewPasswordToken({ setToken, token, setIsValidToken }: NewPasswordTokenProps) {
  const { mutate } = useMutation({
    mutationFn: async (token: string) => {
      const response = await validateToken(token);
      return response;
    },
    onSuccess: (data) => {
      setIsValidToken(true);
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleChange = (token: string) => {
    setToken(token);
  };
  const handleComplete = (token: string) => {
    mutate(token);
  };

  return (
    <>
      <form className="space-y-8 p-10 rounded-lg bg-white mt-10">
        <label className="font-normal text-2xl text-center block">Código de 6 dígitos</label>
        <div className="flex justify-center gap-5">
          <PinInput value={token} onChange={handleChange} onComplete={handleComplete}>
            <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
            <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
            <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
            <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
            <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
            <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
          </PinInput>
        </div>
      </form>
      <nav className="mt-10 flex flex-col space-y-4">
        <Link to="/auth/forgot-password" className="text-center text-gray-300 font-normal">
          Solicitar un nuevo Código
        </Link>
      </nav>
    </>
  );
}
