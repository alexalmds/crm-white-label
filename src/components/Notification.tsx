import React, { useEffect } from 'react';

interface NotificationProps {
    message: string;
    type: 'success' | 'error';
    onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, type, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 10000); // Fechar a notificação após 3 segundos
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <>
        <div className={`fixed w-full top-4 right-0 px-4 py-2 rounded flex justify-between shadow-lg text-white ${type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
            {message}
            <button onClick={onClose} className="ml-4">x</button>
        </div>
         <div className={`fixed  bottom-2 right-0 px-4 py-2 rounded flex justify-between shadow-lg text-white ${type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
         ⬆
     </div>
     </>
    );
};

export default Notification;