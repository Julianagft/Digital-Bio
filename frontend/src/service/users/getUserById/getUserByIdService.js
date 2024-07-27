import API from "@/service/api";

export default async function getUserByIdService (id) {
    try {
        const response = await API.get(`/users/${id}`);
        
        return response.data;
        
    } catch (error) {
        console.error("Error creating user:", error);
        
        throw error; 
    }
}