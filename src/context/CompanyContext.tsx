"use client"

import { createContext, useEffect, useState } from 'react';

interface ContextProps {
    children: React.ReactNode;
}

interface Company {
    id_empresa: number;
    email: string;
    cnpj: string;
    nome_empresa: string;
    endereco: string;
    plano: string;
    status: string;
    created_at: string;
    asaas_api_key: string;
    asaas_mode: string;
    theme: string;
    gpt_api_kv: string;
    gpt_active_integration: string;
    asaas_active_integration: string;
}

interface ComapnyContextProps {
    company: Company | undefined;
    setCompany: (newState: Company | undefined) => void;
    updateCompany: (newState: Partial<Company>) => void;
}

const initialValue = {
    company: undefined,
    setCompany: () => {},
    updateCompany: () => {}
};

export const CompanyContext = createContext<ComapnyContextProps>(initialValue);

export const CompanyContextProvider = ({ children }: ContextProps) => {
    const [company, setCompany] = useState<Company | undefined>(initialValue.company);

    useEffect(() => {
        let CompanyJSON = localStorage.getItem("finsolve-crm:company");
        setCompany(CompanyJSON ? JSON.parse(CompanyJSON) : undefined);
    }, []);

    const updateCompany = (newState: Partial<Company>) => {
        setCompany((prevCompany) => (prevCompany ? { ...prevCompany, ...newState } : undefined));
    };

    return (
        <CompanyContext.Provider value={{ company, setCompany, updateCompany }}>
            {children}
        </CompanyContext.Provider>
    );
};
