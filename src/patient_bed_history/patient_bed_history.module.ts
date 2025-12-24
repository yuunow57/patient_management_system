import { Module } from '@nestjs/common';
import { PatientBedHistoryController } from './patient_bed_history.controller';
import { PatientBedHistoryService } from './patient_bed_history.service';

@Module({
  controllers: [PatientBedHistoryController],
  providers: [PatientBedHistoryService]
})
export class PatientBedHistoryModule {}
