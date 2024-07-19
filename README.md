
---

# Digital Bio - Sua Plataforma de Links Personalizados

## Descrição

**Digital Bio** é como o seu cartão de visita digital! Perfeito para quem deseja compartilhar múltiplos links em um único lugar de forma fácil e organizada. Similar a ferramentas como Linktree, nossa plataforma permite que você crie uma bio personalizada com todos os seus links importantes.

## Funcionalidades Principais

- **Cadastro de Usuário:** Registre-se com seu nome, e-mail e escolha um nome de usuário único.
- **Autenticação de Usuário:** Acesse sua conta facilmente com e-mail e senha.
- **Perfil Personalizado:** Cada usuário tem seu próprio perfil onde pode gerenciar seus links.
- **Gerenciamento de Links:** Adicione, edite, inative e marque links como públicos para visualização na sua bio.
- **Excluir Links (Delete Lógico):** Remova permanentemente links inativos do sistema.
- **Publicação Completa da Aplicação:** Implementação e publicação completa da aplicação, abrangendo do banco de dados ao frontend.

## Funcionalidades Sugeridas

- **Temas Personalizáveis:** Escolha entre uma variedade de temas para personalizar a aparência da sua bio.
- **Integração com Redes Sociais:** Conecte-se e compartilhe seus perfis de redes sociais de forma direta e eficiente.
- **Responsividade:** Garanta que a plataforma seja completamente responsiva, oferecendo uma experiência consistente em dispositivos móveis, tablets e desktops.
- **Swagger:** Integração do Swagger para documentação e teste interativo da API da plataforma.
- **Resetar Senha por E-mail:** Opção para resetar a senha através do envio de um token de segurança para o e-mail do usuário.

## Regras de Negócio

- **Nome de Usuário Único:** Cada nome de usuário deve ser único na plataforma.
- **E-mail Único:** Cada endereço de e-mail deve ser único e só pode estar associado a uma conta.
- **Visibilidade de Links na Bio:** Para que um link seja exibido na bio do usuário, ele deve estar marcado como público e não inativo.
- **Segurança de Dados:** Implementamos medidas de segurança, incluindo hash de senha (Bcrypt), para proteger as informações dos usuários contra acesso não autorizado ou uso indevido.

## Tecnologias Utilizadas

### Obrigatórias

- **Frontend:** React.js
- **Backend:** Node.js com Express.js e JWT (JSON Web Tokens)
- **Banco de Dados:** PostgreSQL
- **Controle de Versão:** Git

### Sugeridas

- **Frontend:** Ant Design, Tailwind ou Bootstrap para estilização e componentes
- **Backend:** Prisma ORM para interação com o banco de dados Postgres

## Como Executar o Projeto

### Pré-requisitos

- Node.js
- npm ou yarn
- PostgreSQL
- Git

### Configuração do Ambiente de Desenvolvimento

1. **Clone o repositório:**
   ```sh
   git clone https://github.com/SEU_USUARIO/projeto-final-fs24.git
   cd projeto-final-fs24
   ```

2. **Configuração do Backend:**
   ```sh
   cd backend
   npm install
   npx prisma generate
   npx prisma migrate dev --name init
   ```

3. **Configuração do Frontend:**
   ```sh
   cd ../frontend
   npm install
   npm start
   ```

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do diretório `backend` com as seguintes variáveis:

```
DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco"
JWT_SECRET="sua_chave_secreta"
```

Substitua `usuario`, `senha`, `nome_do_banco` e `sua_chave_secreta` pelos valores apropriados.

## Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas alterações (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

---

frontend:projeto-final-fs24.vercel.app
backend: https://projeto-final-fs24.onrender.com/
