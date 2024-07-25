"use client"
import { useEffect, useState } from "react";
import Link from "next/link";
import { Trash, Pencil } from "phosphor-react";
import ModalComponent from "@/components/Modal/ModalComponent";
import API from "@/service/api";
import getUserByIdService from "@/service/users/getUserById/getUserById.Service";
import getLinkByUserIdService from "@/service/links/getLinkByUserId/getLinkByUserIdService";

export default function userProfile({ params }) {

    const [userData, setUserData] = useState({});
    const [linkData, setLinkData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            API.defaults.headers.common['token'] = token;
            setAuthenticated(true);

        } else {
            setAuthenticated(false);
            console.error('Token ausente');
        }

        const fetchUserData = async () => {
            if (!params.id) {
                console.error('ID do usuário não encontrado');
                setLoading(false);
                return;
            }

            try {
                const response = await getUserByIdService(params.id);
                setUserData(response);

            } catch (error) {
                console.error('Erro ao buscar dados do usuário:', error);
            } finally {
                setLoading(false);
            }
        };

        if (params && params.id) {
            fetchUserData();
        }
    }, [params]);

    useEffect(() => {
        const fetchLinks = async () => {
            try {
                const response = await getLinkByUserIdService(params.id);
                setLinkData(response);

            } catch (error) {
                console.error("Erro ao buscar links do usuário:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchLinks();
    }, [params.id]);

    if (loading) return <p>Carregando...</p>;

    return (
        <div className="h-full p-5">
            <header className="flex justify-between items-center bg-[#fff6e5] p-4">
                <h1 className="text-2xl font-bold text-orange-600">Digital Bio</h1>
                <nav className="flex gap-3 text-lg font-semibold text-[#1e3a8a]">
                    <Link href={`/userProfile`}>
                        <p className="hover:underline cursor-pointer">Perfil</p>
                    </Link>
                    <span>|</span>
                    <Link href="/userLinks">
                        <p className="hover:underline cursor-pointer">Meus links</p>
                    </Link>
                </nav>
            </header>

            <div className="bg-white h-4/5 flex flex-col items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center">
                        {/* Profile Picture Placeholder */}
                        <p className="text-6xl text-gray-400">👤</p>
                    </div>
                    <button className="bg-orange-500 text-white px-4 py-2 rounded">Carregar foto</button>
                    <button className="text-red-500 border border-red-500 px-4 py-2 rounded">Remover foto</button>
                </div>

                <div className="mt-10 w-full max-w-lg">
                    <label className="block text-gray-700">Digite aqui o título do seu perfil</label>
                    <input type="text" className="w-full p-2 border border-gray-300 rounded mt-2" />
                </div>

                <div className="mt-6 w-full max-w-lg">
                    <label className="block text-gray-700">Adicione aqui uma descrição do seu perfil</label>
                    <textarea className="w-full p-2 border border-gray-300 rounded mt-2"></textarea>
                </div>

                <div className="mt-10 flex gap-4">
                    <button className="bg-orange-500 text-white px-6 py-2 rounded">Salvar Alterações</button>
                    <button className="bg-orange-500 text-white px-6 py-2 rounded">Ver Página de Links</button>
                </div>
            </div>
        </div>
    );
}
