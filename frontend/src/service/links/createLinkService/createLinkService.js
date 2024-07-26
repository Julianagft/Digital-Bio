import API from "@/service/api";

export default async function createLinkService (userId, linkData) {
    try {
        const response = await API.post(`links/${userId}`, linkData);
        console.log("response: ", response.data);
        return response.data;
        
    } catch (error) {
        console.error("Error creating user:", error);
        
        throw error; 
    }
}