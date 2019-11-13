import { ApiModelProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

/*
    Token DTO 

    @field access_token qui représente le token encrypé par JWT 
    @type string
*/
export class TokenDto {
    @ApiModelProperty()
    @IsString()
    access_token: string;
}