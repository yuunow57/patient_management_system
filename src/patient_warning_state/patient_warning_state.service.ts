import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PatientWarningStateEntity } from './patient_warning_entity';
import { Repository } from 'typeorm';
import { CreateWarningDto } from './dto/create-warning.dto';

@Injectable()
export class PatientWarningStateService {
    constructor (
        @InjectRepository(PatientWarningStateEntity)
        private readonly warningRepository: Repository<PatientWarningStateEntity>,
    ) {}

    // POST /patient/warning
    async create(dto: CreateWarningDto) {
        const patient = await this.warningRepository.findOneBy({ patient_code: dto.patient_code });
        if (patient) throw new ConflictException('이미 존재하는 회원입니다.');

        const newPatient = await this.warningRepository.create({
            patient_code: dto.patient_code,
        });

        await this.warningRepository.save(newPatient);

        return {
            patient_code: newPatient.patient_code,
            warning_state: newPatient.warning_state,
            create_at: newPatient.create_at
        }
    }
}
