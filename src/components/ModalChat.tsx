// components/ModalChat.tsx
import React, { useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Textarea,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Tooltip,
} from '@nextui-org/react';

interface Message {
  sender: 'user' | 'client';
  text: string;
}

interface ModalChatProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  clientName: string; // Nome do cliente
  messages: Message[];
  onSendMessage: (text: string) => void; // Função para enviar mensagens
}

const ModalChat: React.FC<ModalChatProps> = ({
  isOpen,
  onOpenChange,
  clientName,
  messages,
  onSendMessage,
}) => {
  const [messageText, setMessageText] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<'prioritario' | 'com-atencao' | 'concluido' | ''>('');

  const handleSendMessage = () => {
    if (messageText.trim()) {
      onSendMessage(messageText.trim());
      setMessageText('');
    }
    else {
        alert('Insira uma mensagem antes de enviar')
    }
  };

  const handleStatusChange = (status: 'prioritario' | 'com-atencao' | 'concluido') => {
    setSelectedStatus(status);
    // Aqui você pode implementar lógica para enviar esse status ao backend
  };

  const handleSendFile = () => {
    // Lógica para enviar documento
    alert('Envio de documento não implementado ainda.');
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size='5xl' backdrop='blur'>
      <ModalContent>
        <ModalHeader className="flex justify-between">
          <span>{`Conversa com ${clientName}`}</span>

          {/* Dropdown para mudar o status */}
          <Dropdown>
            <DropdownTrigger>
              <Button variant='flat' size="sm">
                {selectedStatus ? selectedStatus.replace('-', ' ').toUpperCase() : 'Mudar Status'}
              </Button>
            </DropdownTrigger>
            <DropdownMenu onAction={(key) => handleStatusChange(key as 'prioritario' | 'com-atencao' | 'concluido')}>
              <DropdownItem key="prioritario">Prioritário</DropdownItem>
              <DropdownItem key="com-atencao">Com Atenção</DropdownItem>
              <DropdownItem key="concluido">Concluído</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </ModalHeader>

        <ModalBody>
          <div className="flex flex-col space-y-3 max-h-60 overflow-y-auto bg-gray-100 p-2 rounded-lg">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`p-3 rounded-lg ${
                    msg.sender === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-300 text-black'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <Textarea
            label="Digite sua mensagem..."
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            rows={3}
            style={{ marginTop: '10px' }}
            className="mt-4"
          />

          <div className="flex justify-between mt-4">
            {/* Botão para envio de documento */}
            <Tooltip content="Envie um documento" placement="top">
              <Button variant='flat' color="primary" onClick={handleSendFile}>
                Enviar Documento
              </Button>
            </Tooltip>
          </div>
        </ModalBody>

        <ModalFooter className="flex justify-between">
          <Button color="danger" variant='flat' onClick={() => onOpenChange(false)}>
            Fechar
          </Button>
          <Button onClick={handleSendMessage}>Enviar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalChat;
