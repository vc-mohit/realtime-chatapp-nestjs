import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateChatDto {
  @IsString()
  roomId: string;

  @MinLength(8)
  @MaxLength(20)
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  senderEmail: string;

  @MinLength(8)
  @MaxLength(20)
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  receiverEmail: string;

  @IsNotEmpty()
  @IsString()
  message: string;

  @IsString()
  image: string;

  // @IsNotEmpty()
  // @IsString()
  // messages: [];
}

export class CreateRoomDto {
  @MinLength(8)
  @MaxLength(20)
  @IsNotEmpty()
  @IsString()
  userName: string;

  @MinLength(8)
  @MaxLength(20)
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  userEmail: string;

  @MinLength(8)
  @MaxLength(20)
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  adminEmail: string;

  @MinLength(8)
  @MaxLength(20)
  @IsEmail()
  @IsString()
  customerSupportEmail: string;
}
