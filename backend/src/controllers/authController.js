class authController {
    constructor(authService) {
        this.authService = authService;
    }

    authenticateUser = async (request, response) => {
        const { email, token } = request.body;

        try {
            const result = await this.authService.authenticateUser(email, token);

            if (result.error) {
                return response.status(400).json({ message: result.error });
            }

            return response.status(200).json(result);
            
        } catch (error) {
            return response.status(500).json({ message: error.message });
        }

        
    }   
}

export default authController;