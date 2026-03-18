import {
  IsEmail,
  IsString,
  IsNotEmpty,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'Email inválido' })
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'Mínimo 8 caracteres' })
  @MaxLength(16, { message: 'Máximo 16 caracteres' })
  password: string;
}
