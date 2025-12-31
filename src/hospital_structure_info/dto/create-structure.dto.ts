import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateStructureDto {
    @IsInt()
    @Type(() => Number)
    @IsNotEmpty()
    hospital_code: number;

    @IsString()
    @IsNotEmpty()
    category_name: string;

    @IsInt()
    @Type(() => Number)
    @IsNotEmpty()
    level: number;
    
    @IsInt()
    @Type(() => Number)
    @IsOptional()
    parents_code?: number;
    
    @IsInt()
    @Type(() => Number)
    @IsNotEmpty()
    sort_order: number;

    @IsString()
    @IsOptional()
    note?: string

    @IsString()
    @IsOptional()
    description?: string
}