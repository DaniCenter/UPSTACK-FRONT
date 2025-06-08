import { useAuth } from "../../hooks/useAuth";
import { Note } from "../../types";
import AddNoteForm from "./AddNoteForm";
import NoteDetail from "./NoteDetail";

type NotesPanelProps = {
  notes: Note[];
};

export default function NotesPanel({ notes }: NotesPanelProps) {
  const { data: user, isPending } = useAuth();

  if (isPending) return <div>Cargando...</div>;

  return (
    <div>
      <AddNoteForm />

      <div className="mt-5">
        <h2 className="text-2xl font-bold">Notas</h2>
        <div className="mt-5">
          <div className="flex flex-col gap-2">
            {notes.length > 0 ? (
              notes.map((note) => <NoteDetail key={note._id} note={note} user={user} />)
            ) : (
              <p className="text-sm text-gray-500">No hay notas</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
