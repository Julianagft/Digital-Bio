import { prisma } from "../config/prisma.js";
import { pool } from "../config/db.js";

class UserRepository {
  
    async checkEmailExistence(email) {
        const query = {
          text: 'SELECT * FROM users WHERE email = $1',
          values: [email]
        };
        const result = await pool.query(query);
        return result.rows.length > 0;
      }

    async checkUserNameExistente(userName) {
        const query = {
          text: 'SELECT * FROM users WHERE userName = $1',
          values: [userName]
        };
        const result = await pool.query(query);
        return result.rows.length > 0;
      }
      
      create = async (user) => {
    
        if (!user.name || !user.email || !user.userName || !user.password) {  
          throw new Error('O usuário deve ter um nome, um email e uma senha.');
        }
    
        if (user.password.length < 8 || !/[A-Z]/.test(user.password)) {
          throw new Error('A senha deve ter no mínimo 8 caracteres e deve conter pelo menos uma letra maiúscula.');
        }
      
        const emailExistente = await this.checkEmailExistence(user.email);
          
        if (emailExistente) {
          throw new Error('O email fornecido já está sendo usado por outro usuário.');
        }

        if (checkUserNameExistente) {
          throw new Error('Nome de usuário já está sendo utilizado.');
        }

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
  
    updateUser = async (id, newData, currentUser) => {
      const user = await this.collection.findUnique({
        where: { id: Number(id) }
      });
  
      if (!user) {
        throw new Error('Usuário não encontrado!');
      }
  
      try {
        const updatedUser = await this.collection.update({
          where: { id: Number(id) },
          data: newData
        });
        return updatedUser;
      } catch (error) {
        throw new Error('Erro ao atualizar usuário: ' + error.message);
      }
    };
  
    deleteUser = async (id) => {
      const user = await this.collection.findUnique({
        where: { id: Number(id) }
      });
  
      if (!user) {
        throw new Error('Usuário não encontrado!');
      }
  
      try {
        await this.collection.delete({
          where: { id: Number(id) }
        });
        return { message: 'Usuário deletado com sucesso!' };
      } catch (error) {
        throw new Error('Erro ao deletar usuário: ' + error.message);
      }
    };
  }
  
  export default UserRepository;