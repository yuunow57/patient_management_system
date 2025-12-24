import { Module } from '@nestjs/common';
import { HospitalEmailController } from './hospital_email.controller';
import { HospitalEmailService } from './hospital_email.service';

@Module({
  controllers: [HospitalEmailController],
  providers: [HospitalEmailService]
})
export class HospitalEmailModule {}
