"use client";  // Se você estiver usando Next.js 13 com o modo de aplicativo

import { Bar } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Registrar as escalas e outros componentes necessários
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Dados fictícios
const dummyData = {
    atendimentos: [
        { id: 1, cliente: 'Cliente A', data: '2024-09-01', status: 'Concluído' },
        { id: 2, cliente: 'Cliente B', data: '2024-09-02', status: 'Pendente' },
        { id: 3, cliente: 'Cliente C', data: '2024-09-03', status: 'Concluído' },
        { id: 4, cliente: 'Cliente D', data: '2024-09-04', status: 'Concluído' },
        { id: 5, cliente: 'Cliente E', data: '2024-09-05', status: 'Pendente' },
    ],
};

export default function Dashboard() {
    const [clientesInadimplentes, setClientesInadimplentes] = useState(0); // Número fictício
    const [viasGeradas, setViasGeradas] = useState(0); // Número fictício
    const [lucroDoMes, setLucroDoMes] = useState(0); // Valor fictício

    const graficoAtendimentosData = {
        labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
        datasets: [
            {
                label: 'Atendimentos',
                data: [0, 0, 0, 0],
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };

    const graficoLucroData = {
        labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
        datasets: [
            {
                label: 'Lucro',
                data: [0, 0, 0, 0],
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
            },
        ],
    };

    return (
        <div className="w-[90%] bg-gray-100 min-h-screen mt-14">
            {/* Gráficos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white shadow-md rounded-lg p-4">
                    <h2 className="font-semibold text-lg">Atendimentos por Semana</h2>
                    <Bar data={graficoAtendimentosData} options={{ responsive: true }} />
                </div>
                <div className="bg-white shadow-md rounded-lg p-4">
                    <h2 className="font-semibold text-lg">Lucro do Mês</h2>
                    <Bar data={graficoLucroData} options={{ responsive: true }} />
                </div>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
                    <h3 className="text-xl font-semibold">Clientes Inadimplentes</h3>
                    <p className="text-4xl font-bold text-red-600">{clientesInadimplentes}</p>
                </div>
                <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
                    <h3 className="text-xl font-semibold">2ª Vias Geradas</h3>
                    <p className="text-4xl font-bold text-blue-600">{viasGeradas}</p>
                </div>
                <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
                    <h3 className="text-xl font-semibold">Lucro do Mês</h3>
                    <p className="text-4xl font-bold text-green-600">R$ {lucroDoMes.toFixed(2)}</p>
                </div>
            </div>

            {/* Tabela */}
            {/* <div className="bg-white shadow-md rounded-lg p-4">
                <h2 className="font-semibold text-lg mb-4">Últimos Atendimentos</h2>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {dummyData.atendimentos.map(atendimento => (
                            <tr key={atendimento.id}>
                                <td className="px-6 py-4 whitespace-nowrap">{atendimento.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{atendimento.cliente}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{atendimento.data}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{atendimento.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div> */}
        </div>
    );
}
