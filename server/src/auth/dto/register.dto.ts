import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsNotEmpty,
} from 'class-validator';

export class RegisterDto {
  @IsEmail({}, { message: 'Email inválido' })
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(8, { message: 'Mínimo 8 caracteres' })
  @MaxLength(16, { message: 'Máximo 16 caracteres' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/, {
    message:
      'La contraseña debe tener mayúscula, minúscula, número y carácter especial',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name: string;
}
