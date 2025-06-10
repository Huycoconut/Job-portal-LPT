import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
} from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { Server, Socket } from 'socket.io';
import { IUser } from 'src/users/user.interface';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway {
  constructor(private readonly messageService: ChatService) {}

  @WebSocketServer() server: Server;

  @SubscribeMessage('send_message')
  async handleSendMessage(
    @MessageBody()
    data: { user: IUser; receiverId: string; content: string },
    @ConnectedSocket() client: Socket,
  ) {
    const saved = await this.messageService.sendMessage(
      data.user._id,
      data.receiverId,
      data.content,
    );
    
    client.broadcast.emit(`receive_message_${data.receiverId}`, saved);

    return saved;
  }

  @SubscribeMessage('get_messages')
  async handleGetMessages(
    @MessageBody() data: { userId1: string; userId2: string },
  ) {

    const messages = await this.messageService.getMessages(
      data.userId1,
      data.userId2,
    );
    return messages;
  }
}
