'use client';
import { useEffect, useState, useContext } from 'react';
import DynamicTable from '@/components/DynamicTable.tsx';
import { makeRequest } from '../../../../../../axios';
import { UserContext } from '@/context/UserContext';
import Modal from '@/components/Modal';
import { ICobrancas } from '@/interfaces';
import BillingModal from '@/components/BillingModal';
import { IBillingData } from '@/interfaces';
import DynamicModal from '@/components/DynamicModal';
import { CalendarDate, parseDate } from "@internationalized/date";
import { CompanyContext } from '@/context/CompanyContext';

interface AutoComplete {
    label: string,
    value: string,
    description: string
}



export default function Cobrancas() {
    const [cobrancas, setCobrancas] = useState<ICobrancas[]>([]);
    const [clientes, setClientes] = useState<AutoComplete[]>([]);
    const [formaPagamento, setFormaPagamentos] = useState<AutoComplete[]>([]);
    const { user } = useContext(UserContext);
    const { company } = useContext(CompanyContext);
    const [showDialog, setShowDialog] = useState(false);
    const [dialogMessage, setDialogMessage] = useState('');
    const [dialogType, setDialogType] = useState<'success' | 'error' | 'warning' | 'info'>('info');
    const [isModalOpenBilling, setModalOpenBilling] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedBillingData, setSelectedBillingData] = useState<IBillingData | null>(null);
    const [modalFields, setModalFields] = useState<any[]>([]);
    const sendNotification = [{ label: 'Sim', value: true }, { label: 'Não', value: false }]
    const multasEjuros = [{ label: 'FIXO', value: 'FIXED' }, { label: 'PORCENTAGEM', value: 'PERCENTAGE' }]
    const [cobrancaToDelete, setCobrancaToDelete] = useState<IBillingData | null>(null)
    const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);

    const parcelas = [
        {label: 'À Vista (1x)', value: 1, description: "No Available"},
        {label: 'Duas Parcelas (2x)', value: 2, description: "No Available"},
        {label: 'Três Parcelas (3x)', value: 3, description: "No Available"},
        {label: 'Quatro Parcelas (4x)', value: 4, description: "No Available"},
        {label: 'Cinco Parcelas (5x)', value: 5, description: "No Available"},
        {label: 'Seis Parcelas (6x)', value: 6, description: "No Available"},
        {label: 'Sete Parcelas (7x)', value: 7, description: "No Available"},
        {label: 'Oito Parcelas (8x)', value: 8, description: "No Available"},
        {label: 'Nove Parcelas (9x)', value: 9, description: "No Available"},
        {label: 'Dez Parcelas (10x)', value: 10, description: "No Available"},
        {label: 'Onze Parcelas (11x)', value: 11, description: "No Available"},
        {label: 'Doze Parcelas (12x)', value: 12, description: "No Available"},
    ]

    const fetchBoletosPendentes = async () => {
        try {
            const response = await makeRequest.post('/cobrancas/read', { id_empresa: user?.id_empresa });
            setCobrancas(response.data);
        } catch (error) {
            setShowDialog(true);
            setDialogMessage("Erro ao buscar boletos pendentes: " + error);
            setDialogType("error");
        }
    };

    const fetchClientes = async () => {
        try {
            const response = await makeRequest.post('/clientes/customer', { id_empresa: user?.id_empresa });
            setClientes(response.data);
        } catch (error) {
            setShowDialog(true);
            setDialogMessage("Erro ao buscar clientes: " + error);
            setDialogType("error");
        }
    };

    useEffect(() => {
        console.log(clientes)
    }, [clientes])

    const fetchPaymentsMethods = async () => {
        try {
            await makeRequest.post('/payment-methods/list-payments-methods', { id_empresa: user?.id_empresa }).then((resp) => {
                setFormaPagamentos(resp.data);
            }).catch((exception) => {
                setShowDialog(true);
                setDialogMessage(exception.response.data.message);
                setDialogType("error");
            })
        } catch (error) {
            setShowDialog(true);
            setDialogMessage("Erro ao buscar clientes: " + error);
            setDialogType("error");
        }
    };

    useEffect(() => {
        if (user?.id_empresa) {
            fetchBoletosPendentes();
            fetchClientes();
            fetchPaymentsMethods();
        }
    }, [user?.id_empresa]);

    // Funções de ações dos boletos
    const handleBaixar = async (data: any) => {
        const formatDateToYYYYMMDD = (inputDate: any) => {
            const [day, month, year] = inputDate.split("/");
            return `${year}-${month}-${day}`;
        };
        try {
            const formData = {
                id_empresa: user?.id_empresa,
                id: selectedBillingData ? selectedBillingData.id : undefined,
                usuario: user?.id_usuario,
                environment: company?.asaas_mode,
                asaasApiKey: company?.asaas_api_key,
                value: data['Valor Recebido'],
                date: data['Data Recebimento'],
                notify: data['Enviar Notificação?'],
                email: selectedBillingData?.email_cliente,
                number: selectedBillingData?.whatsapp,
                issueDate: formatDateToYYYYMMDD(selectedBillingData?.data_emissao),
                dueDate: formatDateToYYYYMMDD(selectedBillingData?.data_vencimento),
                amount_invoice: selectedBillingData?.valor,
                id_asaas_invoice: selectedBillingData?.id_boleto
            };
            await makeRequest.post("/cobrancas/baixa", formData).then((resp) => {
                fetchBoletosPendentes();
                setDialogMessage(resp.data.message);
                setDialogType("success");
                setShowDialog(true);
            })
                .catch((exception) => {
                    setDialogMessage(exception.response.data.message);
                    setDialogType("error");
                    setShowDialog(true);
                })
        } catch (error) {
            console.error("Erro dar baixa", error);
            setDialogMessage("Erro ao dar baixa na cobrança. " + error);
            setDialogType("error");
            setShowDialog(true);
        }
    };


    const handleSubmitNew = async (data: any) => {
        const formatDateToYYYYMMDD = (inputDate: any) => {
            const [day, month, year] = inputDate.split("/");
            return `${year}-${month}-${day}`;
        };
        try {
            const formData = {
                id_empresa: user?.id_empresa,
                usuario: user?.id_usuario,
                environment: company?.asaas_mode,
                asaasApiKey: company?.asaas_api_key,
                id_cliente: data['Cliente'],
                payment_method: data['Forma de Pagamento'],
                installment: data['Parcelas'],
                value: data['Valor'],
                notify: data['Enviar Notificação?'] === 'true' ? true : false,
                dueDate: data['Data Vencimento'],
                type_multa: data['Tipo de Multa'],
                valor_multa: data['Multa ou Porcentagem (%)'],
                type_juros: data['Tipo de Juros'],
                valor_juros: data['Juros ou Porcentagem (% a.m)'],
                descricao: data['Descrição']
            };
            await makeRequest.post("/cobrancas/lancar", formData).then((resp) => {
                fetchBoletosPendentes();
                setDialogMessage(resp.data.message);
                setDialogType("success");
                setShowDialog(true);
            })
                .catch((exception) => {
                    setDialogMessage(exception.response.data.message);
                    setDialogType("error");
                    setShowDialog(true);
                })
        } catch (error) {
            console.error("Erro dar baixa", error);
            setDialogMessage("Erro ao dar baixa na cobrança. " + error);
            setDialogType("error");
            setShowDialog(true);
        }
    };


    const handleEstornar = () => {
        console.log("Estornar boleto:");
        // Implementação da ação de estorno
    };

    const handleGerarSegundaVia = (cobrancaId: number) => {
        console.log("Gerar segunda via para boleto:", cobrancaId);
        // Implementação da ação de geração de segunda via
    };

    const handleViewInvoice = (invoice: IBillingData) => {
        console.log(clientes, formaPagamento)
        setSelectedBillingData(invoice); // Define a cobrança selecionada
        setModalOpenBilling(true); // Abre o modal
    }

    const handleCancelarCobranca = (cobrancaId: number) => {
        console.log("Cancelar cobrança para boleto:", cobrancaId);
        // Implementação da ação de cancelamento
    };

    const handleLancamento = () => {
        console.log("Cancelar cobrança para boleto:");
        // Implementação da ação de cancelamento
    };

    const confirmDelete = () => {
        setCobrancaToDelete(selectedBillingData);
        console.log(selectedBillingData?.id)
        setIsConfirmDeleteOpen(true);
    };

    // Preparar dados para a tabela incluindo as ações
    const tableData = cobrancas.map((value: ICobrancas) => ({
        ...value,
        actions: (
            <div className="flex space-x-2">
                <button onClick={() => handleCancelarCobranca(value.id)} className="text-blue-600 hover:underline">Visualizar Cobrança</button>
            </div>
        ),
    }));

    const handleBaixa = () => {
        //--- Caampos do Modal para cadastro
        setModalFields([
            { type: 'text', label: 'Valor Recebido', value: '', onChange: (value: string) => setModalFields(prev => prev.map(field => field.label === 'Valor Recebido' ? { ...field, value } : field)), },
            { type: 'dateInput', label: 'Data Recebimento', value: new CalendarDate(2024, 1, 1), onChange: (value: string) => setModalFields(prev => prev.map(field => field.label === 'Data Recebimento' ? { ...field, value } : field)), },
            { type: 'select', label: 'Enviar Notificação?', options: sendNotification, value: '', onChange: (value: string) => setModalFields(prev => prev.map(field => field.label === 'Enviar Notificação?' ? { ...field, value } : field)), },
        ]);
        setModalOpen(true);
    };

    const handleAddNew = async () => {
        setSelectedBillingData(null)
        setModalFields([
            { type: 'autoComplete', placeholder: 'Selecione o Cliente', label: 'Cliente', value: '', options: clientes, onChange: (value: string) => setModalFields(prev => prev.map(field => field.label === 'Cliente' ? { ...field, value } : field)), },
            { type: 'dateInput', label: 'Data Vencimento', value: new CalendarDate(2024, 10, 30), onChange: (value: string) => setModalFields(prev => prev.map(field => field.label === 'Data Vencimento' ? { ...field, value } : field)), },
            { type: 'autoComplete', placeholder: 'Selecione a Forma de Pagamento', label: 'Forma de Pagamento', value: '', options: formaPagamento, onChange: (value: string) => setModalFields(prev => prev.map(field => field.label === 'Forma de Pagamento' ? { ...field, value } : field)), },
            { type: 'autoComplete', placeholder: 'Selecione a Parcela', label: 'Parcelas', value: '', options: parcelas, onChange: (value: string) => setModalFields(prev => prev.map(field => field.label === 'Parcelas' ? { ...field, value } : field)), },
            { type: 'text', label: 'Descrição', value: '', onChange: (value: string) => setModalFields(prev => prev.map(field => field.label === 'Descrição' ? { ...field, value } : field)), },
            { type: 'text', required: true, label: 'Valor', value: '', onChange: (value: string) => setModalFields(prev => prev.map(field => field.label === 'Valor' ? { ...field, value } : field)), },
            { type: 'select', label: 'Tipo de Multa', options: multasEjuros, value: '', onChange: (value: string) => setModalFields(prev => prev.map(field => field.label === 'Tipo de Multa' ? { ...field, value } : field)), },
            { type: 'text', label: 'Multa ou Porcentagem (%)', value: '', onChange: (value: string) => setModalFields(prev => prev.map(field => field.label === 'Multa ou Porcentagem (%)' ? { ...field, value } : field)), },
            { type: 'select', label: 'Tipo de Juros', options: multasEjuros, value: '', onChange: (value: string) => setModalFields(prev => prev.map(field => field.label === 'Tipo de Juros' ? { ...field, value } : field)), },
            { type: 'text', label: 'Juros ou Porcentagem (% a.m)', value: '', onChange: (value: string) => setModalFields(prev => prev.map(field => field.label === 'Juros ou Porcentagem (% a.m)' ? { ...field, value } : field)), },
            { type: 'select', label: 'Enviar Notificação?', options: sendNotification, value: '', onChange: (value: string) => setModalFields(prev => prev.map(field => field.label === 'Enviar Notificação?' ? { ...field, value } : field)), },

        ]);
        setModalOpen(true);
    };

    // Definindo as colunas da tabela
    const columns = [
        { uid: 'id', name: 'ID' },
        { uid: 'nome_cliente', name: 'Cliente' },
        { uid: 'valor', name: 'Valor' },
        { uid: 'data_emissao', name: 'Dt. Emissão' },
        { uid: 'data_vencimento', name: 'Vencimento' },
        { uid: 'descricao', name: 'Descrição'},
        { uid: 'status', name: 'Status' },
        { uid: 'actions', name: 'Ações', sortable: false },
    ];

    return (
        <div className="w-[90%] mx-auto mt-14 p-6 shadow-md rounded-md bg-white">
            <h1 className="text-2xl font-bold mb-4">Cobranças</h1>
            <DynamicTable
                columns={columns}
                data={tableData}
                onAddNew={handleAddNew}
                rowsPerPageOptions={[5, 10, 15]}
                initialVisibleColumns={['nome_cliente', 'valor', 'data_emissao', 'data_vencimento', 'descricao', 'status', 'actions']}
                actionItems={(item) => [
                    {
                        label: "🔍 Visualizar Cobrança",
                        onClick: () => handleViewInvoice(item),
                    },
                ]}
            />
            {/* Modal de Mensagem */}
            {showDialog && (
                <Modal
                    showDialog={showDialog}
                    setShowDialog={setShowDialog}
                    titleDialog={`${dialogType === 'error' ? "Erro" : "Notificação"}`}
                    messageDialog={dialogMessage}
                    type={dialogType}
                    typeDlg='message'
                />
            )}

            {/* Modal de Visualização da Cobrança */}
            {selectedBillingData && (
                <BillingModal
                    isOpen={isModalOpenBilling}
                    onClose={() => setModalOpenBilling(false)}
                    billingData={selectedBillingData} // Passa os dados da cobrança selecionada
                    onBaixa={handleBaixa}
                    onEstornar={handleEstornar}
                    onExcluir={confirmDelete}
                    onLancamento={handleLancamento}
                />
            )}


            {isModalOpen && (
                <DynamicModal
                    isOpen={isModalOpen}
                    onOpenChange={setModalOpen}
                    title={selectedBillingData ? "Dar baixa em cobrança" : "Adicionar uma nova cobrança"}
                    fields={modalFields.map(field => ({
                        ...field,
                        value: field.value || '',
                    }))}
                    onSubmit={() => {
                        const formData = modalFields.reduce((acc, field) => {
                            // Se for do tipo 'dateInput', converta o CalendarDate para uma string
                            if (field.type === 'dateInput' && field.value instanceof CalendarDate) {
                                acc[field.label] = field.value.toString();  // Converte para string ou use .toDate() para Date
                            } else {
                                acc[field.label] = field.value;
                            }
                            return acc;
                        }, {});
                        if (selectedBillingData){
                            handleBaixar(formData);
                        }
                        else {
                            handleSubmitNew(formData);
                        }
                    }}
                    size='2xl'
                />
            )}
        </div>
    );
}
