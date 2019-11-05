import { ApiModelProperty } from "@nestjs/swagger";
import { IsString, IsOptional } from "class-validator";

export class UpdateUserDto {
    @ApiModelProperty()
    @IsString()
    @IsOptional()
    email?: string;

    @ApiModelProperty()
    @IsString()
    @IsOptional()
    password?: string;

    @ApiModelProperty()
    @IsString()
    @IsOptional()
    firstName?: string;

    @ApiModelProperty()
    @IsString()
    @IsOptional()
    lastName?: string;

    @ApiModelProperty()
    @IsString()
    @IsOptional()
    address?: string;
}