import { ResponseMessage } from './../decorator/customize';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IUser } from 'src/users/user.interface';
import { ChatService } from './chat.service';
import { RequestWithUser } from './interface/chat_user.interface';
import { SendMessageDto } from './dto/send_message.dto';
import { User } from 'src/decorator/customize';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('send-message')
  @UseGuards()  
  async sendMessage(
    @Req() req: RequestWithUser,
    @Body() messageDto: SendMessageDto,
    @User() user: IUser,
  ) {
    return this.chatService.sendMessage(
      user._id,
      messageDto.receiverId,
      messageDto.content,
    );
  }

  @Get(':id')
  @UseGuards()  
  @ResponseMessage('Tin nhắn đã nhận')
  async getMessages(@Param('id') otherUserId: string, @User() user: IUser) {
    const currentUserId = user._id;
    const messages = await this.chatService.getMessages(
      currentUserId,
      otherUserId,
    );
    console.log('Trò chuyện giữa:', currentUserId, 'và', otherUserId);
    return messages;    
  }
}
