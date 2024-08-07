
  import { prisma } from "../config/prisma.js";
  import bcrypt from 'bcrypt';

  class UserRepository {
      async checkExistentEmail(email) {
        const result = await prisma.users.findUnique({
          where: {
            email: email
          }
        });

        return result;
      }

      async checkExistentUsername(username) {
        const result = await prisma.users.findUnique({
          where: {
            username: username
          }
        });

        return result;
      }
        
      create = async (user) => {
          if (!user.name || !user.email || !user.username || !user.password ) {  
            return { error: 'O usuário deve ter um nome, um email, um nome de usuário e uma senha.' };
          }
      
          if (user.password.length < 8 || !/[A-Z]/.test(user.password) || !/\d/.test(user.password) || !/[!@#$%^&*(),.?":{}|<>]/.test(user.password)) {
            return { error: 'A senha deve ter no mínimo 8 caracteres, deve conter pelo menos uma letra maiúscula, um número e um caractere especial (ex: #,*,!...).' };
          }
        
          const ExistentEmail = await this.checkExistentEmail(user.email);
          const ExistentUsername = await this.checkExistentUsername(user.username);
            
          if (ExistentEmail) {
            return { error: 'O email fornecido já está sendo usado por outro usuário.' };
          }

          if (ExistentUsername) {
            return { error: 'Nome de usuário já está sendo utilizado.' };
          }

          user.password = await bcrypt.hash(user.password, 10); 

          const resp = await prisma.users.create({
            data: user,
          });

          return resp;
      };
      
      listAll = async () => {
          const resp = await prisma.users.findMany();
          try {
            return resp;
          } catch (error) {
            console.error('Erro ao obter usuários:', error.message);
            throw error;
          }
      };
      
      findById = async (id) => {
          try {
            const resp = await prisma.users.findUnique({
              where: {
                id: Number(id),
              }
            });
      
            return resp;
          } catch (error) {
            console.error('Erro ao obter usuário pelo ID:', error.message);
            throw error;
          }
      };
    
      updateUser = async (id, newData) => {
        const user = await prisma.users.findUnique({
          where: { id: Number(id) },
        });
      
        if (!user) {
          throw new Error("Usuário não encontrado!");
        }

        if (newData.password) {
          try {
              newData.password = await bcrypt.hash(newData.password, 10);
          } catch (error) {
              throw new Error("Erro ao criptografar a senha: " + error.message);
          }
      }
    
        try {
          const updatedUser = await prisma.users.update({
            where: { id: Number(id) },
            data: newData
          });

          return updatedUser;
        } catch (error) {
          throw new Error("Erro ao atualizar usuário: ", error.message);
        }
      };

      deleteUser = async (id) => {
        const user = await prisma.users.findUnique({
          where: { id: Number(id) }
        });
    
        if (!user) {
          throw new Error("Usuário não encontrado!");
        }
    
        try {
          await prisma.users.delete({
            where: { id: Number(id) }
          });

          return { message: 'Usuário deletado com sucesso!' };
        } catch (error) {
          throw new Error("Erro ao deletar usuário: ", error.message);
        }
      };
  }

  export default UserRepository;