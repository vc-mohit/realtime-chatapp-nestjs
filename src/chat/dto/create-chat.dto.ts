import { IsNotEmpty, IsString } from 'class-validator';

export class CreateChatDto {
  @IsNotEmpty()
  @IsString()
  sender: string;

  @IsNotEmpty()
  @IsString()
  receiver: string;

  @IsNotEmpty()
  @IsString()
  message: string;
}
