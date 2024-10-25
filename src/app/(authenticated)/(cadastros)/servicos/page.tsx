'use client'
import { useContext, useEffect, useState } from 'react';
import { Button } from '@nextui-org/react';
import DynamicTable from '@/components/DynamicTable.tsx';
import { IServicos } from '@/interfaces';
import { UserContext } from '@/context/UserContext';
import Modal from '@/components/Modal';
import DynamicModal from '@/components/DynamicModal';
import { makeRequest } from '../../../../../axios';
import { CalendarDate, parseDate } from "@internationalized/date";
import { ISetor } from '@/interfaces';


export default function servicos() {
  const [servicos, setServicos] = useState<IServicos[]>([]);
  const [setor, setSetor] = useState<ISetor[]>([]);
  const [selectedServico, setSelectedServico] = useState<IServicos | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalFields, setModalFields] = useState<any[]>([]);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [dialogType, setDialogType] = useState<'success' | 'error' | 'warning' | 'info'>('info');
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [servicoToDelete, setServicoToDelete] = useState<IServicos | null>(null);
  const { user } = useContext(UserContext)






  const fetchServicos = async () => {
    try {
      const response = await makeRequest.post('/servicos/read', { id_empresa: user?.id_empresa });
      setServicos(response.data);
    } catch (error) {
      setShowDialog(true);
      setDialogMessage("Houve um erro iniciar listagem. " + error);
      setDialogType("error");
    }
  }

  useEffect(() => {
    if (user?.id_empresa) {
      fetchServicos();

      makeRequest.post('/setores/read', { id_empresa: user?.id_empresa }).then((response: any) => {
        console.log("Resposta da API:", response.data); // Verifique a resposta da API
        setSetor(response.data.map((s: ISetor) => ({ label: s.titulo, value: s.id })));
      }).catch((error) => {
        setShowDialog(true);
        setDialogMessage("Houve um erro iniciar listagem. " + error.response.data.message);
        setDialogType("error");
      });
    }
  }, [user?.id_empresa]);

  // Monitorar mudanças no estado 'setor'
  useEffect(() => {
    if (setor.length > 0) {
      console.log("Setores atualizados:", setor);  // Isso será chamado sempre que o estado `setor` mudar
    }
  }, [setor]);




  const handleSubmitNew = async (data: any) => {
    setSelectedServico(null)
    if (setor.length === 0) {
      setShowDialog(true);
      setDialogMessage("Erro: Os setores ainda não foram carregados.");
      setDialogType("error");
      return;
    }
    try {
      const formData = {
        id_empresa: selectedServico ? undefined : user?.id_empresa,
        id: selectedServico ? selectedServico.id : undefined,
        titulo: data['Título'],
        id_setor: data['Setor'],
        encargos: data['Encargos'],
        tributos_federais_totais: data['Tributos Federais Totais'],
        vigencia: data['Vigência'],
        valor: data['Valor'],
      };
      if (selectedServico) {
        // Edita o cliente existente
        await makeRequest.patch('/servicos/update', formData);
        setDialogMessage("Cliente atualizado com sucesso.");
      } else {
        // Adiciona um novo usuário
        await makeRequest.post('/servicos/create', formData);
        setDialogMessage("Cliente cadastrada com sucesso.");
      }
      fetchServicos()
      setIsModalOpen(false);
      setShowDialog(true);
      setDialogType("success");
    } catch (error) {
      console.error("Erro ao salvar o Serviço: ", error);
      setDialogMessage("Erro ao salvar o Serviço. " + error);
      setDialogType("error");
      setShowDialog(true);
    }
  };

  useEffect(() => {
    if (isModalOpen && setor.length > 0) {
      setModalFields(prev => prev.map(field =>
        field.label === 'Setor' ? { ...field, options: setor } : field
      ));
    }
  }, [setor, isModalOpen]);



  const handleAddNew = () => {

    setSelectedServico(null)
    setModalFields([
      { type: 'text', label: 'Título', value: '', onChange: (value: string) => setModalFields(prev => prev.map(field => field.label === 'Título' ? { ...field, value } : field)), },
      { type: 'text', label: 'Encargos', value: '', onChange: (value: string) => setModalFields(prev => prev.map(field => field.label === 'Encargos' ? { ...field, value } : field)), },
      { type: 'text', label: 'Tributos Federais Totais', value: '', onChange: (value: string) => setModalFields(prev => prev.map(field => field.label === 'Tributos Federais Totais' ? { ...field, value } : field)), },
      { type: 'text', label: 'Valor', value: '', onChange: (value: string) => setModalFields(prev => prev.map(field => field.label === 'Valor' ? { ...field, value } : field)), },
      { type: 'dateInput', label: 'Vigência', value: new CalendarDate(2024, 1, 1), onChange: (value: string) => setModalFields(prev => prev.map(field => field.label === 'Vigência' ? { ...field, value } : field)), },
      { type: 'select', label: 'Setor', value: '', options: setor.map(s => ({ label: s.titulo, value: s.id })), onChange: (value: string) => setModalFields(prev => prev.map(field => field.label === 'Setor' ? { ...field, value } : field)), },
    ]);

    setIsModalOpen(true)
  }

  const handleEdit = (servico: IServicos) => {
    const vigenciaDate = parseDate(servico.vigencia.split('T')[0]);
    setSelectedServico(servico)
    setModalFields([
      { type: 'text', label: 'Título', value: servico.titulo, onChange: (value: string) => setModalFields(prev => prev.map(field => field.label === 'Título' ? { ...field, value } : field)), },
      { type: 'text', label: 'Encargos', value: servico.encargos, onChange: (value: string) => setModalFields(prev => prev.map(field => field.label === 'Encargos' ? { ...field, value } : field)), },
      { type: 'text', label: 'Tributos Federais Totais', value: servico.tributos_federais_totais, onChange: (value: string) => setModalFields(prev => prev.map(field => field.label === 'Tributos Federais Totais' ? { ...field, value } : field)), },
      { type: 'text', label: 'Valor', value: servico.valor, onChange: (value: string) => setModalFields(prev => prev.map(field => field.label === 'Valor' ? { ...field, value } : field)), },
      { type: 'dateInput', label: 'Vigência', value: vigenciaDate, onChange: (value: CalendarDate) => setModalFields(prev => prev.map(field => field.label === 'Vigência' ? { ...field, value } : field)), },
      { type: 'select', label: 'Setor', value: servico.id_setor, options: setor.map(s => ({ label: s.titulo, value: s.id })), onChange: (value: string) => setModalFields(prev => prev.map(field => field.label === 'Setor' ? { ...field, value } : field)), },
    ]);

    setIsModalOpen(true)
  }

  // Função para abrir modal de confirmação
  const confirmDelete = (servico: IServicos) => {
    setServicoToDelete(servico);
    setIsConfirmDeleteOpen(true);
  };


  const handleDelete = async (id: number) => {
    await makeRequest.delete("/servicos/delete", {
      data: {
        id: id
      }
    }).then(() => {
      setDialogMessage("Registro excluído com sucesso!.");
      fetchServicos();
      setIsModalOpen(false);
      setShowDialog(true);
      setDialogType("success");
    }).catch((exc) => {
      setDialogMessage(exc.response.data.message);
      fetchServicos();
      setIsModalOpen(false);
      setShowDialog(true);
      setDialogType("error");
    })
  };

  // Ajuste os dados para incluir ações
  const tableData = servicos.map((servicos: any) => ({
    ...servicos,
    actions: (
      <div className="flex space-x-2">
        <Button size="sm" onClick={() => handleEdit(servicos)} color="primary" >
          Editar
        </Button>
        <Button size="sm" onClick={() => handleDelete(servicos.id)} color="danger" >
          Excluir
        </Button>
      </div>
    ),
  }));

  // Definindo as colunas da tabela
  const columns = [
    { uid: 'id', name: 'ID' },
    { uid: 'titulo', name: 'Título' },
    { uid: 'descricao', name: 'Descrição' },
    { uid: 'encargos', name: 'Encargos' },
    { uid: 'tributos_federais_totais', name: 'Trib. Federais Totais' },
    { uid: 'valor', name: 'Valor' },
    { uid: 'vigencia', name: 'Vigência' },
    { uid: 'setor_nome', name: 'Setor' },
    { uid: 'actions', name: 'Ações', sortable: false },
  ];

  return (
    <div className="w-[90%] mx-auto mt-14 p-6 shadow-md rounded-md bg-white">
      <h1 className="text-2xl font-bold mb-4">Cadastro de Serviços</h1>
      <DynamicTable
        columns={columns}
        data={tableData}
        onAddNew={handleAddNew}
        rowsPerPageOptions={[5, 10, 15]}
        statusColorMap={{
          ativo: 'success',
          inativo: 'danger',
        }}
        initialVisibleColumns={['id', 'titulo', 'tributos_federais_totais', 'encargos', 'valor', 'setor_nome', 'actions']}
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
        title="Cadastro de Serviço"
        fields={modalFields}
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
      {isConfirmDeleteOpen && servicoToDelete && (
        <Modal
          showDialog={isConfirmDeleteOpen}
          setShowDialog={setIsConfirmDeleteOpen}
          titleDialog="Confirmação de Exclusão"
          messageDialog={`Você tem certeza que deseja excluir o Serviço ${servicoToDelete.titulo}?`}
          type="warning"
          onConfirm={() => {
            const id = servicoToDelete.id;
            handleDelete(id);
            setIsConfirmDeleteOpen(false); // Fechar o modal após a confirmação
          }}
          typeDlg='question'
        />
      )}

    </div>
  );
}
