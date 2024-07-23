export default function signInPage() {



    return (
        <div>
            <div className="flex w-full h-screen">

                <div className="w-1/2 flex flex-col justify-center items-start bg-[#fff6e5] p-20">
                    <h1 className="text-4xl font-bold text-[#f97316]">Cadastre-se</h1>
                    <p className="text-xl font-bold text-[#1e3a8a] mt-2">Preencha seus dados</p>

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

                            <input
                                type="text"
                                placeholder="Nome de usuário"
                                className="w-full px-4 py-2 border rounded-md mb-4"
                            />

                            <input
                                type="password"
                                placeholder="Senha*"
                                className="w-full px-4 py-2 border rounded-md mb-4"
                            />
                            <button className="bg-[#f97316] text-white py-2 px-12 rounded-md">Enviar</button>
                        </form>

                    </div>
                </div>

                <div className="w-1/2 bg-[#fff] flex flex-col">
                    <nav className="flex justify-center space-x-6 text-[#1e3a8a] p-8">
                        <a href="/" className="font-semibold">Início</a>
                        <a href="/about">Sobre nós</a>
                        <a href="/contact">Contato</a>
                        <a href="">Tema</a>
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
        </div>
    );
}