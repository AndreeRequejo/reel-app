import { IsOptional, IsString } from 'class-validator';

export class UpdateRefreshTokenDto {
  @IsOptional()
  @IsString()
  hashedRefreshToken: string | null;
}
