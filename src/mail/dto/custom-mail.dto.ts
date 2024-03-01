import { IsOptional, IsArray, IsObject, IsEnum, IsString } from 'class-validator';

export class CreateCustomMailDto {
 @IsString()
 message:string;
 @IsString()
 subject:string;
 @IsArray()
 receivers:string[]
 
}

