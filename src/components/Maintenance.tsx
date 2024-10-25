export default function Maintenance(){
    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-r from-red-500 to-slate-600 text-white">
            <div className="text-center">
                <h1 className="text-6xl font-bold mb-4">Página em Construção</h1>
                <p className="text-lg mb-8">
                    Estamos trabalhando para trazer algo incrível para você! Volte em breve.
                </p>

                <div className="flex justify-center space-x-4">
                    <a
                        href="/dashboard"
                        className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition-colors duration-300"
                    >
                        Voltar ao Início
                    </a>

                    
                </div>
            </div>

            <div className="absolute bottom-10 text-gray-200 text-sm">
                © {new Date().getFullYear()} FinSolve CRM. Todos os direitos reservados.
            </div>
        </div>
    )
}