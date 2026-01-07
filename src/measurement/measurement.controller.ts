import { Body, Controller, Post } from '@nestjs/common';
import { MeasurementService } from './measurement.service';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';
import { CreateMeasurementDto } from './dto/create-measurement.dto';

@Controller('measurement/basic')
export class MeasurementController {
    constructor (
        private readonly measureService: MeasurementService,
    ) {}

    @ResponseMessage('측정값 생성 성공')
    @Post()
    async create(@Body() dto: CreateMeasurementDto) {
        return this.measureService.create(dto);
    }

}
