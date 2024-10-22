"use client"; // Se você estiver usando Next.js 13 com o modo de aplicativo

import { useEffect, useState, useContext } from 'react';
import { makeRequest } from '../../../../axios';
import DynamicTable from '@/components/DynamicTable.tsx';
import DynamicModal from '@/components/DynamicModal';
import Modal from '@/components/Modal';
import { UserContext } from '@/context/UserContext';

interface User {
    id: number;
    usuario: string;
    email: string;
    permissao: string;
    status: string;
    senha: string
}

export default function Usuarios() {
    const [usuarios, setUsuarios] = useState<User[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalFields, setModalFields] = useState<any[]>([]); // Novo estado para os campos do modal
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [showDialog, setShowDialog] = useState(false);
    const [dialogMessage, setDialogMessage] = useState('');
    const [dialogType, setDialogType] = useState<'success' | 'error' | 'warning' | 'info'>('info');
    const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState<User | null>(null);
    const { user } = useContext(UserContext);

    // Função para listar usuários
    const fetchUsers = async () => {
        try {
            const response = await makeRequest.post('/users/list', { id_empresa: user?.id_empresa });
            setUsuarios(response.data);
        } catch (error) {
            console.error("Erro ao buscar usuários:", error);
        }
    };



    //--- Função para deletar usuário
    const handleDeleteUser = async (id_usuario: number) => {
        try {
            await makeRequest.delete('/users/delete', { data: { id_usuario } });
            fetchUsers(); // Recarrega a lista de usuários após a exclusão
            setShowDialog(true);
            setDialogMessage("Usuário excluído com sucesso.");
            setDialogType("success");
        } catch (error) {
            console.error("Erro ao excluir usuário:", error);
            setShowDialog(true);
            setDialogMessage("Erro ao excluir usuário.");
            setDialogType("error");
        }
    };


    //--- Função para adicionar usuário
    const handleSubmitNew = async (data: any) => {
        setSelectedUser(null)
        console.log(data)
        try {
            const userData = {
                id_empresa: selectedUser ? undefined : user?.id_empresa,
                senha: data['Senha'],
                id_usuario: selectedUser ? selectedUser.id : undefined, // Inclui o id_usuario apenas se estamos editando
                nome: data['Nome do Usuário'],
                email: data['Email'],
                permissao: data['Permissão'] === '0' ? 'geral' : data['Permissão'] === '1' ? 'usuario' : 'administrador',
                status: data['Status'] === '0' ? 'ativo' : 'inativo',
            };
            if (selectedUser) {
                // Edita o usuário existente
                await makeRequest.patch('/users/update', userData);
                setDialogMessage("Usuário editado com sucesso.");
            } else {
                // Adiciona um novo usuário
                await makeRequest.post('/users/create', userData);
                setDialogMessage("Usuário adicionado com sucesso.");
            }
            fetchUsers();
            setIsModalOpen(false);
            setShowDialog(true);
            setDialogType("success");
        } catch (error) {
            console.error("Erro ao salvar usuário:", error);
            setDialogMessage("Erro ao salvar usuário.");
            setDialogType("error");
            setShowDialog(true);
        }
    };



    // Função para abrir modal de confirmação
    const confirmDeleteUser = (user: User) => {
        setUserToDelete(user);
        setIsConfirmDeleteOpen(true);
    };


    // Função para abrir o modal de adicionar usuário
    const handleAddNewUser = () => {
        //--- Limpar o usuário selecionado anteriormente
        setSelectedUser(null);

        //--- Caampos do Modal para cadastro
        setModalFields([
            {
                type: 'text',
                label: 'Nome do Usuário',
                value: '',
                onChange: (value: string) => setModalFields(prev => prev.map(field => field.label === 'Nome do Usuário' ? { ...field, value } : field)),
            },
            {
                type: 'password',
                label: 'Senha',
                value: '',
                onChange: (value: string) => setModalFields(prev => prev.map(field => field.label === 'Senha' ? { ...field, value } : field)),
            },
            {
                type: 'email',
                label: 'Email',
                value: '',
                onChange: (value: string) => setModalFields(prev => prev.map(field => field.label === 'Email' ? { ...field, value } : field)),
            },
            {
                type: 'select',
                label: 'Permissão',
                options: ['geral', 'usuario', 'admistrador'],
                value: '',
                onChange: (value: string) => setModalFields(prev => prev.map(field => field.label === 'Permissão' ? { ...field, value } : field)),
            },
            {
                type: 'select',
                label: 'Status',
                options: ['ativo', 'inativo'],
                value: '',
                onChange: (value: string) => setModalFields(prev => prev.map(field => field.label === 'Status' ? { ...field, value } : field)),
            },
        ]);
        setIsModalOpen(true);
    };




    // Função para abrir o modal de edição
    const handleEditUser = (user: User) => {

        //--- Seta o usuário selecionado na tabela
        setSelectedUser(user);

        //--- Seta os campos que podem ser alterados do usuário
        setModalFields([
            {
                type: 'text',
                label: 'Nome do Usuário',
                value: user.usuario,
                onChange: (value: string) => setModalFields(prev => prev.map(field => field.label === 'Nome do Usuário' ? { ...field, value } : field)),
            },
            {
                type: 'email',
                label: 'Email',
                value: user.email,
                onChange: (value: string) => setModalFields(prev => prev.map(field => field.label === 'Email' ? { ...field, value } : field)),
            },
            {
                type: 'select',
                label: 'Permissão',
                options: ['geral', 'usuario', 'admistrador'],
                value: user.permissao,
                onChange: (value: string) => setModalFields(prev => prev.map(field => field.label === 'Permissão' ? { ...field, value } : field)),
            },
            {
                type: 'select',
                label: 'Status',
                options: ['ativo', 'inativo'],
                value: user.status,
                onChange: (value: string) => setModalFields(prev => prev.map(field => field.label === 'Status' ? { ...field, value } : field)),
            },
        ]);
        setIsModalOpen(true);
    };



    //-- Listar todos os usuários
    useEffect(() => {
        if (user?.id_empresa){
            fetchUsers();
        }
    }, [user?.id_empresa]);




    // Definindo as colunas da tabela
    const columns = [
        { uid: 'id', name: 'ID' },
        { uid: 'usuario', name: 'Usuario' },
        { uid: 'email', name: 'Email' },
        { uid: 'permissao', name: 'Permissão' },
        { uid: 'status', name: 'Status' },
        {
            uid: 'actions',
            name: 'Ações',
            sortable: false
        },
    ];


    // Ajuste os dados para incluir ações
    const tableData = usuarios.map(user => ({
        ...user,
        actions: (
            <div className="flex space-x-2">
                <button
                    onClick={() => handleEditUser(user)}
                    className="text-blue-600 hover:underline"
                >
                    Editar
                </button>
                <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="text-red-600 hover:underline"
                >
                    Excluir
                </button>
            </div>
        ),
    }));


    //--- Renderização da tela
    return (
        <div className="w-[90%] mx-auto bg-gray-100 min-h-screen p-6 rounded-lg shadow-md mt-14">
            <h1 className="text-2xl font-bold mb-6">Usuários</h1>
            <DynamicTable
                columns={columns}
                data={tableData}
                onAddNew={handleAddNewUser}
                statusColorMap={{
                    ativo: 'success',
                    inativo: 'danger',
                    pendente: 'warning',
                }}
                initialVisibleColumns={['id_usuario', 'usuario', 'status', 'actions']}
                rowsPerPageOptions={[5, 10, 15]}
                actionItems={(item) => [
                    {
                        label: "Editar",
                        onClick: () => handleEditUser(item),
                    },
                    {
                        label: "Excluir",
                        onClick: () => confirmDeleteUser(item),
                    },
                ]}
            />

            {/* MODAL DO FORMULÁRIO */}
            {isModalOpen && (
                <DynamicModal
                    isOpen={isModalOpen}
                    onOpenChange={setIsModalOpen}
                    title={selectedUser ? "Editar Usuário" : "Adicionar Novo Usuário"}
                    fields={modalFields.map(field => ({ // Mapeie para garantir que é uma estrutura limpa
                        ...field,
                        value: field.value || '', // Garante que o valor é uma string vazia se não houver valor
                    }))}
                    onSubmit={() => {
                        // Garante que estamos enviando apenas os valores simples
                        const formData = modalFields.reduce((acc, field) => {
                            acc[field.label] = field.value;
                            return acc;
                        }, {});
                        handleSubmitNew(formData);
                    }}
                    size='lg'
                />
            )}


            {/* Modal de Confirmação */}
            {isConfirmDeleteOpen && userToDelete && (
                <Modal
                    showDialog={isConfirmDeleteOpen}
                    setShowDialog={setIsConfirmDeleteOpen}
                    titleDialog="Confirmação de Exclusão"
                    messageDialog={`Você tem certeza que deseja excluir o usuário ${userToDelete.usuario}?`}
                    type="warning"
                    onConfirm={() => {
                        const id_usuario = userToDelete.id;
                        handleDeleteUser(id_usuario);
                        setIsConfirmDeleteOpen(false); // Fechar o modal após a confirmação
                    }}
                    typeDlg='question'
                />
            )}

            {/* Modal de Mensagem */}
            {showDialog && (
                <Modal
                    showDialog={showDialog}
                    setShowDialog={setShowDialog}
                    titleDialog={`${dialogType === 'error' ? "Houve um erro" : "Atenção"}`}
                    messageDialog={dialogMessage}
                    type={dialogType}
                    typeDlg='message'
                />
            )}
        </div>
    );
}
