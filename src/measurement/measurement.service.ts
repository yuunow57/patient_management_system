import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MeasurementEntity } from './measurement.entity';
import { Repository } from 'typeorm';
import { CreateMeasurementDto } from './dto/create-measurement.dto';
import { DataSource } from 'typeorm/browser';
import { DeviceStateEntity } from 'src/device_state/device_state.entity';
import { PatientProfileEntity } from 'src/patient_profile/patient_profile.entity';
import { WeightMeasurementEntity } from 'src/weight_measurement/weight_measurement.entity';

@Injectable()
export class MeasurementService {
    constructor (
        @InjectRepository(MeasurementEntity)
        private readonly measureRepository: Repository<MeasurementEntity>,

        private readonly dataSource: DataSource,
    ) {}

    // POST /measurement/basic
    async create(dto: CreateMeasurementDto) {
        return await this.dataSource.transaction(async manager => {

            const device = await manager.findOne(DeviceStateEntity, {
                where: { device_code: dto.device_code },
                relations: ['position'],
            });
            if (!device) throw new NotFoundException('존재하지 않는 디바이스 입니다.');

            const bedCode = device.position.device_loc_code;
            if (!bedCode) throw new NotFoundException('설치되지 않은 디바이스 입니다.');

            const patient = await manager.findOne(PatientProfileEntity, {
                where: { 
                    bedCode: { hospital_st_code: bedCode },
                    is_deleted: 0,
                }
            });
            if (!patient) throw new NotFoundException('침상에 배정된 환자가 없습니다.');

            const measurement = manager.create(MeasurementEntity, {
                deviceState: device,
                patientCode: patient,
                temperature: dto.temperature,
                body_temperature: dto.body_temperature,
                humidity: dto.humidity,
                description: dto.description,
            });

            const savedMeasurement = await manager.save(measurement);

            let weightEntities: WeightMeasurementEntity[] = [];

            if (dto.weights?.length) {
                weightEntities = dto.weights.map(w =>
                    manager.create(WeightMeasurementEntity, {
                        measurement_code: savedMeasurement.measurement_code,
                        sensor_index: w.sensor_index,
                        value: w.value,
                    })
                );

                await manager.save(WeightMeasurementEntity, weightEntities);
            }

            device.last_seen_at = new Date();
            await manager.save(DeviceStateEntity, device);

            return {
                measurement_code: measurement.measurement_code,
                device_code: measurement.deviceState.device_code,
                patient_code: measurement.patientCode.patient_code,
                temperature: measurement.temperature,
                body_temperature: measurement.body_temperature,
                humidity: measurement.humidity,
                weights: weightEntities.map(w => ({
                    sensor: w.sensor_index,
                    value: w.value,
                })),
                create_at: measurement.create_at,
                description: measurement.description ?? null,
            };
        });
    }
}
