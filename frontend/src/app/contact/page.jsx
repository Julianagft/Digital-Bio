import React from 'react';

const ContactPage = () => {
    return (
        <>
            <div className="flex w-full h-screen">

                <div className="w-1/2 flex flex-col justify-center items-start bg-[#fff6e5] p-20">
                    <h1 className="text-4xl font-bold text-[#f97316]">Contato</h1>
                    <p className="text-xl font-bold text-[#1e3a8a] mt-2">Fale conosco</p>
                    <p className="text-md text-[#1e3a8a] mt-1">Estamos aqui para ajudar e responder a qualquer pergunta que você possa ter.</p>
                    <div className="w-3/4 mt-5">
                        <form>
                            <input
                                type="text"
                                placeholder="Nome"
                                className="w-full px-4 py-2 border rounded-md mb-4"
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full px-4 py-2 border rounded-md mb-4"
                            />
                            <textarea
                                placeholder="Sua mensagem"
                                className="w-full px-4 py-2 border rounded-md mb-4"
                                rows="5"
                            />
                            <button className="bg-[#f97316] text-white py-2 px-12 rounded-md">Enviar</button>
                        </form>
                        <p className="text-md text-[#1e3a8a] mt-4">
                            Ou nos envie um email para: <a href="mailto:contato@digitalbio.com" className="text-[#f97316]">contato@digitalbio.com</a>
                        </p>
                    </div>
                </div>

                <div className="w-1/2 bg-[#fff] flex flex-col">
                    <nav className="flex justify-center space-x-6 text-[#1e3a8a] p-8">
                        <a href="/" className="font-semibold">Início</a>
                        <a href="/about">Sobre nós</a>
                        <a href="/contact">Contato</a>
                        <a href="#">Tema</a>
                    </nav>
                    <div className="flex flex-grow justify-center items-center">
                        <img
                            src="/images/illustationcontact.svg"
                            alt="Contact Us Illustration"
                            className="w-1/2 h-auto"
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default ContactPage;
