 
import { IsNotEmpty, IsString, IsMongoId } from 'class-validator';

export class SendMessageDto {
  @IsMongoId()
  @IsNotEmpty()
  receiverId: string; // id người nhận

  @IsString()
  @IsNotEmpty()
  content: string; // nội dung tin nhắn
}
