import React from 'react';

const AboutPage = () => {
    return (
        <>
            <div className="flex w-full h-screen">

                <div className="w-1/2 flex flex-col justify-center items-start bg-[#fff6e5] p-20">
                    <h1 className="text-4xl font-bold text-[#f97316]">Sobre nós</h1>
                    <p className="text-xl font-bold text-[#1e3a8a] mt-2">Conheça nossa história e missão</p>
                    <p className="text-md text-[#1e3a8a] mt-1">Somos uma plataforma dedicada a fornecer links personalizados para seus perfis online.</p>
                    <div className="w-3/4 mt-5">
                        <p className="text-md text-[#1e3a8a] mb-4">
                            Digital Bio tem como objetivo ajudar indivíduos e empresas a centralizar e organizar seus links de uma maneira eficiente e atraente. Com a nossa plataforma, você pode criar um único link que direciona seus seguidores para todos os seus conteúdos online.
                        </p>
                        <p className="text-md text-[#1e3a8a] mb-4">
                            Nossa missão é simplificar o acesso às suas redes sociais, sites e outras presenças online, tornando mais fácil para seus seguidores encontrarem e interagirem com seu conteúdo. Estamos comprometidos em oferecer uma experiência intuitiva e personalizável para todos os nossos usuários.
                        </p>
                        <p className="text-md text-[#1e3a8a]">
                            Junte-se a nós e descubra como podemos transformar a maneira como você compartilha seus links na internet.
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
                            src="/images/illustrationabout.svg"
                            alt="About Us Illustration"
                            className="w-1/2 h-auto"
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default AboutPage;
