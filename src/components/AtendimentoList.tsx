import React from 'react';

interface Atendimento {
  id: number;
  cliente: string;
  status: 'finalizado' | 'em_andamento';
  data: string;
}

interface AtendimentosListProps {
  atendimentos: Atendimento[];
}

const AtendimentosList: React.FC<AtendimentosListProps> = ({ atendimentos }) => {
  return (
    <div className="overflow-y-auto h-72">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2">Cliente</th>
            <th className="py-2">Status</th>
            <th className="py-2">Data</th>
          </tr>
        </thead>
        <tbody>
          {atendimentos.map((atendimento) => (
            <tr key={atendimento.id} className="hover:bg-gray-100">
              <td className="py-2 px-4">{atendimento.cliente}</td>
              <td className={`py-2 px-4 ${atendimento.status === 'finalizado' ? 'text-green-500' : 'text-blue-500'}`}>
                {atendimento.status === 'finalizado' ? 'Atendimento Finalizado' : 'Em Andamento'}
              </td>
              <td className="py-2 px-4">{atendimento.data}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AtendimentosList;
