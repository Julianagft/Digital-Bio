import { prisma } from "../config/prisma.js";

class LinkRepository {
  create = async (link) => {
    return await prisma.links.create({ data: link });
  };

  listAll = async () => {
    return await prisma.links.findMany();
  };

  findById = async (id) => {
    return await prisma.links.findUnique({ where: { id: parseInt(id) } });
  };

  updateLink = async (id, newData) => {
    const parsedId = parseInt(id);
    console.log("Repository: Updating link with ID:", parsedId); 
    return await prisma.links.update({
      where: { id: parsedId },
      data: newData,
    });
  };

  deleteLink = async (id) => {
    return await prisma.links.delete({ where: { id: parseInt(id) } });
  };
}

export default LinkRepository;
