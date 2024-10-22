// components/ChatWindow.tsx
import React, { useState } from 'react';

const ChatWindow: React.FC<{ messages: Array<{ sender: string; text: string }> }> = ({ messages }) => {
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    // Aqui você pode adicionar a lógica de envio de mensagem
    console.log(newMessage);
    setNewMessage('');
  };

  return (
    <div className="flex flex-col h-64">
      <div className="flex-1 overflow-auto bg-gray-100 p-2 rounded-lg">
        {messages.map((message, index) => (
          <div key={index} className={`mb-2 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
            <div className={`inline-block rounded-lg p-2 ${message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}>
              {message.text}
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center mt-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 border rounded p-2"
          placeholder="Digite sua mensagem..."
        />
        <button onClick={handleSendMessage} className="bg-blue-500 text-white rounded px-4 py-2 ml-2">Enviar</button>
      </div>
    </div>
  );
};

export default ChatWindow;
