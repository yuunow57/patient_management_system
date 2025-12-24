import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { DeviceStateModule } from './device_state/device_state.module';
import { MeasurementModule } from './measurement/measurement.module';
import { DevicePositionModule } from './device_position/device_position.module';
import { PatientProfileModule } from './patient_profile/patient_profile.module';
import { PatientBedHistoryModule } from './patient_bed_history/patient_bed_history.module';
import { HospitalStructureInfoModule } from './hospital_structure_info/hospital_structure_info.module';
import { HospitalEmailModule } from './hospital_email/hospital_email.module';
import { DeviceStateEntity } from './device_state/device_state.entity';
import { DevicePositionEntity } from './device_position/device_position.entity';
import { HospitalStructureInfoEntity } from './hospital_structure_info/hospital_structure_info.entity';
import { HospitalEmailEntity } from './hospital_email/hospital_email.entity';
import { PatientProfileEntity } from './patient_profile/patient_profile.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: 
      [
        DeviceStateEntity,
        DevicePositionEntity,
        HospitalStructureInfoEntity,
        HospitalEmailEntity,
        PatientProfileEntity,
      ],
      synchronize: true,
    }),
    DeviceStateModule,
    MeasurementModule,
    DevicePositionModule,
    PatientProfileModule,
    PatientBedHistoryModule,
    HospitalStructureInfoModule,
    HospitalEmailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
