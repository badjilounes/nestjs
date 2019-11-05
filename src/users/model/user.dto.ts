import { ApiModelProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class UserDto {
    @ApiModelProperty()
    @IsNumber()
    id: number;

    @ApiModelProperty()
    @IsString()
    email: string;

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
    @IsString()
    role: string;

    @ApiModelProperty()
    @IsString()
    gender: string;

    @ApiModelProperty({type: UserDto, isArray: true})
    patients: UserDto[];

    @ApiModelProperty({type: UserDto, isArray: true})
    doctors: UserDto[];
}