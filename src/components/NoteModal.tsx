import React, { useState } from 'react';
import { Modal, TextInput, Button, Group } from '@mantine/core';

interface NoteModalProps {
  opened: boolean;
  onClose: () => void;
  onSave: (note: string) => void;
  initialNote?: string;
  date: Date | null;
}

const NoteModal: React.FC<NoteModalProps> = ({ opened, onClose, onSave, initialNote = '', date }) => {
  const [note, setNote] = useState(initialNote);

  const handleSave = () => {
    onSave(note);
    onClose();
  };

  if (!date) return null;

  return (
    <Modal 
      opened={opened} 
      onClose={onClose} 
      title={`Add Note for ${date.toLocaleDateString()}`}
    >
      <TextInput
        label="Note"
        placeholder="Enter your note here..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
        mb="md"
      />
      <Group justify="flex-end">
        <Button variant="default" onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </Group>
    </Modal>
  );
};

export default NoteModal; 