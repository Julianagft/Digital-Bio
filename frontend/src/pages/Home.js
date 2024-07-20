import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Checkbox, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { FaSun, FaMoon } from 'react-icons/fa';
import informationImage from '../assets/images/information-cuate.svg';

const { Item } = Menu;

const Home = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <div className={`flex h-screen ${isDarkMode ? 'dark' : ''}`}>
            <div className="w-1/2 bg-yellow-50 dark:bg-gray-800 p-16 flex flex-col justify-center items-center">
                <div className="max-w-md w-full">
                    <h1 className="text-4xl font-bold text-orange-500 dark:text-orange-300 mb-4">Digital Bio</h1>
                    <h2 className="text-2xl font-semibold mb-2 text-blue-900 dark:text-blue-300">Sua plataforma de links personalizados</h2>
                    <p className="text-lg mb-6 text-gray-700 dark:text-gray-300">Seja bem-vindo(a)! Faça o login na sua conta.</p>
                    <Form
                        name="login"
                        layout="vertical"
                        className="space-y-4"
                    >
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: 'Por favor, insira seu usuário!' }]}
                        >
                            <Input
                                className="rounded-md p-3 border border-gray-300 dark:border-gray-600 focus:border-orange-500 focus:ring-orange-500"
                                placeholder="Endereço de email"
                            />
                            <Input.Password
                                className="rounded-md p-3 border border-gray-300 dark:border-gray-600 focus:border-orange-500 focus:ring-orange-500"
                                placeholder="Senha"
                            />
                        </Form.Item>
                        <div className="flex justify-between items-center">
                            <Checkbox className="dark:text-gray-300">Lembrar-me</Checkbox>
                            <a href="#" className="text-blue-900 dark:text-blue-300">Esqueceu a senha?</a>
                        </div>
                        <Form.Item>
                            <div className="flex space-x-4">
                                <Button type="primary" htmlType="submit" className="flex-1 bg-orange-500 hover:bg-orange-600 border-none rounded-md">Entrar</Button>
                                <Button type="default" htmlType="button" className="flex-1 border-2 border-orange-500 text-orange-500 dark:text-orange-300 rounded-md">Cadastre-se</Button>
                            </div>
                        </Form.Item>
                    </Form>
                    <div className="flex flex-col items-center mt-4">
                        <div className="flex space-x-4 mt-2">
                            <p>Ou entre com</p>
                            <a href="#" className="text-blue-900 dark:text-blue-300">Facebook</a>
                            <a href="#" className="text-blue-900 dark:text-blue-300">LinkedIn</a>
                            <a href="#" className="text-blue-900 dark:text-blue-300">Google</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-1/2 bg-white dark:bg-gray-900 p-16 flex flex-col items-center justify-center">
                <Menu mode="horizontal" className="w-full mb-8 flex justify-center border-none bg-transparent dark:text-white">
                    <Item key="item1" className="text-lg font-medium text-blue-900 dark:text-white">
                        <Link to="/">Início</Link>
                    </Item>
                    <Item key="item2" className="text-lg text-gray-700 dark:text-gray-400">
                        <Link to="/about">Sobre nós</Link>
                    </Item>
                    <Item key="item3" className="text-lg text-gray-700 dark:text-gray-400">Contato</Item>
                    <Item key="item4" className="text-lg text-gray-700 dark:text-gray-400">Tema</Item>
                    <Item key="item5" className="text-lg flex items-center">
                        <button
                            onClick={toggleDarkMode}
                            className="text-xl bg-transparent border-none focus:outline-none">
                            {isDarkMode ? <FaSun className="text-yellow-500" /> : <FaMoon className="text-gray-800 dark:text-white" />}
                        </button>
                    </Item>
                </Menu>
                <img src={informationImage} alt="Descrição da imagem" className="max-w-full h-auto mt-4" />
            </div>
        </div>
    );
};

export default Home;
