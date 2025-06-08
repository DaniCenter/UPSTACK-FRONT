import { Outlet } from "react-router-dom";
import { Logo } from "../components/Logo";
import { ToastContainer } from "react-toastify";
export default function AuthLayout() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <Logo />
        <Outlet />
      </div>

      <ToastContainer pauseOnFocusLoss={false} pauseOnHover={false} />
    </div>
  );
}
