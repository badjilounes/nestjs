import { ApiModelProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class CreateUserDto {

    @ApiModelProperty()
    @IsString()
    email: string;

    @ApiModelProperty()
    @IsString()
    @IsOptional()
    password: string;

    @ApiModelProperty()
    @IsString()
    firstName: string;

    @ApiModelProperty()
    @IsString()
    lastName: string;

    @ApiModelProperty()
    @IsString()
    address: string;

    @ApiModelProperty()
    role: string;

    @ApiModelProperty()
    gender: string;
}