import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Select, SelectItem } from '@nextui-org/react';

interface InputField {
  type: 'text' | 'email' | 'select'; // Tipos suportados
  label: string;
  placeholder?: string;
  options?: string[]; // Para selects
  value: string; // Valor do campo
  onChange: (value: string) => void; // Função para alterar o valor
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
                  <Select
                    key={index}
                    label={field.label}
                    selectedKeys={new Set([field.value])}
                    onSelectionChange={(keys) => field.onChange(Array.from(keys)[0] as string)}
                  >
                    {field.options && field.options.length > 0 ? (
                      field.options?.map((option, i) => (
                        <SelectItem key={i} value={option}>
                          {option}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem key={0}>
                        Nenhuma opção disponível
                      </SelectItem>
                    )}
                  </Select>
                );
              } else {
                return (
                  <Input
                    key={index}
                    label={field.label}
                    placeholder={field.placeholder}
                    value={field.value}
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
