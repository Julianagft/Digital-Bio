import API from "@/service/api";

export default async function getUserByIdService (id) {
    try {
        const response = await API.get(`/users/${id}`);
        console.log(response);
        console.log("id: ", id);

        return await response.json();
        
    } catch (error) {
        console.error("Error creating user:", error);
        
        throw error; 
    }
}