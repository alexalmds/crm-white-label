'use client';

import { useState, useContext, useEffect } from 'react';
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import DynamicModal from '@/components/DynamicModal';
import DynamicTable from '@/components/DynamicTable.tsx';
import { IClient } from '@/interfaces';
import { makeRequest } from '../../../../../axios';
import Modal from '@/components/Modal';
import { UserContext } from '@/context/UserContext';
import { FcInternal } from 'react-icons/fc';

const CadastroCliente = () => {
  const [clients, setClients] = useState<IClient[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalFields, setModalFields] = useState<any[]>([]);
  const [selectedClient, setSelectedClient] = useState<IClient | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [dialogType, setDialogType] = useState<'success' | 'error' | 'warning' | 'info'>('info');
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [clienteToDelete, setClienteToDelete] = useState<IClient | null>(null);
  const { user } = useContext(UserContext)


  const status = [{label: "Ativo", value: 'ativo'}, {label: 'Inativo', value: 'inativo'}]


  const fetchClientes = async () => {
    try {
      const response = await makeRequest.post('/clientes/restore', { id_empresa: user?.id_empresa });
      setClients(response.data);
    } catch (error) {
      setShowDialog(true);
      setDialogMessage("Houve um erro iniciar listagem. " + error);
      setDialogType("error");
    }
  }

  useEffect(() => {
    if (user?.id_empresa) {
      fetchClientes();
    }
  }, [user?.id_empresa])

  //--- Função para deletar cliente
  const handleDelete = async (id_cliente: number) => {
    try {
      await makeRequest.delete('/clientes/delete', { data: { id_cliente } });
      fetchClientes(); // Recarrega a lista de usuários após a exclusão
      setShowDialog(true);
      setDialogMessage("Cliente excluído com sucesso.");
      setDialogType("success");
    } catch (error) {
      console.error("Erro ao excluir Cliente:", error);
      setShowDialog(true);
      setDialogMessage("Erro ao excluir Cliente. " + error);
      setDialogType("error");
    }
  };

  const handleSubmitNew = async (data: any) => {
    setSelectedClient(null)
    console.log(data)
    try {
      const formData = {
        id_empresa: selectedClient ? undefined : user?.id_empresa,
        id_cliente: selectedClient ? selectedClient.id : undefined,
        nome_cliente: data['Nome do Cliente'],
        cpf_cnpj: data['CPF / CNPJ'],
        email_cliente: data['Email'],
        telefone_cliente: data['Telefone'],
        endereco_cliente: data['Endereço'],
        cep: data['CEP'],
        pais: data['País'],
        estado: data['Estado'],
        cidade: data['Cidade'],
        whatsapp: data['WhatsApp'],
        status: data['Status'],
      };
      if (selectedClient) {
        // Edita o cliente existente
        await makeRequest.patch('/clientes/update', formData);
        setDialogMessage("Cliente atualizado com sucesso.");
      } else {
        // Adiciona um novo usuário
        await makeRequest.post('/clientes/create', formData);
        setDialogMessage("Cliente cadastrada com sucesso.");
      }
      fetchClientes()
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

  const handleImport = async (source: string) => {
    if (source === 'asaas') {
      // const response = await axios.get('/api/import/asaas');
      setShowDialog(true);
      setDialogMessage("Para importar clientes do ASAAS, selecione o modo 'Production' nas configurações > Integrações > ASAAS.");
      setDialogType("info");
      // console.log(response.data);
    } else if (source === 'xlsx') {
      // Lógica de importação XLSX
      setShowDialog(true);
      setDialogMessage("Recurso disponível na próxima atualização");
      setDialogType("info");
    }
  };

  // Função para abrir modal de confirmação
  const confirmDelete = (cliente: IClient) => {
    setClienteToDelete(cliente);
    setIsConfirmDeleteOpen(true);
  };


  const handleAddNewClient = () => {

    setSelectedClient(null)
    setModalFields([
      { type: 'text', label: 'Nome do Cliente', value: '', onChange: (value: string) => setModalFields(prev => prev.map(field => field.label === 'Nome do Cliente' ? { ...field, value } : field)), },
      { type: 'text', label: 'CPF / CNPJ', value: '', onChange: (value: string) => setModalFields(prev => prev.map(field => field.label === 'CPF / CNPJ' ? { ...field, value } : field)), },
      { type: 'email', label: 'Email', value: '', onChange: (value: string) => setModalFields(prev => prev.map(field => field.label === 'Email' ? { ...field, value } : field)), },
      { type: 'text', label: 'Telefone', value: '', onChange: (value: string) => setModalFields(prev => prev.map(field => field.label === 'Telefone' ? { ...field, value } : field)), },
      { type: 'text', label: 'WhatsApp', value: '', onChange: (value: string) => setModalFields(prev => prev.map(field => field.label === 'WhatsApp' ? { ...field, value } : field)), },
      { type: 'text', label: 'CEP', value: '', onChange: (value: string) => setModalFields(prev => prev.map(field => field.label === 'CEP' ? { ...field, value } : field)), },
      { type: 'text', label: 'País', value: '', onChange: (value: string) => setModalFields(prev => prev.map(field => field.label === 'País' ? { ...field, value } : field)), },
      { type: 'text', label: 'Estado', value: '', onChange: (value: string) => setModalFields(prev => prev.map(field => field.label === 'Estado' ? { ...field, value } : field)), },
      { type: 'text', label: 'Cidade', value: '', onChange: (value: string) => setModalFields(prev => prev.map(field => field.label === 'Cidade' ? { ...field, value } : field)), },
      { type: 'text', label: 'Endereço', value: '', onChange: (value: string) => setModalFields(prev => prev.map(field => field.label === 'Endereço' ? { ...field, value } : field)), },
      { type: 'select', label: 'Status', value: '', options: status, onChange: (value: string) => setModalFields(prev => prev.map(field => field.label === 'Status' ? { ...field, value } : field)), },
    ]);

    setIsModalOpen(true)
  }

  const handleEdit = (cliente: IClient) => {

    setSelectedClient(cliente)
    setModalFields([
      { type: 'text', label: 'Nome do Cliente', value: cliente.nome_cliente, onChange: (value: string) => setModalFields(prev => prev.map(field => field.label === 'Nome do Cliente' ? { ...field, value } : field)), },
      { type: 'text', label: 'CPF / CNPJ', value: cliente.cpf_cnpj, onChange: (value: string) => setModalFields(prev => prev.map(field => field.label === 'CPF / CNPJ' ? { ...field, value } : field)), },
      { type: 'email', label: 'Email', value: cliente.email_cliente, onChange: (value: string) => setModalFields(prev => prev.map(field => field.label === 'Email' ? { ...field, value } : field)), },
      { type: 'text', label: 'Telefone', value: cliente.telefone_cliente, onChange: (value: string) => setModalFields(prev => prev.map(field => field.label === 'Telefone' ? { ...field, value } : field)), },
      { type: 'text', label: 'WhatsApp', value: cliente.whatsapp, onChange: (value: string) => setModalFields(prev => prev.map(field => field.label === 'WhatsApp' ? { ...field, value } : field)), },
      { type: 'text', label: 'CEP', value: cliente.cep, onChange: (value: string) => setModalFields(prev => prev.map(field => field.label === 'CEP' ? { ...field, value } : field)), },
      { type: 'text', label: 'País', value: cliente.pais, onChange: (value: string) => setModalFields(prev => prev.map(field => field.label === 'País' ? { ...field, value } : field)), },
      { type: 'text', label: 'Estado', value: cliente.estado, onChange: (value: string) => setModalFields(prev => prev.map(field => field.label === 'Estado' ? { ...field, value } : field)), },
      { type: 'text', label: 'Cidade', value: cliente.cidade, onChange: (value: string) => setModalFields(prev => prev.map(field => field.label === 'Cidade' ? { ...field, value } : field)), },
      { type: 'text', label: 'Endereço', value: cliente.endereco_cliente, onChange: (value: string) => setModalFields(prev => prev.map(field => field.label === 'Endereço' ? { ...field, value } : field)), },
      { type: 'select', label: 'Status', options: status, value: cliente.status, onChange: (value: string) => setModalFields(prev => prev.map(field => field.label === 'Status' ? { ...field, value } : field)), },
    ]);

    setIsModalOpen(true)
  }

  // Definindo as colunas da tabela
  const columns = [
    { uid: 'id', name: 'ID' },
    { uid: 'nome_cliente', name: 'Nome' },
    {uid: 'cpf_cnpj', name: 'CPF / CNPJ'},
    { uid: 'email_cliente', name: 'Email' },
    { uid: 'telefone_cliente', name: 'Telefone' },
    { uid: 'whatsapp', name: 'WhatsApp' },
    { uid: 'endereco_cliente', name: 'Endereço' },
    { uid: 'pais', name: 'País' },
    { uid: 'cidade', name: 'Cidade' },
    { uid: 'estado', name: 'Estado' },
    { uid: 'cep', name: 'CEP' },
    { uid: 'status', name: 'Status' },
    {
      uid: 'actions',
      name: 'Ações',
      sortable: false
    },
  ];


  // Ajuste os dados para incluir ações
  const tableData = clients.map(client => ({
    ...client,
    actions: (
      <div className="flex space-x-2">
        <button
          onClick={() => handleEdit(client)}
          className="text-blue-600 hover:underline"
        >
          Editar
        </button>
        <button
          onClick={() => handleDelete(client.id)}
          className="text-red-600 hover:underline"
        >
          Excluir
        </button>
      </div>
    ),
  }));


  return (
    <div className='w-[90%] mx-auto bg-gray-100 min-h-screen p-6 rounded-lg shadow-md mt-14'>
      <div className='flex justify-between'>
        <h1 className="text-2xl font-bold mb-4">Cadastro de Cliente</h1>
        <Dropdown backdrop='blur'>
          <DropdownTrigger>
            <Button
              variant="shadow"
              color='warning'
              className='text-white'
            >
              <FcInternal />Importar Cliente
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem key="asaas" onPress={() => handleImport('asaas')}>Importar via Integração Asaas</DropdownItem>
            <DropdownItem key="xlsx" onPress={() => handleImport('xlsx')}>Importar via planilha</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>

      <div className='flex justify-between right-0 mb-4'>

      </div>
      <DynamicTable
        columns={columns}
        data={tableData}
        onAddNew={handleAddNewClient}
        statusColorMap={{
          ativo: 'success',
          inativo: 'danger',
          pendente: 'warning',
        }}
        initialVisibleColumns={['id', 'nome_cliente', 'cpf_cnpj', 'telefone_cliente', 'email_cliente', 'status', 'actions']}
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

      <DynamicModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        title="Cadastro de Cliente"
        fields={modalFields}
        onSubmit={() => {
          // Garante que estamos enviando apenas os valores simples
          const formData = modalFields.reduce((acc, field) => {
            acc[field.label] = field.value;
            return acc;
          }, {});
          handleSubmitNew(formData);
        }}
        size='3xl'
      />

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


      {/* Modal de Confirmação */}
      {isConfirmDeleteOpen && clienteToDelete && (
                <Modal
                    showDialog={isConfirmDeleteOpen}
                    setShowDialog={setIsConfirmDeleteOpen}
                    titleDialog="Confirmação de Exclusão"
                    messageDialog={`Você tem certeza que deseja excluir o cliente ${clienteToDelete.nome_cliente}?`}
                    type="warning"
                    onConfirm={() => {
                        const id = clienteToDelete.id;
                        handleDelete(id);
                        setIsConfirmDeleteOpen(false); // Fechar o modal após a confirmação
                    }}
                    typeDlg='question'
                />
            )}

    </div>
  );
};

export default CadastroCliente;
