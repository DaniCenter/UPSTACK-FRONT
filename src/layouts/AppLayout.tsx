import { Navigate, Outlet } from "react-router-dom";
import NavMenu from "../components/NavMenu";
import { Logo } from "../components/Logo";
import { ToastContainer } from "react-toastify";
import { getUser } from "../api/AuthApi";
import { useQuery } from "@tanstack/react-query";

export default function AppLayout() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["user2"],
    queryFn: getUser,
    retry: false,
  });

  if (isLoading) return <div>Cargando...</div>;

  if (isError) {
    return <Navigate to="/auth/login" replace />;
  }

  return (
    <div>
      <header className="bg-gray-700 text-white py-8">
        <div className="max-w-screen-2xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <Logo />
            </div>
            <div>
              <NavMenu user={data} />
            </div>
          </div>
        </div>
      </header>

      <section className="bg-gray-100 py-8">
        <div className="max-w-screen-2xl mx-auto">
          <Outlet />
        </div>
      </section>

      <footer className="bg-gray-700 text-white py-8">
        <div className="max-w-screen-2xl mx-auto text-center">
          <p>Copyright &copy; 2025 LogoUpStack</p>
        </div>
      </footer>

      <ToastContainer pauseOnFocusLoss={false} pauseOnHover={false} />
    </div>
  );
}
