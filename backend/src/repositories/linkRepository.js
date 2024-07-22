import { prisma } from "../config/prisma.js";

class LinkRepository {
  create = async (link) => {
    if (!link.url || !link.title || link.isActive === undefined || link.isPublic === undefined || !link.userId ) {  
      throw new Error("O link deve ter uma URL válida, um título, um status ativo, um status público, e um userId.");
    }
    
    return await prisma.links.create({
      data: {
        url: link.url,
        title: link.title,
        isActive: link.isActive,
        isPublic: link.isPublic,
        userId: link.userId
      }
    });
  };

  listAll = async () => {
    return await prisma.links.findMany();
  };

  listAllByUser = async (userId) => {
    return await prisma.links.findMany({
      where: {
        userId: parseInt(userId),
      },
    });
  };

  findById = async (id) => {
    return await prisma.links.findUnique({ where: { id: parseInt(id) } });
  };

  updateLink = async (id, newData) => {
    const parsedId = parseInt(id);
    console.log("Repository: Updating link with ID:", parsedId);

    return await prisma.links.update({
      where: { id: parsedId },
      data: {
        url: newData.url,
        title: newData.title,
        isActive: newData.isActive,
        isPublic: newData.isPublic,
        users: {
          connect: { id: newData.userId }
        }
      },
    });
  };

  deleteLink = async (id) => {
    return await prisma.links.delete({ where: { id: parseInt(id) } });
  };
}

export default LinkRepository;
