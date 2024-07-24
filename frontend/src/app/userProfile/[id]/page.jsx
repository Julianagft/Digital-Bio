"use client"
import { useEffect, useState } from "react";

import getUserByIdService from "@/service/users/getUserById/getUserById.Service";

export default function userProfile ({params}) {

    console.log("params: ", params.id);

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
        try {
            const response = await getUserByIdService(params.id)
            console.log("response.data: ", response);

            return response
            // setUserData(response.data);
            setLoading(false)
        } catch (error) {
            console.error('Erro ao buscar dados do usuário:', error);
        }
    };

    if (params && params.id) {
        fetchUserData();
    }
}, [params]);


    //   if (loading) return <p>Carregando...</p>;
    //   if (!userData) return <p>Usuário não encontrado</p>;

    return (
        <div>
            <h1></h1>
            <p>oi...</p>
        
        
        </div>
    )
}