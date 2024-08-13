"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
} from "@nextui-org/react";

interface ModalEditorProps {
  isOpen: boolean;
  note: any;
  notes: any[];
  onClose: () => void;
  setNote: React.Dispatch<React.SetStateAction<object[]>>;
  setNotes: React.Dispatch<React.SetStateAction<object[]>>;
}

const ModalEditor: React.FC<ModalEditorProps> = ({
  isOpen,
  note,
  notes,
  onClose,
  setNote,
  setNotes,
}) => {
  const editNote = () => {
    notes.map((item, index) => {
      if (item.id === note.id) {
        setNotes((prevNotes) => {
          const newNotes = [...prevNotes];
          newNotes.splice(index, 1, note);
          return newNotes;
        });
        onClose()
      }
    });
  };

  const setting = (key: string, e: React.ChangeEvent<HTMLInputElement>) => {
    setNote((p) => ({ ...p, [key]: e.target.value }));
  };

  return (
    <Modal size={"sm"} isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">Edit Note</ModalHeader>
        <ModalBody>
          <Input
            placeholder="Title"
            value={note.title}
            onChange={(e) => setting("title", e)}
          />
          <Textarea
            placeholder="Note"
            value={note.note}
            onChange={(e) => setting("note", e)}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" variant="ghost" onPress={onClose}>
            Close
          </Button>
          <Button color="secondary" onPress={editNote}>
            Action
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalEditor;
