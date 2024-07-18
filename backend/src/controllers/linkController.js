class LinkController {
  constructor(linkService) {
    this.linkService = linkService;
  }

  create = async (request, response) => {
    const link = request.body;
    try {
      const result = await this.linkService.create(link);
      return response.status(200).json(result);
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  };

  listAll = async (request, response) => {
    try {
      const links = await this.linkService.listAll();
      return response.json(links);
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  };

  findById = async (request, response) => {
    const id = request.params.id;
    try {
      const link = await this.linkService.findById(id);
      return response.json(link);
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  };

  updateLink = async (request, response) => {
    const id = request.params.id;
    const newData = request.body;
    console.log("Controller: Updating link with ID:", id); // Log do ID
    console.log("Controller: New data:", newData); // Log do corpo da requisição
    try {
      const updatedLink = await this.linkService.updateLink(id, newData);
      return response.json(updatedLink);
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  };

  deleteLink = async (request, response) => {
    const id = request.params.id;
    try {
      await this.linkService.deleteLink(id);
      return response.json({ message: "Link deletado com sucesso!" });
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  };
}

export default LinkController;
