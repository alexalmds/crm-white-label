'use client'
import { useEffect, useState } from 'react';
import { Button } from '@nextui-org/react';
import DynamicTable from '@/components/DynamicTable.tsx';

export default function servicos() {
  const [servicos, setServicos] = useState([]);

  // Buscando modelos de contratos ao carregar a página
  useEffect(() => {
    async function fetchModelos() {
      try {
        const response = await fetch('/servicos/list');
        const data = await response.json();
        setServicos(data);
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
          setServicos(servicos.filter((servicos : any) => servicos.id !== id));
        } else {
          console.error('Erro ao excluir modelo');
        }
      } catch (error) {
        console.error('Erro:', error);
      }
    }
  };

  // Ajuste os dados para incluir ações
  const tableData = servicos.map((servicos : any) => ({
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
    { uid: 'setor', name: 'Setor' },
    { uid: 'actions', name: 'Ações', sortable: false },
  ];

  return (
    <div className="w-[90%] mx-auto mt-14 p-6 shadow-md rounded-md bg-white">
      <h1 className="text-2xl font-bold mb-4">Cadastro de Serviços</h1>
      <DynamicTable
        columns={columns}
        data={tableData}
        rowsPerPageOptions={[5, 10, 15]}
        statusColorMap={{
          ativo: 'success',
          inativo: 'danger',
        }}
        initialVisibleColumns={['id', 'titulo', 'tributos_federais_totais', 'encargos', 'valor', 'vigencia', 'actions']}
      />
    </div>
  );
}
