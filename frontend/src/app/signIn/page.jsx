"use client"
import createUserService from "@/service/users/createUser/createUserService";
import getAllUsersService from "@/service/users/getAllUsers/getAllUsersService";
import { useState } from "react";

export default function signInPage() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    
    async function handleCreateNewUser(event) {
        event.preventDefault();
    
        if (!name || !email || !username || !password) {
          return alert("Preencha todos os campos!");
        }
    
        if (password.length < 8 || !/[A-Z]/.test(password) || !/\d/.test(password) || !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
          return alert("A senha deve ter no mínimo 8 caracteres, deve conter pelo menos uma letra maiúscula, um número e um caractere especial (ex: #,*,!...).");
        }
    
        try {

            const users = await getAllUsersService();
            const emailExists = users.some(user => user.email === email);
            const usernameExists = users.some(user => user.username === username);

            if (emailExists) {
                return alert("O email fornecido já está sendo usado por outro usuário.");
            }

            if (usernameExists) {
                return alert("O nome de usuário fornecido já está sendo usado por outro usuário.");
            }

            await createUserService({ name, email, username, password });

            setName('');
            setEmail('');
            setUsername('');
            setPassword('');

            return alert("Usuário criado com sucesso!");

        } catch (error) {
            
            return alert("Erro ao criar usuário, tente novamente mais tarde!" + error);

        }
      }


    return (
        <div>
            <div className="flex w-full h-screen">

                <div className="w-1/2 flex flex-col justify-center items-start bg-[#fff6e5] p-20">
                    <h1 className="text-4xl font-bold text-[#f97316]">Cadastre-se</h1>
                    <p className="text-xl font-bold text-[#1e3a8a] mt-2">Preencha seus dados</p>

                    <div className="w-3/4 mt-5">
                        <form onSubmit={handleCreateNewUser}>
                            <input
                                type="text"
                                placeholder="Nome"
                                className="w-full px-4 py-2 border rounded-md mb-4"
                                onChange={(e) => setName(e.target.value)}
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full px-4 py-2 border rounded-md mb-4"
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <input
                                type="text"
                                placeholder="Nome de usuário"
                                className="w-full px-4 py-2 border rounded-md mb-4"
                                onChange={(e) => setUsername(e.target.value)}
                            />

                            <input
                                type="password"
                                placeholder="Senha*"
                                className="w-full px-4 py-2 border rounded-md mb-4"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button type="submit" className="bg-[#f97316] text-white py-2 px-12 rounded-md">Enviar</button>
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