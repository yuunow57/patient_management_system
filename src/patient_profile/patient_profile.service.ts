import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PatientProfileEntity } from './patient_profile.entity';
import { Repository } from 'typeorm';
import { CreateProfileDto } from './dto/create-profile.dto';
import { HospitalStructureInfoEntity } from 'src/hospital_structure_info/hospital_structure_info.entity';

@Injectable()
export class PatientProfileService {
    constructor (
        @InjectRepository(PatientProfileEntity)
        private readonly profileRepository: Repository<PatientProfileEntity>,
        @InjectRepository(HospitalStructureInfoEntity)
        private readonly structureRepository: Repository<HospitalStructureInfoEntity>
    ) {}

    // POST /patient/profile
    async create(dto: CreateProfileDto) {
        const bed = await this.structureRepository.findOneBy ({ hospital_st_code: dto.bed_code });
        if (!bed) throw new NotFoundException('존재하지 않는 침상입니다.');

        const patient = await this.profileRepository.findOne({
            where: {
                bedCode: { hospital_st_code: dto.bed_code },
                is_deleted: 0,
            }
        });
        
        if (patient) throw new ConflictException('사용중인 침상입니다.');

        const newPatient = await this.profileRepository.create({
            patient_name: dto.patient_name,
            gender: dto.gender,
            age: dto.age,
            birth_date: dto.birth_date,
            bedCode: bed,
            nurse: dto.nurse,
            doctor: dto.doctor,
            diagnosis: dto.diagnosis,
            allergy: dto.allergy,
            significant: dto.significant,
        });

        await this.profileRepository.save(newPatient);

        return {
            patient_code: newPatient.patient_code,
            patient_name: newPatient.patient_name,
            gender: newPatient.gender,
            age: newPatient.age,
            birth_date: newPatient.birth_date,
            bed_code: newPatient.bedCode.hospital_st_code,
            nurse: newPatient.nurse,
            doctor: newPatient.doctor,
            diagnosis: newPatient.diagnosis,
            allergy: newPatient.allergy,
            significant: newPatient.significant,
            create_at: newPatient.create_at,
            note: newPatient.note,
            description: newPatient.description,
        }
    }

    //GET /patient/profile?patient_code={patient_code}
    async findOne(patientCode: number) {
        const patient = await this.profileRepository.findOne({ 
            where: { patient_code: patientCode },
            relations: { bedCode: true }
        });
        if (!patient) throw new NotFoundException('존재하지 않는 환자입니다.');

        const bed = await this.structureRepository.findOneBy({ hospital_st_code: patient.bedCode.hospital_st_code });
        if (!bed) throw new NotFoundException('존재하지 않는 침상입니다.');

        return {
            patient_code: patient.patient_code,
            patient_name: patient.patient_name,
            gender: patient.gender,
            age: patient.age,
            birth_date: patient.birth_date,
            bed_code: patient.bedCode.hospital_st_code,
            nurse: patient.nurse,
            doctor: patient.doctor,
            diagnosis: patient.diagnosis,
            allergy: patient.allergy,
            significant: patient.significant,
            note: patient.note,
            description: patient.description,
        }
    }
}
