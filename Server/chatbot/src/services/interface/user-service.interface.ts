

export interface IUserService {
    generateChatbotResponse(userMessage: string): Promise<string | null>;
}