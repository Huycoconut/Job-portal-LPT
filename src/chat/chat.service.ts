import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Chat, MessageDocument } from './schema/chat.schema';

// message.service.ts
@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Chat.name) private messageModel: Model<MessageDocument>,
  ) {}

  async sendMessage(senderId: string, receiverId: string, content: string) {
    return this.messageModel.create({
      sender: senderId,
      receiver: receiverId,
      content,
    });
  }

  async getMessages(userId: string, adminId: string) {
    return this.messageModel
      .find({
        $or: [
          { sender: userId, receiver: adminId },
          { sender: adminId, receiver: userId },
        ],
      })
      .populate('sender', 'name email')
      .populate('receiver', 'name email')
      .sort({ createdAt: 1 });
  }
}
