import { useLocation, useParams } from "react-router-dom";
import { getTaskById } from "../../api/TaskApi";
import { useQuery } from "@tanstack/react-query";
import EditTaskModal from "./EditTaskModal";

export function EditTaskData() {
  const params = useParams();
  const { proyectId } = params;

  const queryParams = new URLSearchParams(useLocation().search);
  const taskId = queryParams.get("taskId");

  const { data } = useQuery({
    queryKey: ["task", taskId],
    queryFn: () => getTaskById(taskId!, proyectId!),
    enabled: !!taskId,
  });

  if (data) return <EditTaskModal taskToEdit={data.task} proyectId={proyectId!} />;
}
