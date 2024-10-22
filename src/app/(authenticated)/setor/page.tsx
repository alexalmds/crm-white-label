'use client'
import { useEffect, useState } from 'react';
import { Button } from '@nextui-org/react';
import DynamicTable from '@/components/DynamicTable.tsx';

export default function Setor() {
  const [setor, setSetor] = useState([]);

  // Buscando modelos de contratos ao carregar a página
  useEffect(() => {
    async function fetchModelos() {
      try {
        const response = await fetch('/setor/list');
        const data = await response.json();
        setSetor(data);
      } catch (error) {
        console.error('Erro ao buscar modelos:', error);
      }
    }
    fetchModelos();
  }, []);

  const handleEdit = (model : any) => {
    // Função para editar o modelo de contrato
    console.log('Editar modelo:', model);
  };

  const handleDelete = async (id : number) => {
    if (confirm('Tem certeza que deseja excluir este modelo?')) {
      try {
        const response = await fetch(`/api/delete-modelo-contrato/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setSetor(setor.filter((setor : any) => setor.id !== id));
        } else {
          console.error('Erro ao excluir modelo');
        }
      } catch (error) {
        console.error('Erro:', error);
      }
    }
  };

  // Ajuste os dados para incluir ações
  const tableData = setor.map((setor : any) => ({
    ...setor,
    actions: (
      <div className="flex space-x-2">
        <Button size="sm" onClick={() => handleEdit(setor)} color="primary" >
          Editar
        </Button>
        <Button size="sm" onClick={() => handleDelete(setor.id)} color="danger" >
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
        rowsPerPageOptions={[5, 10, 15]}
        statusColorMap={{
          ativo: 'success',
          inativo: 'danger',
        }}
        initialVisibleColumns={['id', 'titulo', 'incidencia', 'taxa', 'percentual', 'actions']}
      />
    </div>
  );
}
