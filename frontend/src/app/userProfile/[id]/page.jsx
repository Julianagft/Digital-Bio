"use client"
import { useEffect, useState } from "react";
import Link from "next/link";
import { Trash, Pencil } from "phosphor-react";
import { Pagination, } from '@mui/material';
import LoadingSpinCircle from "@/components/LoadSpinComponent/LoadingSpinCircle";
import ModalDeleteLink from "@/components/Modal/ModalDeleteLink";
import ModalCreateLink from "@/components/Modal/ModalCreateLink";
import CardWrapper from "@/components/CardWrapper/CardWrapper";
import normalizeUrl from "@/utils/normalizeUrl/normalizeUrl";
import API from "@/service/api";
import getUserByIdService from "@/service/users/getUserById/getUserById.Service";
import getLinkByUserIdService from "@/service/links/getLinksByUserIdServicejs/getLinkByUserIdService";

export default function userProfile ({params}) {

  const [userData, setUserData] = useState({});
  const [linkData, setLinkData] = useState([]);
  const [linkId, setLinkId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [openDelete, setOpenDelete] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
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


    const handleOpenDeleteLinkModal = (linkId) => {
        setLinkId(linkId);
        setOpenDelete(true)
    }

    const handleCloseDeleteModal = () => {
        setOpenDelete(false);
        setLinkId(null);
    } 

    const handleCloseCreateModal = () => {
        setOpenCreate(false);
        setLinkId(null);
    } 

    const handleDeleteSuccess = async () => {
        try {
            const response = await getLinkByUserIdService(params.id);
            setLinkData(response);
            alert("Link deletado com sucesso!");
            handleCloseDeleteModal(); 
          } catch (error) {
            console.error('Erro ao buscar links após exclusão:', error);
          }
    };

    const handleCreateSuccess = async () => {
        try {
            const response = await getLinkByUserIdService(params.id);
            setLinkData(response);
            handleCloseCreateModal(); 
          } catch (error) {
            console.error('Erro ao buscar links após exclusão:', error);
          }
    };

    if (loading) return <LoadingSpinCircle />;

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
                        
                        <button 
                            className="bg-orange-500 text-white px-8 py-3 rounded-full mb-4"
                            onClick={() => setOpenCreate(true)}
                        >
                            ADICIONAR NOVO LINK
                        </button>
                    </div>


                    <div className="flex flex-col justify-center items-center rounded-md mt-4 shadow-md w-[60vw] p-3 bg-[#fff6e5]">
                        {currentLinks.length === 0 ? (
                            <p>Você ainda não possui nenhum link cadastrado.</p>
                        ) : (
                            currentLinks.map((link) => {
                                const formattedUrl = normalizeUrl(link.url);

                                return (
                                    <div key={link.id} className="flex justify-between border-[1px] border-gray-400 mb-6 
                                    py-5 px-4 w-[60%]">
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
                                            <button >
                                                <Pencil size={25} className="text-[#1e3a8a]" />
                                            </button>
                                            <button onClick={() => handleOpenDeleteLinkModal(link.id)} >
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
                    <ModalCreateLink
                        open={openCreate}
                        setOpen={setOpenCreate}
                        userData={userData}
                        handleClose={handleCloseCreateModal}
                        handleCreateSuccess={handleCreateSuccess}
                    />

                    <ModalDeleteLink
                        open={openDelete}
                        setOpen={setOpenDelete}
                        linkId={linkId}
                        handleClose={handleCloseDeleteModal}
                        handleDeleteSuccess={handleDeleteSuccess}
                    />
            </div>
            
            { loading && <LoadingSpinCircle /> }
            </CardWrapper>    
        </div>
    )
}