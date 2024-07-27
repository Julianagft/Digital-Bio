import API from "@/service/api";

export default async function deleteLinkService (id) {
    try {
        const response = await API.delete(`links/${id}`);

        return response.data;
        
    } catch (error) {
        console.error("Erro ao deletar link:", error);
        
        throw error; 
    }
}