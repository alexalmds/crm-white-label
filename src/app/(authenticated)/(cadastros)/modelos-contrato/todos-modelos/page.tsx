'use client'
import { useContext, useEffect, useState } from 'react';
import { Button } from '@nextui-org/react';
import DynamicTable from '@/components/DynamicTable.tsx';
import { makeRequest } from '../../../../../../axios';
import { UserContext } from '@/context/UserContext';
import { useRouter } from 'next/navigation';
import Modal from '@/components/Modal';

interface Modelos {
  titulo: string,
  id: number,
  conteudo: string,
  id_empresa: number
}

export default function ListaModelosContratos() {
  const [modelos, setModelos] = useState<Modelos[]>([]);
  const { user } = useContext(UserContext);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [dialogType, setDialogType] = useState<'success' | 'error' | 'warning' | 'info'>('info');
  const [modelToDelet, setModelToDelete] = useState<Modelos | null>(null)
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const router = useRouter();



  const fetchModels = async () => {
    await makeRequest.post("/modelos-contrato/read", { id_empresa: user?.id_empresa }).then((resp) => {
      setModelos(resp.data);
    })
      .catch((ex) => {
        setDialogMessage(ex.response.data.messafe)
        setDialogType('error');
        setShowDialog(true)
      })
  }

  useEffect(() => {
    if (user?.id_empresa) {
      fetchModels();
    }
  }, [user?.id_empresa]);

  const handleEdit = (model: Modelos) => {
    router.push(`/modelos-contrato?model=${model?.id}`)
  };

  const handleAddNew = () => {
    router.push("/modelos-contrato")
  }

  const handleDelete = async (id: number) => {
    await makeRequest.delete("/modelos-contrato/delete", { data: { id } })
      .then(() => {
        fetchModels();
        setDialogMessage("Modelo de Contrato excluído com sucesso!")
        setDialogType('success');
        setShowDialog(true)
      })
      .catch((ex) => {
        setDialogMessage(ex.response.data.messafe)
        setDialogType('error');
        setShowDialog(true)
      })
  };

  // Função para abrir modal de confirmação
  const confirmDelete = (modelo: Modelos) => {
    setModelToDelete(modelo);
    setIsConfirmDeleteOpen(true);
  };

  // Ajuste os dados para incluir ações
  const tableData = modelos.map((model: any) => ({
    ...model,
    actions: (
      <div className="flex space-x-2">
        <Button size="sm" onClick={() => handleEdit(model)} color="primary" >
          Editar
        </Button>
        <Button size="sm" onClick={() => handleDelete(model.id)} color="danger" >
          Excluir
        </Button>
      </div>
    ),
  }));

  // Definindo as colunas da tabela
  const columns = [
    { uid: 'id', name: 'ID' },
    { uid: 'titulo', name: 'Título' },
    { uid: 'data_criacao', name: 'Data de Criação' },
    { uid: 'actions', name: 'Ações', sortable: false },
  ];

  return (
    <div className="w-[90%] mx-auto mt-14 p-6 shadow-md rounded-md bg-white">
      <h1 className="text-2xl font-bold mb-4">Lista de Modelos de Contratos</h1>
      <DynamicTable
        columns={columns}
        data={tableData}
        onAddNew={handleAddNew}
        rowsPerPageOptions={[5, 10, 15]}
        statusColorMap={{
          ativo: 'success',
          inativo: 'danger',
        }}
        initialVisibleColumns={['id', 'titulo', 'data_criacao', 'actions']}
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

      {/* Modal de Confirmação */}
      {isConfirmDeleteOpen && modelToDelet && (
        <Modal
          showDialog={isConfirmDeleteOpen}
          setShowDialog={setIsConfirmDeleteOpen}
          titleDialog="Confirmação de Exclusão"
          messageDialog={`Você tem certeza que deseja excluir a Forma de Pagamento ${modelToDelet.titulo}?`}
          type="warning"
          onConfirm={() => {
            const id = modelToDelet.id;
            handleDelete(id);
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
