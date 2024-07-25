"use client"
import { useState } from "react";
import Link from "next/link";
import { Trash } from "phosphor-react";

export default function userLinksPage() {

    const [newLinkTitle, setNewLinkTitle] = useState("");
    const [newLinkUrl, setNewLinkUrl] = useState("");
    const [linkData, setLinkData] = useState([
        { id: 1, title: "Título do link 1", url: "https://www.exemplo.com.br/link1" },
        { id: 2, title: "Título do link 2", url: "https://www.exemplo.com.br/link2" },
        { id: 3, title: "Título do link 3", url: "https://www.exemplo.com.br/link3" },
    ]);

    return (
        <div className="h-screen w-full flex flex-col items-center bg-[#fff6e5]">
            <header className="w-full max-w-4xl flex justify-between items-center bg-[#fff6e5] p-6">
                <h1 className="text-3xl font-bold text-orange-600">Digital Bio</h1>
                <nav className="flex gap-4 text-lg font-semibold text-[#1e3a8a]">
                    <Link href="/userProfile">
                        <p className="hover:underline cursor-pointer">Perfil</p>
                    </Link>
                    <span>|</span>
                    <Link href="/userLinks">
                        <p className="hover:underline cursor-pointer">Meus links</p>
                    </Link>
                </nav>
            </header>

            <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6 mt-6 flex flex-col items-center">             
                
                <p className="text-gray-500">Clique no botão acima para adicionar um link</p>

                <div className="w-full max-w-md mt-8">
                    {linkData.length === 0 ? (
                        <p>Você ainda não possui nenhum link cadastrado.</p>
                    ) : (
                        linkData.map((link) => (
                            <div
                                key={link.id}
                                className="flex justify-between items-center border border-gray-300 rounded-lg p-4 mb-4 shadow-sm"
                            >
                                <div>
                                    <p className="text-[#1e3a8a] font-semibold">{link.title}</p>
                                    <a
                                        target="_blank"
                                        href={link.url.startsWith('http') ? link.url : `http://${link.url}`}
                                        rel="noopener noreferrer"
                                        className="text-gray-500"
                                    >
                                        {link.url}
                                    </a>
                                </div>
                                <button>
                                    <Trash size={25} className="text-[#1e3a8a]" />
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}