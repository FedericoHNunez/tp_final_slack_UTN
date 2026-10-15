import mongoose from 'mongoose';
import BaseRepository from './base.repository.js';
import directMessageModel from '../models/directMessage.model.js';

class DirectMessageRepository extends BaseRepository {
    constructor() {
        super(directMessageModel, ['content']);
    }

    async create(content, id_sender, id_receiver) {
        const message = await this.model
            .create({
                content,
                id_receiver,
                id_sender
            });
        return message;
    }

    async getConversationsByUserId(id_user) {
        const userObjectId = new mongoose.Types.ObjectId(id_user);

        return await this.model.aggregate([
            // 1. Filtrar los mensajes donde el usuario es emisor o receptor
            {
                $match: {
                    $or: [
                        { id_sender: userObjectId },
                        { id_receiver: userObjectId }
                    ]
                }
            },
            // 2. Ordenar del más nuevo al más viejo
            {
                $sort: { createdAt: -1 }
            },
            // 3. Obtener el id del otro usuario (contacto)
            {
                $addFields: {
                    contactId: {
                        $cond: {
                            if: { $eq: ['$id_sender', userObjectId] },
                            then: '$id_receiver',
                            else: '$id_sender'
                        }
                    }
                }
            },
            // 4. Agrupar por contacto y tomar el primer mensaje (el más reciente)
            {
                $group: {
                    _id: '$contactId',
                    lastMessage: { $first: '$content' },
                    lastMessageAt: { $first: '$createdAt' }
                }
            },
            // 5. Poblar información del usuario desde la colección 'users'
            {
                $lookup: {
                    from: 'users',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'contact'
                }
            },
            // 6. Desarmar el array de contacto
            {
                $unwind: '$contact'
            },
            // 7. Formatear la respuesta limpia
            {
                $project: {
                    _id: 0,
                    contact: {
                        _id: '$contact._id',
                        userName: '$contact.userName',
                        email: '$contact.email'
                    },
                    lastMessage: 1,
                    lastMessageAt: 1
                }
            },
            // 8. Ordenar las conversaciones por fecha del último mensaje
            {
                $sort: { lastMessageAt: -1 }
            }
        ]);
    }

    async getMessagesByReceiverId(sender_id, receiver_id) {
        return await this.model
            .find({
                $or: [
                    { id_sender: sender_id, id_receiver: receiver_id },
                    { id_sender: receiver_id, id_receiver: sender_id }
                ]
            })
            .sort({ createdAt: 1 })
            .populate('id_receiver', 'userName')
            .populate('id_sender', 'userName');
    }

    async editMessageContent(messageId, newMessageContent) {
        return await this.model.findByIdAndUpdate(
            messageId,
            {
                content: newMessageContent
            },
            { returnDocument: 'after' }
        );
    }
}


const directMessageRepository = new DirectMessageRepository();
export default directMessageRepository;
