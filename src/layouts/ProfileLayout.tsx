import { Outlet } from "react-router-dom";
import Tabs from "../components/profile/tabs";

export default function ProfileLayout() {
  return (
    <div>
      <Tabs />
      <Outlet />
    </div>
  );
}
