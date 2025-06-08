import { TrashIcon } from "@heroicons/react/24/outline";
import { Note, User } from "../../types";
import { useMemo } from "react";
import { deleteNote } from "../../api/NoteApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useLocation, useParams } from "react-router-dom";

type NoteDetailProps = {
  note: Note;
  user: User;
};

export default function NoteDetail({ note, user }: NoteDetailProps) {
  const canDelete = useMemo(() => {
    return note.createdBy._id === user?._id;
  }, [note.createdBy._id, user?._id]);

  const { proyectId } = useParams();
  const location = new URLSearchParams(useLocation().search);
  const taskId = location.get("viewTask");

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["task"] });
      toast.success("Nota eliminada correctamente");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  if (user)
    return (
      <div className="bg-white p-4 rounded-md shadow-md border border-gray-200 hover:border-gray-300 transition-all duration-300  hover:bg-gray-50 hover:shadow-md hover:border-gray-400 hover:shadow-gray-400 hover:scale-105 hover:shadow-gray-400 relativ ">
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500">{note.content}</p>
          <p className="text-sm text-gray-500">{note.createdBy.name}</p>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500">{note.createdAt}</p>
          <p className="text-sm text-gray-500">{note.updatedAt}</p>
        </div>

        {canDelete && (
          <button
            className="w-full flex justify-center items-center bg-red-500 text-white p-2 rounded-md mt-2 hover:bg-red-600 transition-all duration-300 hover:cursor-pointer hover:scale-105 hover:shadow-md hover:shadow-red-400 hover:border-red-400 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => mutate({ proyectId: proyectId!, taskId: taskId!, noteId: note._id })}
            disabled={isPending}
          >
            <TrashIcon className="w-4 h-4" />
          </button>
        )}
      </div>
    );
}
