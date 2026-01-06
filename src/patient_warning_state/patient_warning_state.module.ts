import { Module } from '@nestjs/common';
import { PatientWarningStateController } from './patient_warning_state.controller';
import { PatientWarningStateService } from './patient_warning_state.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientWarningStateEntity } from './patient_warning_entity';
import { PatientProfileEntity } from 'src/patient_profile/patient_profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PatientWarningStateEntity, PatientProfileEntity])],
  controllers: [PatientWarningStateController],
  providers: [PatientWarningStateService],
  exports: [PatientWarningStateService]
})
export class PatientWarningStateModule {}
