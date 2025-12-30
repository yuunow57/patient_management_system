import { Module } from '@nestjs/common';
import { PatientWarningStateController } from './patient_warning_state.controller';
import { PatientWarningStateService } from './patient_warning_state.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientWarningStateEntity } from './patient_warning_entity';

@Module({
  imports: [TypeOrmModule.forFeature([PatientWarningStateEntity])],
  controllers: [PatientWarningStateController],
  providers: [PatientWarningStateService]
})
export class PatientWarningStateModule {}
