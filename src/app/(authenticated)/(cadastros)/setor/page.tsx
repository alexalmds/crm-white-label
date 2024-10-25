'use client'
import { useEffect, useState, useContext } from 'react';
import DynamicTable from '@/components/DynamicTable.tsx';
import { makeRequest } from '../../../../../axios';
import { ISetor } from '@/interfaces';
import { UserContext } from '@/context/UserContext';
import DynamicModal from '@/components/DynamicModal';
import Modal from '@/components/Modal';


export default function Setor() {
  const [setor, setSetor] = useState<ISetor[]>([]);
  const { user } = useContext(UserContext)
  const [showDialog, setShowDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [dialogType, setDialogType] = useState<'success' | 'error' | 'warning' | 'info'>('info');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalFields, setModalFields] = useState<any[]>([]);
  const [setorSelected, setSetorSelected] = useState<ISetor | null>(null)
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [setorToDelete, setSetorToDelete] = useState<ISetor | null>(null);

  const incidencia = [{label: 'Sim', value: '1'}, {label: 'Não', value: '0'}]

  const fetchSetor = async () => {
    try {
      const response = await makeRequest.post('/setores/read', { id_empresa: user?.id_empresa });
      setSetor(response.data);
    } catch (error) {
      setShowDialog(true);
      setDialogMessage("Houve um erro iniciar listagem. " + error);
      setDialogType("error");
    }
  }

  // Buscando modelos de contratos ao carregar a página
  useEffect(() => {
    if (user?.id_empresa) {
      fetchSetor()
    }
  }, [user?.id_empresa]);





  const handleAddNew = () => {
    //--- Limpar o usuário selecionado anteriormente
    setSetorSelected(null);

    //--- Caampos do Modal para cadastro
    setModalFields([
      { type: 'text', label: 'Título', value: '', onChange: (value: string) => setModalFields(prev => prev.map(field => field.label === 'Título' ? { ...field, value } : field)), },
      { type: 'text', label: 'Descrição', value: '', onChange: (value: string) => setModalFields(prev => prev.map(field => field.label === 'Descrição' ? { ...field, value } : field)), },
      { type: 'text', label: 'Observação', value: '', onChange: (value: string) => setModalFields(prev => prev.map(field => field.label === 'Observação' ? { ...field, value } : field)), },
      { type: 'select', label: 'Gera Incidência?', options: incidencia, value: '', onChange: (value: string) => setModalFields(prev => prev.map(field => field.label === 'Gera Incidência?' ? { ...field, value } : field)), },
      { type: 'text', label: 'Taxa', value: '', onChange: (value: string) => setModalFields(prev => prev.map(field => field.label === 'Taxa' ? { ...field, value } : field)), },
      { type: 'text', label: 'Percentual', value: '', onChange: (value: string) => setModalFields(prev => prev.map(field => field.label === 'Percentual' ? { ...field, value } : field)), },
    ]);
    setIsModalOpen(true);
  };

  // Função para abrir o modal de edição
  const handleEdit = (setor: ISetor) => {

    //--- Seta o usuário selecionado na tabela
    setSetorSelected(setor);

    //--- Seta os campos que podem ser alterados do usuário
    setModalFields([
      { type: 'text', label: 'Título', value: setor.titulo, onChange: (value: string) => setModalFields(prev => prev.map(field => field.label === 'Título' ? { ...field, value } : field)), },
      { type: 'text', label: 'Descrição', value: setor.descricao, onChange: (value: string) => setModalFields(prev => prev.map(field => field.label === 'Descrição' ? { ...field, value } : field)), },
      { type: 'text', label: 'Observação', value: setor.observacao, onChange: (value: string) => setModalFields(prev => prev.map(field => field.label === 'Observação' ? { ...field, value } : field)), },
      { type: 'select', label: 'Gera Incidência?', options: ['Sim', 'Não'], value: setor.gera_incidencia, onChange: (value: string) => setModalFields(prev => prev.map(field => field.label === 'Gera Incidência?' ? { ...field, value } : field)), },
      { type: 'text', label: 'Taxa', value: setor.taxa, onChange: (value: string) => setModalFields(prev => prev.map(field => field.label === 'Taxa' ? { ...field, value } : field)), },
      { type: 'text', label: 'Percentual', value: setor.percentual, onChange: (value: string) => setModalFields(prev => prev.map(field => field.label === 'Percentual' ? { ...field, value } : field)), },
    ]);
    setIsModalOpen(true);
  };

  //--- Função para adicionar usuário
  const handleSubmitNew = async (data: any) => {
    setSetorSelected(null)
    try {
      const formData = {
        id_empresa: setorSelected ? undefined : user?.id_empresa,
        id: setorSelected ? setorSelected.id : undefined,
        descricao: data['Descrição'],
        gera_incidencia: data['Gera Incidência?'],
        titulo: data['Título'],
        taxa: data['Taxa'],
        percentual: data['Percentual'],
        observacao: data['Observação'],
      };
      if (setorSelected) {
        await makeRequest.patch('/setores/update', formData);
        setDialogMessage("Setor editado com sucesso.");
      } else {
        await makeRequest.post('/setores/create', formData);
        setDialogMessage("Setor cadastrado com sucesso.");
      }
      fetchSetor()
      setIsModalOpen(false);
      setShowDialog(true);
      setDialogType("success");
    } catch (error) {
      console.error("Erro ao salvar Setor: ", error);
      setDialogMessage("Erro ao salvar Setor. " + error);
      setDialogType("error");
      setShowDialog(true);
    }
  };



  const handleDelete = async (id: number) => {

    try {
      await makeRequest.delete('/setores/delete', { data: { id } });
      fetchSetor(); // Recarrega a lista de usuários após a exclusão
      setShowDialog(true);
      setDialogMessage("Setor excluído com sucesso.");
      setDialogType("success");
    } catch (error) {
      console.error("Erro ao excluir Setor:", error);
      setShowDialog(true);
      setDialogMessage("Erro ao excluir Setor. " + error);
      setDialogType("error");
    }

  };

  // Função para abrir modal de confirmação
  const confirmDelete = (setor: ISetor) => {
    setSetorToDelete(setor);
    setIsConfirmDeleteOpen(true);
  };

  // Ajuste os dados para incluir ações
  const tableData = setor.map(value => ({
    ...value,
    actions: (
      <div className="flex space-x-2">
        <button
          onClick={() => handleEdit(value)}
          className="text-blue-600 hover:underline"
        >
          Editar
        </button>
        <button
          onClick={() => handleDelete(value.id)}
          className="text-red-600 hover:underline"
        >
          Excluir
        </button>
      </div>
    ),
  }));

  // Definindo as colunas da tabela
  const columns = [
    { uid: 'id', name: 'ID' },
    { uid: 'titulo', name: 'Título' },
    { uid: 'descricao', name: 'Descrição' },
    { uid: 'observacao', name: 'Observação' },
    { uid: 'gera_incidencia', name: 'Incidência' },
    { uid: 'taxa', name: 'Taxa' },
    { uid: 'percentual', name: 'Percentual' },
    { uid: 'actions', name: 'Ações', sortable: false },
  ];

  return (
    <div className="w-[90%] mx-auto mt-14 p-6 shadow-md rounded-md bg-white">
      <h1 className="text-2xl font-bold mb-4">Cadastro de Setor</h1>
      <DynamicTable
        columns={columns}
        data={tableData}
        onAddNew={handleAddNew}
        rowsPerPageOptions={[5, 10, 15]}
        statusColorMap={{
          ativo: 'success',
          inativo: 'danger',
        }}
        initialVisibleColumns={['id', 'titulo', 'incidencia', 'taxa', 'percentual', 'actions']}
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
          title={setorSelected ? "Editar Setor" : "Adicionar Setor"}
          fields={modalFields.map(field => ({
            ...field,
            value: field.value || '',
          }))}
          onSubmit={() => {
            const formData = modalFields.reduce((acc, field) => {
              acc[field.label] = field.value;
              return acc;
            }, {});
            handleSubmitNew(formData);
          }}
          size='2xl'
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

      {/* Modal de Confirmação */}
      {isConfirmDeleteOpen && setorToDelete && (
        <Modal
          showDialog={isConfirmDeleteOpen}
          setShowDialog={setIsConfirmDeleteOpen}
          titleDialog="Confirmação de Exclusão"
          messageDialog={`Você tem certeza que deseja excluir o cliente ${setorToDelete.titulo}?`}
          type="warning"
          onConfirm={() => {
            const id = setorToDelete.id;
            handleDelete(id);
            setIsConfirmDeleteOpen(false); // Fechar o modal após a confirmação
          }}
          typeDlg='question'
        />
      )}
    </div>
  );
}
