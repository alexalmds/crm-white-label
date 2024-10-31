"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';
import { FaCaretDown, FaBell, FaUserCircle } from 'react-icons/fa';
import { useMutation } from '@tanstack/react-query';
import { makeRequest } from '../../axios';
import { UserContext } from '@/context/UserContext';
import { Badge } from '@nextui-org/react';
import { FcBarChart, FcInspection, FcPlus, FcSms } from "react-icons/fc";

interface DropdownState {
    cadastros: boolean;
    lancamentos: boolean;
    relatorios: boolean;
    chat: boolean;
    user: boolean; // Adicionado para gerenciar o dropdown do usuário
}

interface Notification {
    message: string;
    time: string; // Ex: "5 minutos atrás"
    read: boolean; // Lida ou não lida
}

function Header() {
    const { user, setUser } = useContext(UserContext);
    const [showDropdowns, setShowDropdowns] = useState<DropdownState>({
        cadastros: false,
        lancamentos: false,
        relatorios: false,
        chat: false,
        user: false, // Inicialmente falso
    });
    const [showNotifications, setShowNotifications] = useState(false);
    const [notifications, setNotifications] = useState<Notification[]>([
        { message: 'Notificação 1: Você tem uma nova mensagem.', time: '5 minutos atrás', read: true },
        { message: 'Notificação 2: Seu pagamento foi processado.', time: '10 minutos atrás', read: false },
        { message: 'Notificação 3: Lembrete: Reunião amanhã às 10h.', time: '15 minutos atrás', read: false },
    ]);

    const router = useRouter();

    const mutation = useMutation({
        mutationFn: async () => {
            return await makeRequest.post("/auth/logout").then((res) => {
                sessionStorage.clear();
                res.data;
            });
        },
        onSuccess: () => {
            setUser(undefined);
            localStorage.removeItem("finsolve-crm:user");
            localStorage.removeItem("finsolve-crm:-auth");
            localStorage.removeItem("finsolve-crm:company");
            router.push("/");
        }
    });

    const toggleDropdown = (menu: 'cadastros' | 'lancamentos' | 'relatorios' | 'chat' | 'user') => {
        setShowDropdowns(prev => {
            const newState = { cadastros: false, lancamentos: false, relatorios: false, chat: false, user: false };
            return { ...newState, [menu]: !prev[menu] };
        });
    };

    const closeDropdowns = () => {
        setShowDropdowns({
            cadastros: false,
            lancamentos: false,
            relatorios: false,
            chat: false,
            user: false,
        });
    };

    const toggleNotifications = () => {
        setShowNotifications(!showNotifications);
    };

    const markAsRead = (index: number) => {
        const newNotifications = [...notifications];
        newNotifications[index].read = true;
        setNotifications(newNotifications);
    };

    return (
        <header className='w-full flex items-center bg-slate-900 text-white p-4 justify-between fixed z-50'>
            <div className='flex space-x-6 items-center'>
                <div className='text-2xl font-bold'>
                    <Link href={'/dashboard'}><span className='text-red-600'>Fin</span>Solve</Link>
                </div>

                {/* Módulo Cadastros */}
                <div className="relative">
                    <button onClick={() => toggleDropdown('cadastros')} className="flex items-center">
                        <FcPlus /> Cadastros <FaCaretDown className="ml-1" />
                    </button>
                    {showDropdowns.cadastros && (
                        <div className="absolute bg-white text-black mt-2 rounded shadow-lg p-2 z-10 whitespace-nowrap">
                            <Link href="/clientes" className="block p-1 hover:bg-gray-200">Clientes</Link>
                            <Link href="/contratos" className="block p-1 hover:bg-gray-200">Contratos</Link>
                            <Link href="/formas-de-pagamento" className="block p-1 hover:bg-gray-200">Forma de Pagamento</Link>
                            <Link href="/modelos-contrato" className="block p-1 hover:bg-gray-200">Modelos de Contrato</Link>
                            <Link href="/recorrencias" className="block p-1 hover:bg-gray-200">Recorrência</Link>
                            <Link href="/servicos" className="block p-1 hover:bg-gray-200">Serviços</Link>
                            <Link href="/setor" className="block p-1 hover:bg-gray-200">Setor</Link>
                            <Link href="/usuarios" className="block p-1 hover:bg-gray-200">Usuários</Link>
                        </div>
                    )}
                </div>

                {/* Módulo Lançamentos */}
                <div className="relative">
                    <button onClick={() => toggleDropdown('lancamentos')} className="flex items-center">
                        <FcInspection /> Lançamentos <FaCaretDown className="ml-1" />
                    </button>
                    {showDropdowns.lancamentos && (
                        <div className="absolute bg-white text-black mt-2 rounded shadow-lg p-2 z-10 whitespace-nowrap">
                            <Link href="/lancamentos/cobrancas" className="block p-1 hover:bg-gray-200">Cobranças</Link>
                            <Link href="/lancamentos/negativacao" className="block p-1 hover:bg-gray-200">Negativação</Link>
                            <Link href="/lancamentos/renegociacao" className="block p-1 hover:bg-gray-200">Renegociação</Link>
                        </div>
                    )}
                </div>

                {/* Módulo Relatórios */}
                <div className="relative">
                    <button onClick={() => toggleDropdown('relatorios')} className="flex items-center">
                        <FcBarChart /> Relatórios <FaCaretDown className="ml-1" />
                    </button>
                    {showDropdowns.relatorios && (
                        <div className="absolute bg-white text-black mt-2 rounded shadow-lg p-2 z-10 whitespace-nowrap">
                            <div className="font-semibold">Clientes</div>
                            <Link href="/clientes-em-dia" className="block p-1 hover:bg-gray-200">Clientes em Dia</Link>
                            <Link href="/clientes-inadimplentes" className="block p-1 hover:bg-gray-200">Clientes Inadimplentes</Link>

                            <div className="font-semibold mt-2">Renegociações</div>
                            <Link href="/renegociacoes-concluidas" className="block p-1 hover:bg-gray-200">Concluídas</Link>
                            <Link href="/renegociacoes-pendentes" className="block p-1 hover:bg-gray-200">Pendentes</Link>
                            <Link href="/renegociacoes-vencidas" className="block p-1 hover:bg-gray-200">Vencidas</Link>

                            <div className="font-semibold mt-2">Financeiro</div>
                            <Link href="/pagamentos-concluidos" className="block p-1 hover:bg-gray-200">Pagamentos Concluídos</Link>
                            <Link href="/pagamentos-recebidos" className="block p-1 hover:bg-gray-200">Recebidos</Link>
                            <Link href="/pagamentos-por-periodo" className="block p-1 hover:bg-gray-200">Por Período</Link>
                        </div>
                    )}
                </div>

                {/* Módulo Chat */}
                <div className="relative">
                    <button onClick={() => toggleDropdown('chat')} className="flex items-center">
                        <FcSms /> Chat <FaCaretDown className="ml-1" />
                    </button>
                    {showDropdowns.chat && (
                        <div className="absolute bg-white text-black mt-2 rounded shadow-lg p-2 z-10 whitespace-nowrap">
                            <Link href="/atendimentos" className="block p-1 hover:bg-gray-200">Atendimentos</Link>
                            <Link href="/configuracoes-chat" className="block p-1 hover:bg-gray-200">Configurações do Chat</Link>
                            <Link href="/mensagens-automaticas" className="block p-1 hover:bg-gray-200">Mensagens Automáticas</Link>
                        </div>
                    )}
                </div>
            </div>

            <div className='flex flex-col items-end'>
                <div className='flex items-center relative'>
                    <div className='relative mr-4'>
                        <button onClick={toggleNotifications} className='relative'>
                            <Badge content={notifications.length} color='danger' size='sm'>
                                <FaBell className='text-xl' />
                            </Badge>
                        </button>
                        {showNotifications && (
                            <div className="absolute right-0 bg-white text-black mt-2 rounded-lg shadow-lg p-4 z-50 w-72">
                                <h3 className="font-semibold">Notificações</h3>
                                <div className="max-h-60 overflow-y-auto">
                                    {notifications.length > 0 ? (
                                        notifications.map((notification, index) => (
                                            <div
                                                key={index}
                                                className={`block p-1 hover:bg-gray-200 ${notification.read ? 'text-gray-500' : 'font-bold'}`}
                                                onClick={() => markAsRead(index)}
                                            >
                                                {notification.message} <span className="text-sm text-gray-400">({notification.time})</span>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="p-1">Sem notificações</div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="relative">
                        <button onClick={() => toggleDropdown('user')} className="flex items-center">
                            <FaUserCircle className="text-xl mr-1" />
                            {user?.nome} <FaCaretDown className="ml-1" />
                        </button>
                        {showDropdowns.user && (
                            <div className="absolute right-0 bg-white text-black mt-2 rounded shadow-lg p-2 z-10 whitespace-nowrap">
                                <button onClick={() => mutation.mutate()} className="block w-full text-left p-1 hover:bg-gray-200">Sair</button>
                                <button className="block w-full text-left p-1 hover:bg-gray-200"><Link href='/settings'>Configurações</Link></button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
