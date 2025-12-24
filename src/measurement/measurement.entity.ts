import { DeviceStateEntity } from "src/device_state/device_state.entity";
import { PatientProfileEntity } from "src/patient_profile/patient_profile.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('measurement')
export class MeasurementEntity {

    @PrimaryGeneratedColumn({ type: 'bigint' })
    measurement_code: number;

    @Column({ type: 'bigint' })
    device_code: number;

    @ManyToOne(() => DeviceStateEntity, state => state.measurements)
    @JoinColumn({ name: 'device_code' })
    deviceState: DeviceStateEntity;

    @Column({ type: 'bigint' })
    patient_code: number;

    @ManyToOne(() => PatientProfileEntity, patient => patient.measurements)
    @JoinColumn({ name: 'patient_code' })
    patientCode: PatientProfileEntity;

    @Column({ type: 'float', nullable: true })
    temperature: number;

    @Column({ type: 'float', nullable: true })
    body_temperature: number;

    @Column({ type: 'tinyint', nullable: true})
    humidity: number;
    
    @Column({ type: 'float', nullable: true})
    weight: number;
    
    @CreateDateColumn()
    create_at: Date;

    @Column({ nullable: true })
    description: string;
}