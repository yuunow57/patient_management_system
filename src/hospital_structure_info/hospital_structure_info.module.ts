import { Module } from '@nestjs/common';
import { HospitalStructureInfoController } from './hospital_structure_info.controller';
import { HospitalStructureInfoService } from './hospital_structure_info.service';

@Module({
  controllers: [HospitalStructureInfoController],
  providers: [HospitalStructureInfoService]
})
export class HospitalStructureInfoModule {}
