import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { PatientProfileService } from './patient_profile.service';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';
import { CreateProfileDto } from './dto/create-profile.dto';

@Controller('patient')
export class PatientProfileController {
    constructor (
        private readonly profileService: PatientProfileService,
    ) {}

    @ResponseMessage('환자정보 생성 성공')
    @Post('profile')
    async create(@Body() dto: CreateProfileDto) {
        const patient = await this.profileService.create(dto);

        return patient;
    }

    @ResponseMessage('환자정보 조회 성공')
    @Get('profile')
    async find(@Query('patient_code') patientCode: number) {
        const patient = await this.profileService.findOne(patientCode);

        return patient;
    }
}
