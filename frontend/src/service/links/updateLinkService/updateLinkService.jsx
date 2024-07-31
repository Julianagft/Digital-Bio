import API from "@/service/api";

export default async function updateLinkService (id, linkData) {
    try {
        const response = await API.put(`links/${id}`, linkData);        
        
        return response.data;
        
    } catch (error) {
        console.error("Error creating link:", error);
        throw error;
    }
}