class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  create = async (request, response) => {
    const user = request.body;

    const result = await this.userService.create(user);

    if (result.error) {
      return response.status(result.statusCode).json({ error: result.error });
    }

    return response.status(200).json(user);
  };

  listAll = async (request, response) => {
    return response.json(await this.userService.listAll());
  };

  findById = async (request, response) => {
    const id = request.params.id;
    const usuarioEncontrado = await this.userService.findById(id);
    return response.json(usuarioEncontrado);
  };

  updateUser = async (request, response) => {
    const id = request.params.id;
    const newData = request.body;
    const usuarioAtualizado = await this.userService.updateUser(id, newData);
    return response.json(usuarioAtualizado);
  };

  deleteUser = async (request, response) => {
    const id = request.params.id;
    await this.userService.deleteUser(id);
    return response.json({ message: "Usuário deletado com sucesso!" });
  };
}

export default UserController;
