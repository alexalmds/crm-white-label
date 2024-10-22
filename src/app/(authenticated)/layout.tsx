"use client"
import { useQuery, } from "@tanstack/react-query";
import { useRouter, usePathname } from "next/navigation";
import { makeRequest } from "../../../axios";
import { ReactNode, useContext } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { UserContext } from "@/context/UserContext";

export default function MainHome({ children }: { children: ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const { user, setUser } = useContext(UserContext);
    //--- Função para renovar o Token do usuário antes da expiração a cada 50 min
    const { data, error, isSuccess, isError } = useQuery({
        queryKey: ["refresh"],
        queryFn: () => makeRequest.get("auth/refresh").then((res) => {
            return res.data;
        }),
        retry: false,
        refetchInterval: 60 * 50 * 1000,
    });

    if (isSuccess) {
        console.log(data.msg)
    }

    if (isError) {
        console.log(error)
        setUser(undefined);
        localStorage.removeItem("finsolve-crm:user");
        router.push("/login")
    }


    return (
        <main className="w-full flex min-h-screen flex-col items-center bg-zinc-200">
            <Header />
            <div className="w-full flex justify-start py-4">
                <div className="w-full flex justify-center">
                    {children}
                </div>
            </div>
        </main>
    );
}
