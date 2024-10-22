import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { Player } from "@lottiefiles/react-lottie-player";
import successAnimation from "../lotties/success.json";
import errorAnimation from "../lotties/error.json";
import warningAnimation from "../lotties/warning.json";
import infoAnimation from "../lotties/info.json";

// Definir o tipo das animações
type AnimationType = 'success' | 'error' | 'warning' | 'info';

// Definir as props do Modal
interface ModalProps {
    showDialog: boolean;
    setShowDialog: (value: boolean) => void;
    titleDialog: string;
    messageDialog: string;
    type?: AnimationType;  // 'type' é opcional, com valor padrão 'info'
    onConfirm?: () => void;
    typeDlg: string;
}

// Definir o objeto das animações com a tipagem adequada
const animations: Record<AnimationType, object> = {
    success: successAnimation,
    error: errorAnimation,
    warning: warningAnimation,
    info: infoAnimation,
};

const Modal: React.FC<ModalProps> = ({
    showDialog,
    setShowDialog,
    titleDialog,
    messageDialog,
    type = "info",
    onConfirm,
    typeDlg
}) => {
    return (
        <Dialog
            open={showDialog}
            onClose={() => setShowDialog(false)}
            className="fixed inset-0 flex items-center justify-center z-50 overflow-y-auto"
        >
            <DialogPanel
                className="w-full max-w-md rounded-xl backdrop-blur-sm bg-black/30 p-6 transition duration-300 ease-out transform data-[closed]:scale-95 data-[closed]:opacity-0"
            >
                <div className="p-6 rounded z-50 w-full max-w-md text-white text-center">
                    {/* Lottie Animation */}
                    <Player
                        autoplay
                        loop
                        src={animations[type]}
                        style={{ height: '150px', width: '150px' }}
                    />

                    {/* Title */}
                    <DialogTitle className="text-xl font-bold mt-4">{titleDialog}</DialogTitle>

                    {/* Message */}
                    <div className="mt-2 text-sm text-zinc-300">
                        {messageDialog}
                    </div>

                    {/* Renderiza botões de acordo com tipo dialogo */}
                    {typeDlg === 'message' ? (
                        <div className="mt-6 flex justify-center">
                            <button
                                onClick={() => setShowDialog(false)}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-all"
                            >
                                Fechar
                            </button>
                        </div>
                    ) : (
                        <div className="mt-6 flex justify-center space-x-4">
                            <button
                                onClick={() => {if (onConfirm) {
                                    onConfirm(); // Chama a função de confirmação
                                }}}
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-all"
                            >
                               Confirmar
                            </button>
                            <button
                                onClick={() => setShowDialog(false)}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-all"
                            >
                                Cancelar
                            </button>
                        </div>
                    )}

                </div>
            </DialogPanel>
        </Dialog>
    );
}

export default Modal;
