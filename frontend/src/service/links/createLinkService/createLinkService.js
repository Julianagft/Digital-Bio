import API from "@/service/api";

export default async function createLinkService (userId, linkData) {
    try {
        console.log("Sending link data:", linkData);

        const response = await API.post(`links/${userId}`, linkData);

        console.log("Response from API:", response.data);
        console.log("Response status:", response.status);
        console.log("Response headers:", response.headers);        
        
        return response.data;
        
    } catch (error) {
        console.error("Error creating link:", error);
        console.error("Error response:", error.response?.data);
        throw error;
    }
}