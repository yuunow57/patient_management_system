import { HospitalStructureInfoEntity } from "src/hospital_structure_info/hospital_structure_info.entity";
import { MeasurementEntity } from "src/measurement/measurement.entity";
import { PatientBedHistoryEntity } from "src/patient_bed_history/patient_bed_history.entity";
import { PatientWarningStateEntity } from "src/patient_warning_state/patient_warning_entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('patient_profile')
export class PatientProfileEntity {

    @PrimaryGeneratedColumn({ type: 'bigint' })
    patient_code: number;

    @OneToMany(() => MeasurementEntity, measure => measure.patientCode)
    measurements: MeasurementEntity[];

    @OneToMany(() => PatientBedHistoryEntity, history => history.patientCode)
    history: PatientBedHistoryEntity[];

    @OneToOne(() => PatientWarningStateEntity, warning => warning.patientProfile)
    warningState: PatientWarningStateEntity;

    @Column()
    patient_name: string;

    @Column({ type: 'tinyint' })
    gender: number;

    @Column({ nullable: true })
    birth_date: string;

    @Column({ type: 'bigint' })
    bed_code: number;

    @ManyToOne(() => HospitalStructureInfoEntity, structure => structure.patients)
    @JoinColumn({ name: 'bed_code' })
    bedCode: HospitalStructureInfoEntity;

    @Column()
    nurse: string;

    @Column()
    doctor: string;

    @Column()
    diagnosis: string;

    @Column({ nullable: true })
    allergy: string;

    @Column({ nullable: true })
    significant: string;

    @CreateDateColumn()
    create_at: Date;

    @UpdateDateColumn()
    update_at: Date;

    @Column({ nullable: true })
    note: string;

    @Column({ nullable: true })
    description: string;
}