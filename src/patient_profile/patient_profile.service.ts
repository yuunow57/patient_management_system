import { ConflictException, Injectable } from '@nestjs/common';
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
        if (!bed) throw new ConflictException('존재하지 않는 침상입니다.');

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
            patient_code: 1,
            patient_name: "김민수",
            gender: 0,
            age: 65,
            birth_date: "890214",
            bed_code: 24,
            nurse: "김연지",
            doctor: "이국종",
            diagnosis: "천식",
            allergy: "어패류",
            significant: "거동이 불편함",
            create_at: "2025-12-30T09:29:16",
            note: null,
            description: null,
        }
    }
}
