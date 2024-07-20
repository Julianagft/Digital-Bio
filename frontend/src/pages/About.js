import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
    return (
        <div className="flex h-screen items-center justify-center bg-white dark:bg-gray-900">
            <div className="max-w-2xl w-full text-center p-8">
                <h1 className="text-4xl font-bold text-blue-900 dark:text-blue-300 mb-4">Sobre Nós</h1>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                    Bem-vindo à nossa plataforma Digital Bio! Somos dedicados a fornecer os melhores
                    serviços de links personalizados para você. Nossa missão é facilitar a sua vida
                    digital com soluções inovadoras e fáceis de usar.
                </p>
                <Link to="/" className="text-blue-900 dark:text-blue-300 underline">
                    Voltar para Home
                </Link>
            </div>
        </div>
    );
};

export default About;
