import API from "@/service/api";

export default async function createLinkService (userId, linkData) {
    try {
        const response = await API.post(`links/${userId}`, linkData);

        return response.data;
        
    } catch (error) {
        console.error("Error creating link:", error);
        throw error;
    }
}