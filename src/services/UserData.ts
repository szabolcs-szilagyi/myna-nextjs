import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UserData {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  mobile: string;

  @IsNotEmpty()
  @IsString()
  addressLine1: string;

  @IsString()
  @IsOptional()
  addressLine2?: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  state: string;

  @IsNotEmpty()
  @IsString()
  zip: string;

  @IsNotEmpty()
  @IsString()
  country: string;

  @IsString()
  @IsOptional()
  comment?: string;
}
