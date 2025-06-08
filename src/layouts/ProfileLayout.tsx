import { Outlet } from "react-router-dom";
import Tabs from "../components/profile/Tabs";

export default function ProfileLayout() {
  return (
    <div>
      <Tabs />
      <Outlet />
    </div>
  );
}
