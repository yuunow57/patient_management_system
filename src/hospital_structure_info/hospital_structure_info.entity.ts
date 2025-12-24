import { DevicePositionEntity } from "src/device_position/device_position.entity";
import { HospitalEmailEntity } from "src/hospital_email/hospital_email.entity";
import { PatientProfileEntity } from "src/patient_profile/patient_profile.entity";
import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";

@Entity('hospital_structure_info')
export class HospitalStructureInfoEntity {

    @PrimaryGeneratedColumn({ type: 'bigint' })
    code: number;

    @OneToMany(() => DevicePositionEntity, position => position.location)
    devicePositions: DevicePositionEntity[];

    @OneToMany(() => PatientProfileEntity, patient => patient.bedCode)
    patients: PatientProfileEntity[];

    @Column()
    category_name: string;

    @OneToOne(() => HospitalEmailEntity, email => email.hospitalName)
    hospitalEmail: HospitalEmailEntity;

    @Column({ type: 'tinyint' })
    level: number;

    @ManyToOne(() => HospitalStructureInfoEntity, { nullable: true })
    @JoinColumn({ name: 'parents_code' })
    parents?: HospitalStructureInfoEntity;

    @Column({ type: 'tinyint' })
    sort_order: number;

    @CreateDateColumn()
    create_at: Date;

    @UpdateDateColumn()
    update_at: Date;

    @Column({ nullable: true })
    note: string;

    @Column({ nullable: true})
    description: string;
}