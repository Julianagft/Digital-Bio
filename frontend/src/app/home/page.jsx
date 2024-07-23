"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import API from "@/service/api";

export default function Home () {
    
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        async function checkAuth() {
            try {

                const token = API.defaults.headers.common['token'];

                if (!token) {
                    throw new Error('Token ausente');
                }

                setAuthenticated(true);

            } catch (error) {
                console.error('Usuário não autenticado:', error);
                router.push('/'); 
            } finally {
                setLoading(false);
            }
        }

        checkAuth();
    }, [router]);

    if (loading) return <p>Loading...</p>;

    if (!authenticated) return null; 

    async function handleLogOut() {
        try {
            delete API.defaults.headers.common['token'];
            
            router.push('/');

        } catch (error) {
            console.error('Erro ao fazer logout:', error);
        }
    }
    
    return (
        
        <div className="bg-blue-300 h-full w-full">
            {
                authenticated ? (
                    <div>
                        <button onClick={handleLogOut}>LogOut</button>
                        <p>HOME</p>
                    </div>
                ) : 
                <h2>Faça login para acessar seus links</h2>
            }
            
        </div>
    );
}