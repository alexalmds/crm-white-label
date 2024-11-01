// components/QRScanner.js
'use client'
import { useContext, useEffect, useState } from 'react';
import axios from 'axios'
import { Button } from '@nextui-org/react';
import { CompanyContext } from '@/context/CompanyContext';

const QRScanner = () => {
    const [qrCode, setQrCode] = useState('');
    const [isConnected, setIsConnected] = useState(false);
    const [data, setData] = useState(null);
    const {company} = useContext(CompanyContext);

    useEffect(() => {
        const checkSessionStatus = async () => {
            try {
                const formData = {
                    id_empresa: company?.id_empresa,
                    production_env: company?.asaas_mode,
                    tokenApi: company?.asaas_api_key
                }
                const statusResponse = await axios.post('https://api.finsolve.com.br/V1/WAPI/session/status', formData);
                if (statusResponse.data.status == 'not_logged_in') {
                    setIsConnected(false)
                }
                else if (statusResponse.data.status == 'waiting_for_qr_code') {
                    setIsConnected(false)
                }
                else {
                    setIsConnected(true)
                }
            } catch (error) {
                console.error('Erro ao verificar o status da sessão:', error);
            }
        };

        const fetchQrCode = async () => {
            try {
                const formData = {
                    id_empresa: company?.id_empresa,
                    production_env: company?.asaas_mode,
                    tokenApi: company?.asaas_api_key
                }
                const qrResponse = await axios.post('https://api.finsolve.com.br/V1/WAPI/session/status', formData);
                setQrCode(qrResponse.data.qrCode); // ajuste o caminho conforme a estrutura da resposta
            } catch (error) {
                console.error('Erro ao buscar QR Code:', error);
            }
        };

        checkSessionStatus();
        if (!isConnected) {
            fetchQrCode();
        }
    }, [isConnected]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen  bg-gray-100">
            {isConnected ? (
                <div className='flex flex-col justify-center items-center'>
                    <h2 className="text-2xl font-bold text-green-600 mb-4">Cliente conectado!</h2>
                    <div>
                        <Button variant='flat' className='mr-4 bg-red-600 text-white'>Desconectar</Button>
                        <Button variant='flat' className='bg-blue-600 text-white'>Reiniciar</Button>

                    </div>

                    <div className='flex flex-col p-4 bg-slate-200 rounded-lg shadow-lg mt-4'>
                        <div className='font-bold '>Device: <span className='font-semibold text-zinc-500 text-sm'>Linux(2.008.29)</span></div>
                        <div className='font-bold '>Agent-user: <span className='font-semibold text-zinc-500 text-sm'>Chrome v7.11.5826</span></div>
                        <div className='font-bold '>API: <span className='font-semibold text-green-600 text-sm'>true</span></div>
                        <div className='font-bold '>Nodecron: <span className='font-semibold text-green-600 text-sm'>executing</span></div>
                        <div className='font-bold '>Multi-device: <span className='font-semibold text-red-500 text-sm'>false</span></div>
                        <div className='font-bold '>current_status: <span className='font-semibold text-green-600 text-sm'>working</span></div>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center">
                    <h2 className="text-2xl font-bold text-red-600 mb-4">Conecte seu WhatsApp</h2>
                    {qrCode ? (
                        <img src={qrCode} alt="QR Code" className="w-64 h-64 border border-gray-300 rounded-lg mb-4" />
                    ) : (
                        <div>
                            <div>Aguardando QRCode</div>
                        </div>
                    )}
                    <p className="text-lg text-gray-700">Escaneie o código QR com o aplicativo do WhatsApp.</p>
                </div>
            )}
        </div>
    );
};

export default QRScanner;
