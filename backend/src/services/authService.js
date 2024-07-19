class authService {
    constructor (authRepository) {
        this.authRepository = authRepository;
    }

    authenticateUser = async (email, password) => {
        const authResult = await this.authRepository.authenticateUser(email, password);

        if (!authResult) {
            throw new Error("Autenticação falhou. Usuário não encontrado ou senha incorreta.");
        }

        return {
            message: "Usuário autenticado com sucesso!",
            user: authResult.user,
            token: authResult.auth 
        };
    }
}

export default authService;