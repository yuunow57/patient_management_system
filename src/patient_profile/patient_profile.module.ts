import { Module } from '@nestjs/common';
import { PatientProfileController } from './patient_profile.controller';
import { PatientProfileService } from './patient_profile.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientProfileEntity } from './patient_profile.entity';
import { HospitalStructureInfoEntity } from 'src/hospital_structure_info/hospital_structure_info.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PatientProfileEntity, HospitalStructureInfoEntity])],
  controllers: [PatientProfileController],
  providers: [PatientProfileService]
})
export class PatientProfileModule {}
