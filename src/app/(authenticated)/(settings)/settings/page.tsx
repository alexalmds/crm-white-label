'use client'
import { useState, useEffect, useContext } from 'react';
import { Input, Button, Switch, Select, SelectItem } from '@nextui-org/react';
import { useTheme } from "next-themes";
import QRScanner from '@/components/QRCode';
import { makeRequest } from '../../../../../axios';
import { UserContext } from '@/context/UserContext';

const SettingsPage = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [asaasApiKey, setAsaasApiKey] = useState('');
    const [asaasMode, setAsaasMode] = useState('sandbox');
    const [gptKey, setGptKey] = useState('');
    const [asaasActiveIntegration, setAsaasActiveIntegration] = useState(false);
    const [openApiActiveIntegration, setOpenApiActiveIntegration] = useState(false); // Nova integração OpenAPI
    const [theme, setTheme] = useState('light');
    const [notifyEmail, setNotifyEmail] = useState(false);
    const [notifyWeb, setNotifyWeb] = useState(true);
    const {user} = useContext(UserContext);

    useEffect(() => {
        if(user?.id_empresa){
            makeRequest.get('settings/get?id_empresa='+user.id_empresa + '&secret=FSC20241011').then((data) => {
                setAsaasActiveIntegration(data.data[0].asaas_active_integration === 'T' ? true : false);
                setOpenApiActiveIntegration(data.data[0].gpt_active_integration === 'T' ? true : false);
                setAsaasApiKey(data.data[0].asaas_api_key);
                setAsaasMode(data.data[0].asaas_mode);
            })
        }
        
    }, [user?.id_empresa]);

    const saveSettings = () => {
        // Salvar configurações na API
        const settingsPayload = {
            asaas_api_key: asaasApiKey,
            asaas_mode: asaasMode,
            asaas_active_integration: asaasActiveIntegration ? 'T' : 'F',
            openapi_active_integration: openApiActiveIntegration ? 'T' : 'F',
            theme
        };

        fetch('http://localhost:8000/settings/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(settingsPayload)
        })
            .then(response => response.json())
            .then(data => {
                console.log("Configurações salvas!", data);
            })
            .catch(error => {
                console.error("Erro ao salvar configurações:", error);
            });
    };

    return (
        <div className="w-full mt-10 flex min-h-screen bg-slate-100 dark:bg-slate-900">
            {/* Sidebar para navegação */}
            <div className="w-1/4 p-5 bg-slate-50 dark:bg-slate-800">
                <h2 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">Configurações</h2>
                <ul className="space-y-4">
                    <li>
                        <Button variant='flat' className="w-full text-left" onPress={() => setActiveTab(0)}>
                            Integrações
                        </Button>
                    </li>
                    <li>
                        <Button variant='flat' className="w-full text-left" onPress={() => setActiveTab(1)}>
                            Tema
                        </Button>
                    </li>
                    <li>
                        <Button variant='flat' className="w-full text-left" onPress={() => setActiveTab(2)}>
                            Notificações
                        </Button>
                    </li>
                    <li>
                        <Button variant='flat' className="w-full text-left" onPress={() => setActiveTab(3)}>
                            WhatsApp
                        </Button>
                    </li>
                </ul>
            </div>

            {/* Conteúdo das seções */}
            <div className="w-3/4 p-10 bg-white dark:bg-slate-700">
                {activeTab === 0 && (
                    <div>
                        <h2 className="text-2xl font-semibold mb-6 text-slate-900 dark:text-white">Integrações</h2>
                        {asaasActiveIntegration || openApiActiveIntegration ? (
                            <>
                                {/* Asaas Key */}
                                {asaasActiveIntegration && (
                                    <>
                                        <div className="mb-5">
                                            <label className="block text-slate-700 dark:text-slate-300 mb-2">Chave API Asaas:</label>
                                            <Input
                                                fullWidth
                                                value={asaasApiKey}
                                                onChange={(e) => setAsaasApiKey(e.target.value)}
                                                placeholder="Insira sua chave API do Asaas"
                                                className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white"
                                            />
                                        </div>
                                        <div className="mb-5">
                                            <label className="block text-slate-700 dark:text-slate-300 mb-2">Modo Asaas:</label>
                                            <Select
                                                placeholder={asaasMode}
                                                className="w-full bg-slate-100 dark:bg-slate-800 dark:text-white"
                                                value={asaasMode}
                                                onChange={(value: any) => setAsaasMode(value)}
                                            >
                                                <SelectItem key="sandbox" value="sandbox">Sandbox</SelectItem>
                                                <SelectItem key="production" value="production">Produção</SelectItem>
                                            </Select>
                                        </div>
                                    </>
                                )}

                                {/* OpenAPI Key */}
                                {openApiActiveIntegration && (
                                    <div className="mb-5">
                                    <label className="block text-slate-700 dark:text-slate-300 mb-2">Chave API OpenAI:</label>
                                    <Input
                                        fullWidth
                                        value={gptKey}
                                        onChange={(e) => setAsaasApiKey(e.target.value)}
                                        placeholder="Insira sua chave API do OpenAI"
                                        className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white"
                                    />
                                </div>
                                )}

                                <Button onPress={saveSettings}>Salvar Integrações</Button>
                            </>
                        ) : (
                            <p className="text-red-500 text-xl">Você não possui integrações ativas em seu plano.</p>
                        )}
                    </div>
                )}

                {activeTab === 1 && (
                    <div>
                        <h2 className="text-2xl font-semibold mb-6 text-slate-900 dark:text-white">Tema</h2>
                        <div className="mb-5">
                            <label className="block text-slate-700 dark:text-slate-300 mb-2">Tema da Aplicação:</label>
                            <div className='flex space-x-4'>
                                <Button className='bg-cyan-500 text-white' variant='shadow' onClick={() => setTheme('light')}>Light Mode</Button>
                                <Button className='bg-slate-500 text-white' variant='shadow' onClick={() => setTheme('dark')}>Dark Mode</Button>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 2 && (
                    <div>
                        <h2 className="text-2xl font-semibold mb-6 text-slate-900 dark:text-white">Notificações</h2>
                        <div className="mb-5">
                            <label className="block text-slate-700 dark:text-slate-300 mb-2">Notificações por E-mail:</label>
                            <Switch
                                checked={notifyEmail}
                                onChange={(e) => setNotifyEmail(e.target.checked)}
                                className="bg-slate-100 dark:bg-slate-800"
                            />
                        </div>
                        <div className="mb-5">
                            <label className="block text-slate-700 dark:text-slate-300 mb-2">Notificações na Web:</label>
                            <Switch
                                checked={notifyWeb}
                                onChange={(e) => setNotifyWeb(e.target.checked)}
                                className="bg-slate-100 dark:bg-slate-800"
                            />
                        </div>
                        <Button onPress={saveSettings}>Salvar Notificações</Button>
                    </div>
                )}

                {activeTab === 3 && (
                    <div>
                        <h2 className="text-2xl font-semibold mb-6 text-slate-900 dark:text-white">WhatsApp</h2>
                        <QRScanner />
                    </div>
                )}
            </div>
        </div>
    );
};

export default SettingsPage;
