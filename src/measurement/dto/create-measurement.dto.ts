import { Type } from "class-transformer";
import { IsArray, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { WeightValueDto } from "./create-weight.dto";

export class CreateMeasurementDto {
    @IsInt()
    @Type(() => Number)
    @IsNotEmpty()
    device_code: number;

    @IsNumber()
    @Type(() => Number)
    @IsOptional()
    temperature?: number;

    @IsNumber()
    @Type(() => Number)
    @IsOptional()
    body_temperature?: number;

    @IsInt()
    @Type(() => Number)
    @IsOptional()
    humidity?: number;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => WeightValueDto)
    @IsOptional()
    weights?: WeightValueDto[];

    @IsString()
    @IsOptional()
    description?: string;
}