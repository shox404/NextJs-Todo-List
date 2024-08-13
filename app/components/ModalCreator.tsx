"use client";
import React, { useState } from "react";
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
import { $getId } from "dollar-kit";

interface ModalCreatorProps {
  isOpen: boolean;
  onClose: () => void;
  setNotes: React.Dispatch<React.SetStateAction<object[]>>;
}

const ModalCreator: React.FC<ModalCreatorProps> = ({
  isOpen,
  onClose,
  setNotes,
}) => {
  const [note, setNote] = useState<object>({});

  const createNote = () => {
    const data = { ...note, id: $getId(10) };
    setNotes((p) => [...p, data]);
    onClose();
  };

  const setting = (key: string, e: React.ChangeEvent<HTMLInputElement>) => {
    setNote((p) => ({ ...p, [key]: e.target.value }));
  };

  return (
    <Modal size={"sm"} isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">Create Note</ModalHeader>
        <ModalBody>
          <Input placeholder="Title" onChange={(e) => setting("title", e)} />
          <Textarea placeholder="Note" onChange={(e) => setting("note", e)} />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" variant="ghost" onPress={onClose}>
            Close
          </Button>
          <Button color="secondary" onPress={createNote}>
            Action
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalCreator;
