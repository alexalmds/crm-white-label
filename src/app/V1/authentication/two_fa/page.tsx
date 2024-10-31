'use client';

import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation"; // Para redirecionar após sucesso
import { makeRequest } from "../../../../../axios"; // Importa o axios configurado
import Modal from "@/components/Modal"; // Certifique-se de importar o Modal corretamente
import { UserContext } from "@/context/UserContext";
import { CompanyContext } from "@/context/CompanyContext";

type ModalType = 'success' | 'error' | 'warning';

export default function TWO_FA() {
    const [code, setCode] = useState(''); // Para armazenar o código inserido pelo usuário
    const [idUsuario, setIdUsuario] = useState<string | null>(null); // Armazena o ID do usuário
    const [errorMessage, setErrorMessage] = useState(''); // Para armazenar mensagens de erro
    const [modalData, setModalData] = useState<{
        showModal: boolean;
        type: ModalType | undefined; // Use o tipo definido
        title: string;
        message: string;
    }>({
        showModal: false,
        type: undefined, // Inicialmente indefinido
        title: '',
        message: ''
    });
    
    const router = useRouter();
    const { setUser } = useContext(UserContext); // Obtém o setUser do contexto para atualizar o estado global do usuário
    const {setCompany} = useContext(CompanyContext);
    // Recupera o ID do usuário do localStorage quando o componente monta
    useEffect(() => {
        const storedId = localStorage.getItem("finsolve-crm:user-auth");
        if (storedId) {
            setIdUsuario(storedId);
        }
    }, []);

    // Função para lidar com o envio do formulário
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // Evita o reload da página

        if (!code || !idUsuario) {
            setModalData({
                showModal: true,
                type: 'warning',
                title: 'Campos Obrigatórios',
                message: 'Por favor, preencha o código de verificação.'
            });
            return;
        }

        try {
            // Faz a requisição para a API de autenticação 2FA
            const response = await makeRequest.post("auth/v1/2FA-authentication", {
                id_usuario: idUsuario,
                two_fa_code: code,
            }).then((resp) => {
                    localStorage.setItem(
                        "finsolve-crm:user",
                        JSON.stringify(resp.data.user)
                    )
                    localStorage.setItem(
                        "finsolve-crm:company",
                        JSON.stringify(resp.data.company)
                    )
                    setModalData({
                        showModal: true,
                        type: 'success',
                        title: 'Autenticação Concluída!',
                        message: 'Autenticação 2FA concluída. Redirecionando...',
                    });

                    // Redireciona para a página principal após um tempo
                    setTimeout(() => {
                        router.push("/dashboard");
                    }, 2000)
            }).catch((exception) => {
                console.error("Erro ao autenticar 2FA:", exception);
                setModalData({
                    showModal: true,
                    type: 'error',
                    title: 'UNAUTHORIZED',
                    message: exception.response.data.message,
                });
            })
        } catch (error) {
            console.error("Erro ao autenticar 2FA:", error);
            setModalData({
                showModal: true,
                type: 'error',
                title: 'Erro na Autenticação',
                message: 'Erro ao autenticar. Por favor, tente novamente.',
            });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="bg-zinc-800 shadow-lg rounded-lg p-8 w-full max-w-md">
                <h1 className="text-3xl font-bold text-white mb-6 text-center">Autenticação 2FA</h1>

                <p className="text-zinc-400 text-center mb-4">
                    Um código de verificação foi enviado para o seu email. Por favor, insira o código abaixo para continuar.
                </p>

                {/* Exibe mensagens de erro, se houver */}
                {errorMessage && (
                    <p className="text-red-500 text-center mb-4">{errorMessage}</p>
                )}

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="code" className="block text-sm font-medium text-white">
                            Código de Verificação
                        </label>
                        <input
                            id="code"
                            name="code"
                            type="text"
                            maxLength={6}
                            value={code}
                            onChange={(e) => setCode(e.target.value)} // Atualiza o estado do código
                            placeholder="Digite seu código"
                            className="mt-1 block w-full px-4 py-3 border border-zinc-600 rounded-md bg-zinc-900 text-white focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition-colors"
                    >
                        Verificar Código
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-zinc-400">Não recebeu o código?</p>
                    <button className="text-red-500 hover:underline mt-2">Reenviar código</button>
                </div>
            </div>

            {/* Modal para exibir mensagens de erro, sucesso ou aviso */}
            {modalData.showModal && (
                <Modal
                    type={modalData.type}
                    titleDialog={modalData.title}
                    messageDialog={modalData.message}
                    showDialog={modalData.showModal}
                    setShowDialog={() => setModalData({ ...modalData, showModal: false })}
                    typeDlg="message"
                />
            )}
        </div>
    );
}
