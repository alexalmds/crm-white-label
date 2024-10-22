// pages/Atendimento.tsx
'use client'
import React, { useState } from 'react';
import ChatHeader from '@/components/ChatHeader';
import ModalChat from '@/components/ModalChat';

// Definição do tipo Message
interface Message {
    sender: 'user' | 'client'; // Restringe o valor de sender
    text: string;
  }

// Simulação de dados
const customersInService = [
    { id: 1, name: 'Marcos F.', status: 'em-atendimento' },
    { id: 2, name: 'Aline B.', status: 'prioritario' },
    { id: 3, name: 'Marielle C.', status: 'necessita-atencao' },
    { id: 4, name: 'Anderson F.', status: 'conversa-abandonada' },
];

const finishedChats = [
    { id: 1, name: 'Cliente 1', finishedAt: '2024-10-01T12:00:00Z', lastMessage: 'Conversa finalizada.' },
    { id: 2, name: 'Cliente 2', finishedAt: '2024-10-02T14:30:00Z', lastMessage: 'Problema resolvido.' },
];

const messagesByCustomer = {
    1: [
        { sender: 'user', text: 'Olá! Como posso ajudar?' },
        { sender: 'client', text: 'Oi, preciso de ajuda com meu pedido.' },
    ],
    2: [
        { sender: 'user', text: 'Como posso ajudar você hoje?' },
        { sender: 'client', text: 'Quero saber sobre meu pedido.' },
    ],
    3: [
        { sender: 'user', text: 'Olá! O que você precisa?' },
        { sender: 'client', text: 'Como posso cancelar minha assinatura?' },
    ],
    4: [
        { sender: 'user', text: 'Oi, como posso ajudar?' },
        { sender: 'client', text: 'Estou com um problema no meu pagamento.' },
    ],
};

const Atendimento: React.FC = () => {
    const [activeTab, setActiveTab] = useState('em-atendimento');
    const [activeConversation, setActiveConversation] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { sender: 'user', text: 'Olá! Como posso ajudar?' },
        { sender: 'client', text: 'Oi, preciso de ajuda com meu pedido.' },
        { sender: 'user', text: 'Claro! O que você precisa?' },
      ]);

    // Simulando algumas conversas
    const conversations = [
        { id: 1, name: 'Marcos F.', lastMessage: 'Oi, preciso de ajuda.', newMessages: 2 },
        { id: 2, name: 'Aline B.', lastMessage: 'Quero saber sobre meu pedido.', newMessages: 0 },
        { id: 3, name: 'Marielle C.', lastMessage: 'Como posso cancelar minha assinatura?', newMessages: 1 },
        { id: 4, name: 'Zema A.', lastMessage: 'Como posso cancelar minha assinatura?', newMessages: 1 },

    ];


    const openChat = (clientId: number) => {
        // Busca as mensagens do cliente no objeto messagesByCustomer
        const clientMessages = messagesByCustomer[clientId] || [];
        setMessages(clientMessages); // Define as mensagens como as do cliente clicado
        setActiveConversation(clientId); // Define a conversa ativa
        setIsModalOpen(true); // Abre o modal
    };

    const handleSendMessage = (text: string) => {
        // Adiciona a nova mensagem no estado
        const newMessage : Message = { sender: 'user', text };
        setMessages(prevMessages => [...prevMessages, newMessage]);

        // Aqui você pode fazer a lógica para enviar a mensagem ao cliente via Venom Bot, se necessário
    };

    return (
        <div className="flex flex-col h-screen w-full mt-11">
            <ChatHeader activeTab={activeTab} setActiveTab={setActiveTab}  />
            <div className="flex p-4">
                {/* Cards para clientes em atendimento */}
                {activeTab === 'em-atendimento' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {customersInService.map(customer => (
                            <div
                                key={customer.id}
                                className={`p-4 border-l-4 ${customer.status === 'em-atendimento'
                                        ? 'border-blue-500'
                                        : customer.status === 'prioritario'
                                            ? 'border-red-500'
                                            : customer.status === 'necessita-atencao'
                                                ? 'border-yellow-500'
                                                : 'border-purple-500'
                                    } bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200 cursor-pointer`}
                                onClick={() => openChat(customer.id)}
                            >
                                <h2 className="text-lg font-bold">{customer.name}</h2>
                                <p className="text-sm">{customer.status}</p>
                                {/* Tooltip de status */}
                                <span className="text-xs text-gray-500" title={customer.status}>
                                    {customer.status}
                                </span>
                            </div>
                        ))}
                    </div>
                ) : (
                    /* Tabela de atendimentos finalizados */
                    <div className="overflow-x-auto w-full">
                        <table className="min-w-full table-auto bg-white shadow-md rounded-lg overflow-hidden">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="py-3 px-5 text-left text-sm font-semibold text-gray-700 border-b">Cliente</th>
                                    <th className="py-3 px-5 text-left text-sm font-semibold text-gray-700 border-b">Finalizado em</th>
                                    <th className="py-3 px-5 text-left text-sm font-semibold text-gray-700 border-b">Última Mensagem</th>
                                </tr>
                            </thead>
                            <tbody>
                                {finishedChats.map(chat => (
                                    <tr key={chat.id} className="bg-white border-b hover:bg-gray-100 transition-colors duration-150">
                                        <td className="py-4 px-5 text-sm font-medium text-gray-900">{chat.name}</td>
                                        <td className="py-4 px-5 text-sm text-gray-500">
                                            {new Date(chat.finishedAt).toLocaleString()}
                                        </td>
                                        <td className="py-4 px-5 text-sm text-gray-500">{chat.lastMessage}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Modal do Chat */}
            <ModalChat
                isOpen={isModalOpen}
                onOpenChange={setIsModalOpen}
                clientName={activeConversation !== null ? conversations.find(conv => conv.id === activeConversation)?.name || '' : ''}
                messages={messages}
                onSendMessage={handleSendMessage}
            />
        </div>
    );
};

export default Atendimento;
