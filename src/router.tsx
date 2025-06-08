import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/AppLayout";
import DashboardView from "./views/DashboardView";
import { CreateProyectView } from "./views/proyects/CreateProyectView";
import { EditProyectView } from "./views/proyects/EditProyectView";
import { VerProyectoView } from "./views/proyects/VerProyectoView";
import AuthLayout from "./layouts/AuthLayout";
import LoginView from "./views/auth/LoginView";
import RegisterView from "./views/auth/RegisterView";
import ConfirmAcountView from "./views/auth/ConfirmAcountView";
import RequestConfirmationForm from "./views/auth/RequestConfirmationForm";
import ForgotPasswordView from "./views/auth/ForgotPasswordView";
import NewPasswordView from "./views/auth/NewPasswordView";
import ProyectTeamView from "./views/proyects/ProyectTeamView";
import ProfileView from "./views/profile/ProfileView";
import ChangePasswordView from "./views/profile/ChangePasswordView";
import ProfileLayout from "./layouts/ProfileLayout";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<DashboardView />} />
          <Route path="/proyects/create" element={<CreateProyectView />} />
          <Route path="/proyects/:proyectId/edit" element={<EditProyectView />} />
          <Route path="/proyects/:proyectId/ver" element={<VerProyectoView />} />
          <Route path="/proyects/:proyectId/ver/team" element={<ProyectTeamView />} />

          <Route element={<ProfileLayout />}>
            <Route path="/profile" element={<ProfileView />} />
            <Route path="/profile/password" element={<ChangePasswordView />} />
          </Route>
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/auth/login" element={<LoginView />} />
          <Route path="/auth/register" element={<RegisterView />} />
          <Route path="/auth/confirm-account" element={<ConfirmAcountView />} />
          <Route path="/auth/new-code" element={<RequestConfirmationForm />} />
          <Route path="/auth/forgot-password" element={<ForgotPasswordView />} />
          <Route path="/auth/new-password" element={<NewPasswordView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
