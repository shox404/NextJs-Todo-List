"use client";
import { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import ModalCreator from "./components/ModalCreator";
import ModalEditor from "./components/ModalEditor";

interface Note {
  id: string;
  title: string;
  note: string;
}

export default function Home() {
  const [isCreatorOpen, setCreatorOpen] = useState<boolean>(false);
  const [isEditorOpen, setEditorOpen] = useState<boolean>(false);
  const [notes, setNotes] = useState<any[]>([]);
  const [note, setNote] = useState<Note | object>({});

  const toggleCreatorModal = () => setCreatorOpen(!isCreatorOpen);

  const toggleEditorModal = () => setEditorOpen(!isEditorOpen);

  const startEdit = (item: object) => {
    toggleEditorModal();
    setNote(item);
  };

  const remove = (id: string) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  return (
    <main>
      <ModalCreator
        isOpen={isCreatorOpen}
        onClose={toggleCreatorModal}
        setNotes={setNotes}
      />
      <ModalEditor
        isOpen={isEditorOpen}
        note={note}
        notes={notes}
        onClose={toggleEditorModal}
        setNote={setNote}
        setNotes={setNotes}
      />
      <div className="flex justify-between items-center p-4 h-20 w-full">
        <h1 className="text-xl">Notes</h1>
        <Button color="secondary" onClick={toggleCreatorModal}>
          + Add New Note
        </Button>
      </div>
      <div className="grid md:grid-cols-3 gap-4 p-4">
        {notes.map((item, index) => (
          <Card key={index}>
            <CardHeader className="text-xl font-bold flex justify-between">
              {item.title}
              <Dropdown>
                <DropdownTrigger>
                  <Button color="secondary" variant="flat">
                    Settings
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Dropdown Variants">
                  <DropdownItem
                    key={`edit-${item.id}`}
                    onClick={() => startEdit(item)}
                  >
                    Edit
                  </DropdownItem>
                  <DropdownItem
                    key={`delete-${item.id}`}
                    className="text-danger"
                    color="danger"
                    onClick={() => remove(item.id)}
                  >
                    Delete
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </CardHeader>
            <CardBody>
              <p className="text-default-500">{item.note}</p>
            </CardBody>
          </Card>
        ))}
      </div>
    </main>
  );
}
