import API from "../api";

export default async function createUserService({ name, email, username, password }) {
    try {
        const response = await API.post('/users', {
            name,
            email,
            username,
            password,
        });

        const { createdAt } = response.data;

        return {
            name,
            email,
            username,
            createdAt
        };
    } catch (error) {
        console.error("Error creating user:", error);
        
        throw error; 
    }
}