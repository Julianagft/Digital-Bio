class UserService {
    constructor(userRepository) {
      this.userRepository = userRepository;
    }

    create = async (user) => {
      await this.userRepository.create(user);

      return {message:"Usuário cadastrado com sucesso!", user};
    };

    listAll = async () => {
      const users = await this.userRepository.listAll();
      return users;
    };

    findById = async (id) => {
      const usuarioEncontrado = await this.userRepository.findById(id);

      return usuarioEncontrado;
    };

    updateUser = async (id, newData) => {
      const usuarioAtualizado = await  this.userRepository.updateUser(id, newData);

      return {message: "Usuario atualizado com sucesso!", usuarioAtualizado};
    }

    deleteUser = async (id) => {
      
      await this.userRepository.deleteUser(id)

      return {message: "Usuário deletado com sucesso!"}
    }

  }

  export default UserService;
