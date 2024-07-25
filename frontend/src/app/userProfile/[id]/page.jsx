"use client"
import { useEffect, useState } from "react";
import Link from "next/link";
import { Trash, Pencil } from "phosphor-react";
import ModalComponent from "@/components/Modal/ModalComponent";
import API from "@/service/api";
import getUserByIdService from "@/service/users/getUserById/getUserById.Service";
import getLinkByUserIdService from "@/service/links/getLinkByUserId/getLinkByUserIdService";

export default function userProfile ({params}) {

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
            <header className="flex justify-between h-1/5 bg-[#fff6e5]">
                <h1>Digital Bio</h1>
                <nav className="flex gap-3">
                    <Link className="hover:underline" href= {`/userLinks/${userData.id}`}>
                        <p>Meus links</p>
                    </Link>
                    <Link href= "/">
                        <button>LogOut</button>
                    </Link>
                </nav>

            </header>

            <div className="bg-white h-4/5 flex flex-col gap-14">
                <div className="pt-6 text-center">
                    <h2>Seja bem vindo(a) {userData.name}</h2>
                    <p className="text-gray-400">{userData.username}</p>
                </div>
                <div className="flex flex-col justify-center items-center">
                    {linkData.length === 0 ? (
                    <p>Você ainda não possui nenhum link cadastrado.</p>
                    ) : (
                        linkData.map((link) => {
                            const formattedUrl = link.url.startsWith('http') ? link.url : `http://${link.url}`;

                            return (
                                <div key={link.id} className="flex justify-between
                                border-[1px] border-gray-400 mb-6 py-5 px-4 w-[60%]">
                                    <div>
                                        <p className="text-[#1e3a8a] font-medium">{link.title}</p>
                                        <a
                                            target="_blank"
                                            href={formattedUrl}
                                            rel="noopener noreferrer"
                                        >
                                            <p className="text-gray-500">{formattedUrl}</p>
                                        </a>
                                    </div>

                                    <div className="flex justify-center gap-3">
                                        <button onClick={() => setOpen(true)}>
                                        <Pencil size={25} className="text-[#1e3a8a]" />
                                        </button>
                                        <button >
                                        <Trash size={25} className="text-[#1e3a8a]" />
                                        </button>
                                    </div>


                                    <ModalComponent
                                    open={open}
                                    handleClose={() => setOpen(false)}
                                    >

                                    </ModalComponent>
                                
                                </div>

                            )     
                        })
                    )}
                </div>

            </div>
    
        </div>
    )
}