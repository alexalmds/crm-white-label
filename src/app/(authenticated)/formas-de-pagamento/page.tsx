'use client'
import { useEffect, useState, useContext } from 'react';
import { makeRequest } from '../../../../axios';
import DynamicTable from '@/components/DynamicTable.tsx';
import DynamicModal from '@/components/DynamicModal';
import Modal from '@/components/Modal';
import { UserContext } from '@/context/UserContext';

interface FormaDePgto {
    id: number;
    descricao: string;
    tipo: string;
    status: string;
    data_criacao: string;
}

export default function FormasDePagamentos() {
    const [formaPgtos, setFormaPgtos] = useState<FormaDePgto[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalFields, setModalFields] = useState<any[]>([]); // Novo estado para os campos do modal
    const [selectFormaPgto, setSelectedFormaPgto] = useState<FormaDePgto | null>(null);
    const [showDialog, setShowDialog] = useState(false);
    const [dialogMessage, setDialogMessage] = useState('');
    const [dialogType, setDialogType] = useState<'success' | 'error' | 'warning' | 'info'>('info');
    const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
    const [formaPgoToDelete, setFormPgtoToDelete] = useState<FormaDePgto | null>(null);
    const { user } = useContext(UserContext);

    // Função para listar formas de pagamentos
    const fetchFrmPayments = async () => {
        try {
            const response = await makeRequest.post('/payment-methods/list', { id_empresa: user?.id_empresa });
            setFormaPgtos(response.data);
        } catch (error) {
            setShowDialog(true);
            setDialogMessage("Houve um erro iniciar listagem. " + error);
            setDialogType("error");
        }
    };

    //--- Função para deletar usuário
    const handleDeletePaymentMethod = async (id_forma_pagamento: number) => {
        try {
            await makeRequest.delete('/payment-methods/delete', { data: { id_forma_pagamento } });
            fetchFrmPayments(); // Recarrega a lista de usuários após a exclusão
            setShowDialog(true);
            setDialogMessage("Forma de Pagamento excluído com sucesso.");
            setDialogType("success");
        } catch (error) {
            console.error("Erro ao excluir Forma de Pagamento:", error);
            setShowDialog(true);
            setDialogMessage("Erro ao excluir Forma de pagamento. " + error);
            setDialogType("error");
        }
    };


    //--- Função para adicionar usuário
    const handleSubmitNew = async (data: any) => {
        setSelectedFormaPgto(null)
        console.log(data)
        try {
            const formData = {
                id_empresa: selectFormaPgto ? undefined : user?.id_empresa,
                id_forma_pagamento: selectFormaPgto ? selectFormaPgto.id : undefined, 
                descricao: data['Descrição'],
                tipo: data['Tipo'] === '0' ? 'boleto' : data['Tipo'] === '1' ? 'cartao_credito' : data['Tipo'] === '2' ? 'pix' :  data['Tipo'] === '3' ? 'cartao_debito' : 'ted',
                status: data['Status'] === '0' ? 'ativo' : 'inativo',
            };
            if (selectFormaPgto) {
                // Edita o usuário existente
                await makeRequest.patch('/payment-methods/update', formData);
                setDialogMessage("Forma de Pagamento editada com sucesso.");
            } else {
                // Adiciona um novo usuário
                await makeRequest.post('/payment-methods/create', formData);
                setDialogMessage("Forma de Pagamento cadastrada com sucesso.");
            }
            fetchFrmPayments()
            setIsModalOpen(false);
            setShowDialog(true);
            setDialogType("success");
        } catch (error) {
            console.error("Erro ao salvar Forma de Pagamento: ", error);
            setDialogMessage("Erro ao salvar Forma de Pagamento. " + error);
            setDialogType("error");
            setShowDialog(true);
        }
    };



    // Função para abrir modal de confirmação
    const confirmDelete = (paymentMethod: FormaDePgto) => {
        setFormPgtoToDelete(paymentMethod);
        setIsConfirmDeleteOpen(true);
    };


    // Função para abrir o modal de adicionar usuário
    const handleAddNew = () => {
        //--- Limpar o usuário selecionado anteriormente
        setSelectedFormaPgto(null);

        //--- Caampos do Modal para cadastro
        setModalFields([
            {
                type: 'text',
                label: 'Descrição',
                value: '',
                onChange: (value: string) => setModalFields(prev => prev.map(field => field.label === 'Descrição' ? { ...field, value } : field)),
            },
            {
                type: 'select',
                label: 'Tipo',
                options: ['boleto', 'cartao_credito', 'pix', 'cartao_debito', 'ted'],
                value: '',
                onChange: (value: string) => setModalFields(prev => prev.map(field => field.label === 'Tipo' ? { ...field, value } : field)),
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
    const handleEdit = (paymentMethod: FormaDePgto) => {

        //--- Seta o usuário selecionado na tabela
        setSelectedFormaPgto(paymentMethod);

        //--- Seta os campos que podem ser alterados do usuário
        setModalFields([
            {
                type: 'text',
                label: 'Descrição',
                value: paymentMethod.descricao,
                onChange: (value: string) => setModalFields(prev => prev.map(field => field.label === 'Descrição' ? { ...field, value } : field)),
            },
            {
                type: 'select',
                label: 'Tipo',
                options: ['boleto', 'cartao_credito', 'pix', 'cartao_debito', 'ted'],
                value: paymentMethod.tipo,
                onChange: (value: string) => setModalFields(prev => prev.map(field => field.label === 'Tipo' ? { ...field, value } : field)),
            },
            {
                type: 'select',
                label: 'Status',
                options: ['ativo', 'inativo'],
                value: paymentMethod.status,
                onChange: (value: string) => setModalFields(prev => prev.map(field => field.label === 'Status' ? { ...field, value } : field)),
            },
        ]);
        setIsModalOpen(true);
    };



    //-- Listar todas as Formas de Pagamentos
    useEffect(() => {
        if (user?.id_empresa){
            fetchFrmPayments()
        }
    }, [user?.id_empresa]);




    // Definindo as colunas da tabela
    const columns = [
        { uid: 'id', name: 'ID' },
        { uid: 'descricao', name: 'Descrição' },
        { uid: 'tipo', name: 'Tipo' },
        { uid: 'status', name: 'Status' },
        {
            uid: 'actions',
            name: 'Ações',
            sortable: false
        },
    ];


    // Ajuste os dados para incluir ações
    const tableData = formaPgtos.map(frmPayment => ({
        ...frmPayment,
        actions: (
            <div className="flex space-x-2">
                <button
                    onClick={() => handleEdit(frmPayment)}
                    className="text-blue-600 hover:underline"
                >
                    Editar
                </button>
                <button
                    onClick={() => handleDeletePaymentMethod(frmPayment.id)}
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
            <h1 className="text-2xl font-bold mb-6">Formas de Pagamento</h1>
            <DynamicTable
                columns={columns}
                data={tableData}
                onAddNew={handleAddNew}
                statusColorMap={{
                    ativo: 'success',
                    inativo: 'danger',
                    pendente: 'warning',
                }}
                initialVisibleColumns={['id_forma_pagamento', 'descricao', 'tipo', 'status', 'actions']}
                rowsPerPageOptions={[5, 10, 15]}
                actionItems={(item) => [
                    {
                        label: "Editar",
                        onClick: () => handleEdit(item),
                    },
                    {
                        label: "Excluir",
                        onClick: () => confirmDelete(item),
                    },
                ]}
            />

            {/* MODAL DO FORMULÁRIO */}
            {isModalOpen && (
                <DynamicModal
                    isOpen={isModalOpen}
                    onOpenChange={setIsModalOpen}
                    title={selectFormaPgto ? "Editar Forma de Pagamento" : "Adicionar Nova Forma de Pagamento"}
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
                    size='md'
                />
            )}


            {/* Modal de Confirmação */}
            {isConfirmDeleteOpen && formaPgoToDelete && (
                <Modal
                    showDialog={isConfirmDeleteOpen}
                    setShowDialog={setIsConfirmDeleteOpen}
                    titleDialog="Confirmação de Exclusão"
                    messageDialog={`Você tem certeza que deseja excluir a Forma de Pagamento ${formaPgoToDelete.descricao}?`}
                    type="warning"
                    onConfirm={() => {
                        const id_forma_pagamento = formaPgoToDelete.id;
                        handleDeletePaymentMethod(id_forma_pagamento);
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
                    titleDialog={`${dialogType === 'error' ? "Houve um erro" : "Notificação"}`}
                    messageDialog={dialogMessage}
                    type={dialogType}
                    typeDlg='message'
                />
            )}
        </div>
    );
}
