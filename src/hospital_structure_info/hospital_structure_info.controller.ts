import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { HospitalStructureInfoService } from './hospital_structure_info.service';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';
import { CreateStructureDto } from './dto/create-structure.dto';

@Controller('hospital')
export class HospitalStructureInfoController {
    constructor (
        private readonly structureService: HospitalStructureInfoService,
    ) {}

    @ResponseMessage('병원구조정보 생성 성공')
    @Post('structure')
    async create(@Body() dto: CreateStructureDto) {
        const structure = await this.structureService.create(dto);

        return structure;
    }

    @ResponseMessage('병원구조정보 병동 조회 성공')
    @Get('structure/part')
    async partcheck(@Query('hospital_code') hospitalCode: number) {
        const parts = await this.structureService.partcheck(hospitalCode);

        return parts;
    }

    @ResponseMessage('병원구조정보 병동별 층 조회 성공')
    @Get('structure/floor')
    async floorcheck(@Query('hospital_st_code') hospitalStCode: number) {
        const floors = await this.structureService.floorcheck(hospitalStCode);

        return floors;
    }

}
