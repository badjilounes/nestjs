import { ApiModelProperty } from "@nestjs/swagger";
import { IsOptional, IsString, IsNumber, IsEmail, IsEnum } from "class-validator";
import { RoleEnum } from "../../common/role.enum";
import { GenderEnum } from "../../common/gender.enum";

export class CreateUserDto {

    @ApiModelProperty()
    @IsEmail()
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

    @ApiModelProperty({enum: Object.keys(RoleEnum).filter((v) => isNaN(+v))})
    @IsEnum(Object.keys(RoleEnum).filter((v) => isNaN(+v)))
    role: string;

    @ApiModelProperty({enum: Object.keys(GenderEnum).filter((v) => isNaN(+v))})
    @IsEnum(Object.keys(GenderEnum).filter((v) => isNaN(+v)))
    gender: string;
}