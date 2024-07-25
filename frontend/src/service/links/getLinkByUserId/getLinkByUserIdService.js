import API from "@/service/api";

export default async function getLinkByUserIdService (userId) {
    try {
        const response = await API.get(`links/users/${userId}`);
        return response.data;
        
    } catch (error) {
        console.error("Error creating user:", error);
        
        throw error; 
    }
}