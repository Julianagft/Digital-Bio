import API from "../../api";

export default async function getAllUsersService () {
    try {
        const response = await API.get('/users');

        return response.data;
        
    } catch (error) {
        console.error("Error creating user:", error);
        
        throw error; 
    }
}