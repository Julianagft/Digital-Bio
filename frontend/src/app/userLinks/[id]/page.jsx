"use client"
import { useEffect, useState } from "react";
import Link from "next/link";
import LoadingSpinCircle from "@/components/LoadSpinComponent/LoadingSpinCircle";
import normalizeUrl from "../../../utils/normalizeUrl/normalizeUrl.js"
import getLinkByUserIdService from "@/service/links/getLinksByUserIdServicejs/getLinkByUserIdService";
import { Pagination } from "@mui/material";

export default function userLinksPage({ params }) {
    const [loading, setLoading] = useState(false);

    const [linkData, setLinkData] = useState([]);
    const isPublic = linkData.filter((link) => link.isPublic === true);

    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);

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
                <nav className="flex gap-4 text-lg font-semibold text-[#1e3a8a]">
                    <Link href={`/userProfile/${params.id}`}>
                        <p className="hover:underline cursor-pointer">Perfil</p>
                    </Link>
                    <span>|</span>
                    <Link href={`/userLinks/${params.id}`}>
                        <p className="hover:underline cursor-pointer">Meus links</p>
                    </Link>
                </nav>
            </header>

            <div className="w-full h-4/5 max-w-4xl bg-white shadow-md rounded-lg p-6 mt-6 flex flex-col justify-center items-center">
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