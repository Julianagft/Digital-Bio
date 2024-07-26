"use client"
import { useEffect, useState } from "react";
import Link from "next/link";
import { Trash, Pencil } from "phosphor-react";
import { Pagination, } from '@mui/material';
import ModalComponent from "@/components/Modal/ModalComponent";
import Toggle from "@/components/Toggle/Toggle";
import CardWrapper from "@/components/CardWrapper/CardWrapper";
import API from "@/service/api";
import getUserByIdService from "@/service/users/getUserById/getUserById.Service";
import getLinkByUserIdService from "@/service/links/getLinksByUserIdServicejs/getLinkByUserIdService";
import createLinkService from "@/service/links/createLinkService/createLinkService";

export default function userProfile ({params}) {

  const [userData, setUserData] = useState({});
  const [linkData, setLinkData] = useState([]);
  const [newLinkTitle, setNewLinkTitle] = useState("");

  const [newLinkUrl, setNewLinkUrl] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

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

async function handleCreateLink() {
    if (!newLinkTitle || !newLinkUrl) {
        return alert("Título e URL são necessários");    
      }

    try {

        const isActiveFinal = isPublic ? true : isActive;

        const linkData = {
            url: newLinkUrl,
            title: newLinkTitle,
            isActive: isActiveFinal,
            isPublic: isPublic,
            userId: Number(params.id),
          };

        const createdLink  = await createLinkService(params.id, linkData);
        alert("Link criado com sucesso!");
        console.log("createdLink: ", createdLink)
        setLinkData([...linkData, createdLink]); 
        console.log("linkData: ", linkData, "createdLink: ", createdLink);
        setNewLinkUrl('');  
        setNewLinkTitle('');
        setIsActive(false); 
        setIsPublic(false);
        

    } catch (error) {
        console.error("Erro ao criar link:", error);
    }
}

    if (loading) return <p>Carregando...</p>;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentLinks = linkData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(linkData.length / itemsPerPage);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
      };

    return (
        <div className="h-full p-5">
            <header className="flex justify-between h-1/5 items-center bg-[#fff6e5] p-4">
                <h1 className="text-2xl font-bold text-orange-600">Digital Bio</h1>
                <nav className="flex gap-3 text-lg font-semibold text-[#1e3a8a]">
                    <Link href={`/userProfile`}>
                        <p className="hover:underline cursor-pointer">Perfil</p>
                    </Link>
                    <span>|</span>
                    <Link href= {`/userLinks/${params.id}`}>
                        <p className="hover:underline cursor-pointer">Meus links</p>
                    </Link>
                </nav>
            </header> 

            <CardWrapper>

                <div className="bg-white h-4/5 flex flex-col justify-center items-center">
                    <div className="pt-6 text-center mb-4">
                        <h2>Seja bem vindo(a) {userData.name}</h2>
                        <p className="text-gray-400">{userData.username}</p>
                    </div>

                    <div className="w-full flex flex-col justify-center items-center">
                        <div className="w-full max-w-md mb-6">
                            <label className="block text-gray-700 font-semibold mb-2">Digite aqui o título</label>
                            <input
                                type="text"
                                className="w-full p-3 border border-gray-300 rounded"
                                value={newLinkTitle}
                                placeholder="Título do link"
                                onChange={(e) => setNewLinkTitle(e.target.value)}
                            />
                        </div>

                        <div className="w-full max-w-md mb-6">
                            <label className="block text-gray-700 font-semibold mb-2">Digite aqui a URL do link</label>
                            <input
                                type="text"
                                className="w-full p-3 border border-gray-300 rounded"
                                value={newLinkUrl}
                                onChange={(e) => setNewLinkUrl(e.target.value)}
                            />
                        </div>

                        <div className="w-[450px] flex justify-start gap-2 px-2 mb-5">
                            <p className="font-bold">Público ?</p>&nbsp;<p>{isPublic ? "Sim" : "Não"}</p> &nbsp;
                            <Toggle checked={isPublic} onChange={(event) => setIsPublic(event)}/>
                        </div>

                        <button 
                            className="bg-orange-500 text-white px-8 py-3 rounded-full mb-4"
                            onClick={handleCreateLink}
                        >
                            ADICIONAR NOVO LINK
                        </button>
                    </div>


                    <div className="flex flex-col justify-center items-center rounded-md mt-4 shadow-md w-[60vw] p-3 bg-[#fff6e5]">
                        {currentLinks.length === 0 ? (
                            <p>Você ainda não possui nenhum link cadastrado.</p>
                        ) : (
                            currentLinks.map((link) => {
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
                                    </div>
                                )
                            })
                        )}
                        <Pagination
                            sx={{ marginTop: '10px' }}
                            count={totalPages}
                            page={currentPage}
                            onChange={handlePageChange}
                            color="primary"
                        />
                    </div>
            </div>
            <ModalComponent
                open={open}
                handleClose={() => setOpen(false)}
            >

            </ModalComponent>

            </CardWrapper>    
        </div>
    )
}