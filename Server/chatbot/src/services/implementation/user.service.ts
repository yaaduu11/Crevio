import { IUserRepository } from "../../repositories/interface/user-repository.interface";
import { IUserService } from "../interface/user-service.interface";
import * as dialogflow from '@google-cloud/dialogflow'
import { env } from "../../config/env.config";

export class UserService implements IUserService {
    private sessionClient: dialogflow.SessionsClient;
    private sessionPath: string;
    private userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;

        const projectId = env.PROJECT_ID || 'project id'
        const sessionId = Math.random().toString(36).substring(7);
        this.sessionClient = new dialogflow.SessionsClient();
        this.sessionPath = this.sessionClient.projectAgentSessionPath(projectId, sessionId);
    }

    async generateChatbotResponse(userMessage: string): Promise<string | null> {
        try {
           
                const prompt = `Crevio is a platform for freelancers and clients. Users can add projects, apply for projects, chat, and make video calls depending on the subscription. Founder: Yadukrishnan.
User Question: ${userMessage}`;


            const request = {
                session: this.sessionPath,
                queryInput: {
                    text: {
                        text: prompt,
                        languageCode: 'en',
                    },
                },
            };

            const responses = await this.sessionClient.detectIntent(request);
            const result = responses?.[0]?.queryResult;

            if (!result) {
                return "Sorry, I couldn't generate a response.";
            }

            if (result.intent?.displayName === 'Default Fallback Intent') {
                return "Sorry, I didn't understand that.";
            }

            return result.fulfillmentText || "Sorry, I couldn't generate a response.";
        } catch (error: any) {
            console.error("Error generating response from Dialogflow:", error);
            return null;
        }
    }

    async createStripeSession(planId: string, amount: number, userId: string): Promise<string | null> {
        try {
            return null;
        } catch (error) {
            console.error("Error creating Stripe session:", error);
            return null;
        }
    }
}


//  const prompt = `You are a helpful, friendly, and polite chatbot for the Crevio web application. Your goal is to answer user questions about how the Crevio application works, its features, navigation, subscription plans, and information about the founder. You must answer every question engagingly and respectfully.

//                 Here is some information about Crevio that might be helpful (use this context to answer questions):
//                 - Crevio is a user-friendly, lightweight freelancer platform where clients and freelancers connect to get projects done efficiently.
//                 - The name "Crevio" is derived from "Creativity + Vision."
//                 - The founder of Crevio is Yadukrishnan, a software developer. You can explore his portfolio at: https://yadukrishnan.vercel.app
//                 - Clients can create projects either from:
//                     - Their profile → "My Projects" → "Add"
//                     - Or the general "Projects" page → Click "Add Your Project" in the top-right corner.
//                 - Freelancers can view project details and apply by clicking the "Apply" button on any project.
//                 - Clients can view a list of applicants and choose a freelancer from the received applications.
//                 - Once connected, clients and freelancers can:
//                     - Use **Live Chat** (available with any subscription plan).
//                     - Make **Video Calls** if both have a **Standard** or **Extended** subscription.
//                 - Subscription Plans:
//                     - **Basic**, **Standard**, and **Extended** — all plans last for 1 month.
//                 - Messaging history (chat list) is accessible from the **Messaging** section.
//                 - Users can manage their profile (edit info, update picture, etc.) by clicking their profile icon in the top-right corner of the navigation bar.

//                 Important Notes for Responding:
//                 - Always be polite, respectful, and helpful.
//                 - If a user says something inappropriate, rude, or violent, do not respond with hostility. Kindly remind them to follow Crevio’s community guidelines and maintain respectful communication.
//                 - If a user asks a question outside the scope of the Crevio platform (e.g., unrelated topics), politely say:
//                 "I'm trained to assist with questions about the Crevio platform and its features. Please let me know how I can help you with anything related to Crevio!"

//                 Answer each question clearly, concisely, and engagingly. Always maintain a helpful and professional tone.

//                 User Question: ${userMessage}`;
