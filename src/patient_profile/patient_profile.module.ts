import { Module } from '@nestjs/common';
import { PatientProfileController } from './patient_profile.controller';
import { PatientProfileService } from './patient_profile.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientProfileEntity } from './patient_profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PatientProfileEntity])],
  controllers: [PatientProfileController],
  providers: [PatientProfileService]
})
export class PatientProfileModule {}
