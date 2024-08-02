"use client"
import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/authContext';
import loginService from '@/service/login/loginService';
import { CheckCircle, WarningCircle, X } from 'phosphor-react';
import NotificationComponent from '@/components/NotificationComponent/NotificationComponent';
import LoadingSpinCircle from '@/components/LoadSpinComponent/LoadingSpinCircle';

export default function LoginPage () {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loadind, setLoading] = useState(false);


  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '', 
  });


  const router = useRouter();
  const { login } = useAuth();

  const handleClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  async function handleLogin(event) {
    event.preventDefault();
 
    try {

      if (!email || !password) {
        setSnackbar({
          open: true,
          message: (
            <div className="flex items-center gap-2">
              <WarningCircle size={18} weight="bold" className="text-orange-500"/>
              <span>Preencha os campos de email e senha!</span>
            </div>
          ),
        });
        return;
      }
         
      const data = await loginService(email, password);
      login(data);
      setLoading(true);

      setSnackbar({
        open: true,
        message: (
          <div className="flex items-center gap-2">
            <CheckCircle size={18} weight="bold" className="text-green-500"/>
            <span>Login realizado com sucesso!</span>
          </div>
        ),
      });

     router.push(`/userProfile`);

    } catch (error) {
      console.error('Erro ao fazer login:', error);
      const errorMessage = error.response?.data?.message
      setSnackbar({
        open: true,
        message: (
          <div className="flex items-center gap-2">
            <X size={18} weight="bold" className="text-red-500" />
            <span>{errorMessage}</span>
          </div>
        ),
      });
    }
  }

  if (loadind) {
    return <LoadingSpinCircle />;
  }

  return (
    <>
      <div className="flex w-full h-screen">

        <div className="w-1/2 flex flex-col justify-center items-start bg-[#fff6e5] p-20">
          <h1 className="text-4xl font-bold text-[#f97316]">Digital Bio</h1>
          <p className="text-xl font-bold text-[#1e3a8a] mt-2">Sua plataforma de links personalizados</p>
          <p className="text-md text-[#1e3a8a] mt-1">Seja bem-vindo(a)! Faça o login na sua conta.</p>
          <form className="w-3/4 mt-5" onSubmit={handleLogin}>
            <div className="w-3/4 mt-5">
              <input
                className="w-full px-4 py-2 border rounded-md mb-4"
                type="email"
                placeholder="Endereço de email"
                onChange={(e) => setEmail(e.target.value)}

              />              
              <input
                className="w-full px-4 py-2 border rounded-md mb-4"
                type="password"
                placeholder="Senha"
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="flex justify-between items-center mb-4">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  Lembrar-me
                </label>
                <a className="text-[#1e3a8a]" href="#">Esqueceu a senha?</a>
              </div>
              <div className="flex justify-between items-center w-full gap-3">
                <button type='submit' className="bg-[#f97316] text-white py-2 px-12 rounded-md">Entrar</button>
                <Link href="/signIn">
                  <button className="border border-[#f97316] text-[#f97316] py-2 px-5 rounded-md">
                    Cadastre-se
                  </button>
                </Link>
              </div>

              <div className="flex justify-center space-x-4 mt-3">
                <p className="text-center text-[#000000]">Ou entre com</p>
                <a className="text-[#1e3a8a]" href="#">Facebook</a>
                <a className="text-[#1e3a8a]" href="#">LinkedIn</a>
                <a className="text-[#1e3a8a]" href="#">Google</a>
              </div>
            </div>
          </form>


        </div>

        <div className="w-1/2 bg-[#fff] flex flex-col">
          <nav className="flex justify-center space-x-6 text-[#1e3a8a] p-8">
            <Link href="/" className="hover:font-semibold active:underline active:font-bold">Início</Link>
            <Link href="/about" className="hover:font-semibold active:underline active:font-bold" >Sobre nós</Link>
            <Link href="/contact" className="hover:font-semibold active:underline active:font-bold">Contato</Link>
            <Link href="#" className="hover:font-semibold active:underline active:font-bold">Tema</Link>
          </nav>
          <div className="flex flex-grow justify-center items-center">
            <img
              src="/images/illustrationlogin.svg"
              alt="Login Illustration"
              className="w-1/2 h-auto"
            />
          </div>
        </div>
      </div>

      <NotificationComponent
        open={snackbar.open}
        onClose={handleClose}
        message={snackbar.message}
        onClick={handleClose}
      />
    </>
  );
}

