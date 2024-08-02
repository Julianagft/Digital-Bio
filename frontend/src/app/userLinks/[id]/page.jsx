"use client"
import { useEffect, useState } from "react";
import Link from "next/link";
import LoadingSpinCircle from "@/components/LoadSpinComponent/LoadingSpinCircle";
import normalizeUrl from "../../../utils/normalizeUrl/normalizeUrl.js"
import getLinkByUserIdService from "@/service/links/getLinksByUserIdServicejs/getLinkByUserIdService";
import { Pagination } from "@mui/material";
import getUserByIdService from "@/service/users/getUserById/getUserByIdService.js";
import getInitials from "@/utils/getInitials/getInitials.js";
import API from "@/service/api.js";

export default function userLinksPage({ params }) {
    const userId = params.id;
    const [loading, setLoading] = useState(false);
    const [linkData, setLinkData] = useState([]);
    const [userData, setUserData] = useState({});

    const isPublic = linkData.filter((link) => link.isPublic === true);
    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);
                                                                       
    const avatarInitials = getInitials(userData?.name)
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
    
        const token = localStorage.getItem('token');
        if (token) {
            API.defaults.headers.common['token'] = token;
            setAuthenticated(true);
        } else {
            setAuthenticated(false);
        }
    }, []);



    useEffect(() => {
        const fetchLinks = async () => {
            if (userId) {
                try {
                    const findUserData = await getUserByIdService(userId);
                    const response = await getLinkByUserIdService(userId);
                    setUserData(findUserData);
                    setLinkData(response);
        
                } catch (error) {
                    console.error("Erro ao buscar links do usuário:", error);
                } finally {
                    setLoading(false);
                }
            }
        };
    
        fetchLinks();
    }, [userId]);

    if (loading) return <LoadingSpinCircle />;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentLinks = isPublic.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(linkData.length / itemsPerPage);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
      };

    return (
        <div className="w-full flex flex-col justify-center items-center bg-[#fff6e5]">
            <header className="w-full h-1/5 max-w-4xl flex justify-between items-center bg-[#fff6e5] p-6">
                <h1 className="text-3xl font-bold text-orange-600">Digital Bio</h1>
                {Boolean(authenticated) ? (
                    <nav className="flex gap-4 text-lg font-semibold text-[#1e3a8a]">
                        <Link href={`/userProfile/`}>
                            <p className="hover:underline cursor-pointer">Perfil</p>
                        </Link>
                        <span>|</span>
                        <Link href={`/userLinks/${params.id}`}>
                            <p className="hover:underline cursor-pointer">Meus links</p>
                        </Link>
                    </nav>
                ): ""}             
            </header>

            <div className="w-full h-4/5 max-w-4xl bg-white shadow-md rounded-lg p-6 mt-6 flex flex-col justify-center items-center">
        
                <div className="relative pr-2">
                     <span
                         className={`flex w-[120px] h-[120px] rounded-full justify-center items-center bg-[#FFF6E5] text-[#1e3a8a] text-[50px]`}
                     >
                        <div className={`font-semibold`}>
                           {avatarInitials}
                        </div>
                     </span>
                     <p className="text-gray-600 text-center mt-3">{userData?.username}</p>
                  </div>
                <div className="w-full max-w-md mt-8">
                {currentLinks.length === 0 ? (
                    <p className="text-center text-gray-500 font-semibold">Você ainda não possui nenhum link cadastrado.</p>
                ) : (
                    currentLinks.map((link) => {
                        const formattedUrl = normalizeUrl(link.url);

                        return (                            
                            <a
                            target="_blank"
                            href={formattedUrl}
                            rel="noopener noreferrer"
                            className="hover:cursor-pointer"
                            >
                                <div key={link.id} className="flex justify-center border-[1px] border-gray-400 rounded-md mb-6 py-5 px-4 w-[100%] hover:shadow-lg hover:cursor-pointer">                            
                                    <p className="text-[#1e3a8a] text-center font-medium">{link.title}</p>
                                </div>
                            </a>
                        )
                    })
                )}
                <div className="flex justify-center w-full h-auto">
                    <Pagination
                        sx={{ marginTop: '10px' }}
                        count={totalPages}
                        page={currentPage}
                        onChange={handlePageChange}
                        color="primary"
                    />
                </div>
                </div>
            </div>
            { loading && <LoadingSpinCircle /> }
        </div>
    );
}