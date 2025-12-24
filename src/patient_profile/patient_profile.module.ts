import { Module } from '@nestjs/common';
import { PatientProfileController } from './patient_profile.controller';
import { PatientProfileService } from './patient_profile.service';

@Module({
  controllers: [PatientProfileController],
  providers: [PatientProfileService]
})
export class PatientProfileModule {}
