class LinkService {
  constructor(linkRepository) {
    this.linkRepository = linkRepository;
  }

  create = async (link) => {
    const createdLink = await this.linkRepository.create(link);
    return { message: "Link criado com sucesso!", createdLink };
  };

  listAll = async () => {
    const links = await this.linkRepository.listAll();
    
    return links;
  };

  listAllByUser = async (userId) => {
    const links = await this.linkRepository.listAllByUser(userId);

    return links;
  };

  findById = async (id) => {
    const link = await this.linkRepository.findById(id);

    return link;
  };

  updateLink = async (id, newData) => {
    const updatedLink = await this.linkRepository.updateLink(id, newData);

    return { message: "Link atualizado com sucesso!", updatedLink };
  };

  deleteLink = async (id) => {
    await this.linkRepository.deleteLink(id);

    return { message: "Link deletado com sucesso!" };
  };
}

export default LinkService;
