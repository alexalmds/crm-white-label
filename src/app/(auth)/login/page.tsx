'use client';
import { useState } from 'react';
import AuthInputs from '@/components/AuthInputs';
import Link from 'next/link';
import { makeRequest } from '../../../../axios';
import { useRouter, useSearchParams } from 'next/navigation';
import Modal from '@/components/Modal';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showDialog, setShowDialog] = useState(false);
    const [dialogMessage, setDialogMessage] = useState('');
    const [dialogType, setDialogType] = useState<'success' | 'error' | 'warning' | 'info'>('info');
    const router = useRouter();
    const searchParams = useSearchParams();

    const redirectTo = searchParams.get('redirect') || '/dasboard'; // Pega a URL de redirecionamento ou usa '/main' por padrão

    const handleLogin = (e: any) => {
        e.preventDefault(); // Impede o comportamento padrão do botão
        // Valida os campos antes de tentar o login
        if (!email || !password) {
            setDialogType('warning');
            setDialogMessage('Por favor, preencha todos os campos obrigatórios.');
            setShowDialog(true);  // Exibe o Modal de aviso
            return;
        }

        makeRequest.post("auth/login", { email, senha: password })
            .then((resp) => {
                if (resp.data.autenticacao_2fa === 'pendente') {
                    localStorage.setItem(
                        "finsolve-crm:user-auth",
                        JSON.stringify(resp.data.user)
                    );
                    router.push("/V1/authentication/two_fa");
                } else {
                    localStorage.setItem(
                        "finsolve-crm:user", 
                        JSON.stringify(resp.data.user)
                    );
                    localStorage.setItem(
                        "finsolve-crm:company", 
                        JSON.stringify(resp.data.company)
                    );
                    router.push(redirectTo)
                }
            })
            .catch((err) => {
                setDialogType('error');
                setDialogMessage(err.response.data.message);
                setShowDialog(true);  // Exibe o Modal de erro
            });
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6 text-center">Bem-vindo a <span className='text-red-500'>Fin</span>Solve</h2>
            <AuthInputs label="e-Mail" newState={setEmail} value={email} mask="" />
            <div className="flex flex-row items-center mt-4">
                <AuthInputs label="Senha" newState={setPassword} IsPassword value={password} mask="" />
            </div>
            <button onClick={(e) => handleLogin(e)} className="bg-red-400 text-white shadow-md py-2 px-4 rounded-md mt-6 w-full font-semibold hover:bg-red-500">
                Login
            </button>
            <div className="flex items-center mt-4 justify-between">
                <div>
                    <input
                        type="checkbox"
                        id="terms"
                        className="mr-2"
                        required
                    />
                    <label htmlFor="terms" className="text-sm">
                        Lembrar-me
                    </label>
                </div>
                <div>
                    <Link href="" className='underline text-sm'>Esqueci minha senha</Link>
                </div>
            </div>

            {/* Modal */}
            {showDialog && (
                <Modal
                    showDialog={showDialog}
                    setShowDialog={setShowDialog}
                    titleDialog={`${dialogType == 'error' ? "Houve um erro": "Atenção"}`}
                    messageDialog={dialogMessage}
                    type={dialogType}
                    typeDlg='message'
                />
            )}
        </div>
    );
}


