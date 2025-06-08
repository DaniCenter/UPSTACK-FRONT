import { Task } from "../../types";
import { TaskCard } from "./TaskCard";
import statusTranslation from "../../locales/es";
import DropTask from "./DropTask";

type TasksListProps = {
  tasks: Task[];
  canEdit: boolean;
};

type GroupedTasks = {
  [key: string]: Task[];
};

const initialGroupedTasks: GroupedTasks = {
  pending: [],
  onHold: [],
  inProgress: [],
  underReview: [],
  completed: [],
};

const statusStyles: { [key: string]: string } = {
  pending: "border-t-slate-500",
  onHold: "border-t-yellow-500",
  inProgress: "border-t-blue-500",
  underReview: "border-t-orange-500",
  completed: "border-t-green-500",
};

export function TasksList({ tasks, canEdit }: TasksListProps) {
  const groupedTasks = tasks.reduce((acc, task) => {
    let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
    currentGroup = [...currentGroup, task];
    return { ...acc, [task.status]: currentGroup };
  }, initialGroupedTasks);

  return (
    <>
      <h2 className="text-2xl font-bold text-center">Tareas</h2>

      <div className="flex gap-5 overflow-x-scroll 2xl:overflow-auto">
        {Object.entries(groupedTasks).map(([status, tasks]) => (
          <div key={status} className="min-w-[300px] 2xl:min-w-0 2xl:w-1/5">
            <h3 className={`capitalize text-xl border border-t-8 p-2 ${statusStyles[status]}`}>{statusTranslation[status]}</h3>
            <DropTask />
            <ul className="mt-5 space-y-5">
              {tasks.length === 0 ? (
                <li className="text-gray-500 text-center pt-3">No Hay tareas</li>
              ) : (
                tasks.map((task) => <TaskCard key={task._id} task={task} canEdit={canEdit} />)
              )}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}
