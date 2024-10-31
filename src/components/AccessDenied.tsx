import { useRouter } from 'next/navigation';

export default function AccessDenied() {
  const router = useRouter();

  const handleGoBack = () => {
    router.push('/dashboard'); // Redireciona para a página inicial ou qualquer rota desejada
  };

  return (
    <div className="w-full flex items-center justify-center min-h-screen bg-gradient-to-r from-red-500 to-slate-600 text-white p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md text-center text-gray-800">
        <h1 className="text-3xl font-semibold mt-4">Acesso Negado</h1>
        <p className="mt-2 text-gray-600">
          Desculpe, você não tem permissão para acessar este módulo. Entre em contato com o administrador do sistema para obter mais informações.
        </p>
        <button
          onClick={handleGoBack}
          className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full shadow-lg transition duration-300 ease-in-out"
        >
          Voltar à Página Inicial
        </button>
      </div>
    </div>
  );
}
