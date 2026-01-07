import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DevicePositionEntity } from './device_position.entity';
import { CreatePositionDto } from './dto/create-position.dto';
import { Repository } from 'typeorm';

@Injectable()
export class DevicePositionService {
    constructor(
        @InjectRepository(DevicePositionEntity)
        private readonly posRepository: Repository<DevicePositionEntity>,
    ) {}

    // POST /device/position
    async create(dto: CreatePositionDto) {
        const device = await this.posRepository.findOne({ where: { device_code: dto.device_code } });
        if (device) throw new ConflictException('이미 설치된 디바이스 입니다.');

        const newDevice = this.posRepository.create({
            device_code: dto.device_code,
            device_loc_code: dto.device_loc_code,
            description: dto.description
        });

        await this.posRepository.save(newDevice);

        return {
            device_code: Number(newDevice.device_code),
            device_loc_code: Number(newDevice.device_loc_code),
            description: dto.description,
        };
    }
}
