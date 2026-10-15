import directMessageRepository from "../repositories/directMessage.repository.js";
import ServerError from "../helpers/error.helper.js";
import userRepository from "../repositories/user.repository.js";

class DirectMessageService {
    async createDirectMessage(id_emisor, id_receptor, message) {
        if (!id_emisor || !id_receptor || !message) {
            throw new ServerError("Sender ID, receiver ID, and message are required", 400);
        }
        const exitUser = await userRepository.getById(id_receptor);
        if (!exitUser) {
            throw new ServerError("User not found", 404);
        }
        const exitUser2 = await userRepository.getById(id_emisor);
        if (!exitUser2) {
            throw new ServerError("User not found", 404);
        }
        const directMessage = await directMessageRepository.create(message, id_emisor, id_receptor);
        return directMessage;
    }

    async getConversationsByUserId(id_user) {
        if (!id_user) {
            throw new ServerError("User ID is required", 400);
        }
        const userExist = await userRepository.getById(id_user);
        if (!userExist) {
            throw new ServerError("User not found", 404);
        }
        const conversations = await directMessageRepository.getConversationsByUserId(id_user);
        return conversations;
    }

    async editMessageContent(messageId, newMessageContent) {
        if (!messageId || !newMessageContent) {
            throw new ServerError("Message ID and new message content are required", 400);
        }
        const directMessage = await directMessageRepository.editMessageContent(messageId, newMessageContent);
        if (!directMessage) {
            throw new ServerError("Message not found", 404);
        }
        return directMessage;
    }

    async getMessagesByReceiverId(sender_id, receiver_id) {
        if (!sender_id || !receiver_id) {
            throw new ServerError("Sender ID and receiver ID are required", 400);
        }
        const messages = await directMessageRepository.getMessagesByReceiverId(sender_id, receiver_id);
        return messages;
    }


}




const directMessageService = new DirectMessageService();
export default directMessageService;
