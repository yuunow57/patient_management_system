import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PatientWarningStateEntity } from './patient_warning_entity';
import { EntityManager, Repository } from 'typeorm';
import { CreateWarningDto } from './dto/create-warning.dto';
import { PatientProfileEntity } from 'src/patient_profile/patient_profile.entity';

@Injectable()
export class PatientWarningStateService {
    constructor (
        @InjectRepository(PatientWarningStateEntity)
        private readonly warningRepository: Repository<PatientWarningStateEntity>,

    ) {}

    // POST /patient/warning
    async createWithManager(manager: EntityManager, patient: PatientProfileEntity) {
        const exists = await manager.findOneBy(PatientWarningStateEntity, { patient_code: patient.patient_code });
        if (exists) throw new ConflictException('이미 존재하는 회원입니다.');

        const warning = manager.create(PatientWarningStateEntity, {
            patientProfile: patient,
        });

        await manager.save(PatientWarningStateEntity, warning);

        return warning.warning_state;
    }

    // GET /patient/warning?patient_code={patient_code}
    async findOne(patientCode: number) {
        const patient = await this.warningRepository.findOneBy({ patient_code: patientCode });
        if (!patient) throw new NotFoundException('존재하지 않는 환자상태 입니다.');

        return patient;
    }

}
