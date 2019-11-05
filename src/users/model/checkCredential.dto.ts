import { ApiModelProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CheckCredentialDto {
    @ApiModelProperty()
    @IsString()
    email: string;

    @ApiModelProperty()
    @IsString()
    password: string;
}