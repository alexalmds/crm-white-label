"use client"

import { createContext, useEffect, useState } from 'react';

interface ContextProps {
    children: React.ReactNode;
}

interface User {
    id_usuario: number;
    email: string;
    cpf: string;
    nome: string;
    user_img: string;
    permissao: string;
    verified_acc: string;
    status: string;
    activated_tfa: string;
    created_at: string;
    id_empresa : string
}

interface UserContextProps {
    user: User | undefined;
    setUser: (newState: User | undefined) => void;
    updateUser: (newState: Partial<User>) => void;
}

const initialValue = {
    user: undefined,
    setUser: () => {},
    updateUser: () => {}
};

export const UserContext = createContext<UserContextProps>(initialValue);

export const UserContextProvider = ({ children }: ContextProps) => {
    const [user, setUser] = useState<User | undefined>(initialValue.user);

    useEffect(() => {
        let UserJSON = localStorage.getItem("finsolve-crm:user");
        setUser(UserJSON ? JSON.parse(UserJSON) : undefined);
    }, []);

    const updateUser = (newState: Partial<User>) => {
        setUser((prevUser) => (prevUser ? { ...prevUser, ...newState } : undefined));
    };

    return (
        <UserContext.Provider value={{ user, setUser, updateUser }}>
            {children}
        </UserContext.Provider>
    );
};
