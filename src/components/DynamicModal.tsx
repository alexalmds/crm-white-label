import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, DateInput } from '@nextui-org/react';
import { CalendarDate } from "@internationalized/date";
import SelectBox from './SelectBox'; // Importe o seu SelectBox

interface InputField {
  type: 'text' | 'email' | 'select' | 'date' | 'dateInput';
  label: string;
  placeholder?: string;
  options?: { label: string; value: string }[]; // Estrutura dos options {label, value}
  value: string | CalendarDate; 
  onChange: (value: string | CalendarDate) => void; 
}

interface DynamicModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  title: string;
  fields: InputField[];
  onSubmit: () => void;
  size: "xl" | "md" | "xs" | "sm" | "lg" | "2xl" | "3xl" | "4xl" | "5xl" | "full";
}

const DynamicModal: React.FC<DynamicModalProps> = ({ isOpen, onOpenChange, title, fields, onSubmit, size }) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur" size={size}>
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fields.map((field, index) => {
              if (field.type === 'select') {
                return (
                  <SelectBox
                    key={index}
                    placeholder={field.label}
                    options={field.options ? field.options.map(opt => ({ value: opt.value, display: opt.label })) : []}
                    value={field.value as string}
                    onChange={(value) => field.onChange(value)}
                  />
                );
              } else if (field.type === 'dateInput') {
                return (
                  <DateInput
                    key={index}
                    label={field.label}
                    placeholderValue={new CalendarDate(1995, 11, 6)}
                    value={field.value as CalendarDate}
                    onChange={(date) => field.onChange(date)}
                    className="max-w-sm"
                  />
                );
              } else {
                return (
                  <Input
                    key={index}
                    label={field.label}
                    placeholder={field.placeholder}
                    value={field.value as string}
                    onChange={(e) => field.onChange(e.target.value)}
                    type={field.type}
                  />
                );
              }
            })}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="flat" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button color="primary" onClick={onSubmit}>
            Confirmar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DynamicModal;
