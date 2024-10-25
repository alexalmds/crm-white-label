'use client'
import { useState, useEffect, useContext } from 'react';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation'; // Para pegar parâmetros da URL
import 'react-quill/dist/quill.snow.css'; // Importa os estilos do Quill
import { Button } from '@nextui-org/react'; // Importando o botão do NextUI
import Link from 'next/link';
import { makeRequest } from '../../../../../axios';
import Modal from '@/components/Modal';
import { UserContext } from '@/context/UserContext';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface Contrato {
    titulo: string,
    content: string
}


export default function ModelosContrato() {
    const [content, setContent] = useState(''); // Estado para armazenar o conteúdo do contrato
    const [titulo, setTitulo] = useState(''); // Título do contrato
    const [isLoading, setIsLoading] = useState(false); // Estado de carregamento
    const searchParams = useSearchParams(); // Hook para obter os parâmetros de consulta da URL
    const [showDialog, setShowDialog] = useState(false);
    const [dialogMessage, setDialogMessage] = useState('');
    const [dialogType, setDialogType] = useState<'success' | 'error' | 'warning' | 'info'>('info');
    const {user} = useContext(UserContext);

    // Função para carregar os dados do contrato com base no ID da URL
    const loadContrato = async (id: string) => {
        setIsLoading(true);
        try {
            const resp = await makeRequest.post("/modelos-contrato/get", { id });
            const { titulo, conteudo } = resp.data;
            if (resp.data) {
                setTitulo(titulo || ''); // Garante que o título não seja undefined
                setContent(conteudo || ''); // Garante que o conteúdo não seja undefined
            }
            else {
                setDialogMessage("Contrato não encontrado!")
                setDialogType('warning');
                setShowDialog(true)
            }

        } catch (error) {
            console.error('Erro ao carregar o contrato:', error);
            setDialogMessage("Erro ao buscar contrato! " + error)
            setDialogType('error');
            setShowDialog(true)
        } finally {
            setIsLoading(false);
        }
    };

    // useEffect para capturar o ID da URL e carregar os dados
    useEffect(() => {
        const modelId = searchParams.get('model'); // Pega o parâmetro 'model' da URL
        if (modelId) {
            loadContrato(modelId); // Chama a função para carregar o contrato
        }
    }, [searchParams]); // Executa quando o parâmetro de pesquisa mudar

    const handleSave = async () => {
        if (!titulo || !content) {
            alert('Por favor, preencha o título e o conteúdo do contrato.');
            return;
        }
        // Envia os dados para o backend (ou API) para salvar no banco de dados
        try {
            const modelId = searchParams.get('model')
            if (!modelId){
                await makeRequest.post("/modelos-contrato/create", {titulo, conteudo: content, id_empresa: user?.id_empresa}).then(() => {
                    setDialogMessage("Modelo de contrato criado com sucesso!")
                    setDialogType('success');
                    setShowDialog(true)
                }).catch((exc) => {
                    setDialogMessage(exc.response.data.message)
                    setDialogType('error');
                    setShowDialog(true)
                })
            }
            else {
                await makeRequest.patch("/modelos-contrato/update", {id: modelId, titulo, conteudo: content, id_empresa: user?.id_empresa}).then(() => {
                    setDialogMessage("Modelo de contrato atualizado com sucesso!")
                    setDialogType('success');
                    setShowDialog(true)
                }).catch((exc) => {
                    setDialogMessage(exc.response.data.message)
                    setDialogType('error');
                    setShowDialog(true)
                })
            }
            
        } catch (error) {
            console.error('Erro:', error);
        }
    };

    return (
        <div className="w-[90%] mx-auto mt-14 p-6 shadow-md rounded-md bg-white">
            <div className='flex justify-between'>
                <h1 className="text-2xl font-bold mb-4">Modelos de Contratos</h1>
                <Button variant='shadow' color='primary'>
                    <Link href="/modelos-contrato/todos-modelos">Ver todos os modelos</Link>
                </Button>
            </div>

            {isLoading ? (
                <p>Carregando...</p>
            ) : (
                <>
                    <div className="mb-4">
                        <label className="block text-lg font-medium">Título do Contrato</label>
                        <input
                            type="text"
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                            className="w-full p-2 border rounded mt-2"
                            placeholder="Digite o título do contrato"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-lg font-medium">Conteúdo do Contrato</label>
                        <ReactQuill
                            theme="snow"
                            value={content}
                            onChange={setContent} // Atualiza o conteúdo
                            modules={{
                                toolbar: [
                                    [{ header: '1' }, { header: '2' }, { font: [] }],
                                    [{ list: 'ordered' }, { list: 'bullet' }],
                                    ['bold', 'italic', 'underline'],
                                    ['link', 'blockquote', 'code-block'],
                                    [{ align: [] }],
                                    ['clean'],
                                ],
                            }}
                        />
                    </div>

                    <Button onClick={handleSave} color="primary">
                        Salvar Modelo de Contrato
                    </Button>
                </>
            )}

            {/* Modal de Mensagem */}
            {showDialog && (
                <Modal
                    showDialog={showDialog}
                    setShowDialog={setShowDialog}
                    titleDialog={`${dialogType === 'error' ? "Houve um erro" : "Atenção"}`}
                    messageDialog={dialogMessage}
                    type={dialogType}
                    typeDlg='message'
                />
            )}
        </div>
    );
}
