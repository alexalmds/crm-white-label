// components/ChatHeader.tsx
import React from 'react';

const ChatHeader: React.FC<{ activeTab: string; setActiveTab: (tab: string) => void }> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="bg-gray-800 p-4 text-white flex justify-between items-center w-full">
      <h1 className="text-xl">Atendimentos</h1>
      <div className="space-x-4">
        <button onClick={() => setActiveTab('em-atendimento')} className={`py-2 px-4 rounded ${activeTab === 'em-atendimento' ? 'bg-blue-500' : 'bg-gray-700 hover:bg-gray-600'}`}>
          Em Atendimento
        </button>
        <button onClick={() => setActiveTab('finalizados')} className={`py-2 px-4 rounded ${activeTab === 'finalizados' ? 'bg-blue-500' : 'bg-gray-700 hover:bg-gray-600'}`}>
          Finalizados
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
