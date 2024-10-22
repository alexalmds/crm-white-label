import React from 'react';

interface Conversation {
  id: number;
  name: string;
  lastMessage: string;
  newMessages: number;
  status: 'prioritario' | 'em_atendimento' | 'finalizado';
}

interface ChatListProps {
  conversations: Conversation[];
  selectConversation: (id: number) => void;
}

const ChatList: React.FC<ChatListProps> = ({ conversations, selectConversation }) => {
  return (
    <div className="overflow-y-auto h-[40%]">
      {conversations.map((conversation) => (
        <div
          key={conversation.id}
          className="flex justify-between p-2 hover:bg-gray-300 cursor-pointer"
          onClick={() => selectConversation(conversation.id)}
        >
          <div className="flex items-center">
            <span
              className={`inline-block w-3 h-3 rounded-full mr-2 ${conversation.status === 'prioritario' ? 'bg-red-500' : conversation.status === 'em_atendimento' ? 'bg-blue-500' : 'bg-green-500'}`}
            />
            <p className="font-bold">{conversation.name}</p>
            <span className="ml-2 bg-gray-300 text-gray-700 rounded-full px-2">{conversation.lastMessage}</span>
          </div>
          {conversation.newMessages > 0 && (
            <span className="bg-red-500 text-white rounded-full px-2">
              {conversation.newMessages}
            </span>
          )}
          <div className="relative">
            <button className="text-gray-500 hover:text-gray-700">
              ...
            </button>
            <div className="absolute right-0 w-32 bg-white shadow-lg rounded-md hidden group-hover:block z-50">
              <ul className="py-2">
                <li className="px-4 py-2 text-sm hover:bg-gray-200 cursor-pointer">Finalizar atendimento</li>
                <li className="px-4 py-2 text-sm hover:bg-gray-200 cursor-pointer">Priorizar atendimento</li>
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatList;
