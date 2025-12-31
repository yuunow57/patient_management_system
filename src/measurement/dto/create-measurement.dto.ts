import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateMeasurementDto {
    @IsInt()
    @Type(() => Number)
    @IsNotEmpty()
    device_code: number;
    
    @IsInt()
    @Type(() => Number)
    @IsNotEmpty()
    patient_code: number;

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

    @IsString()
    @IsOptional()
    description?: string;
}