import { HospitalStructureInfoEntity } from "src/hospital_structure_info/hospital_structure_info.entity";
import { PatientProfileEntity } from "src/patient_profile/patient_profile.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('patient_bed_history')
export class PatientBedHistoryEntity {

    @PrimaryGeneratedColumn({ type: 'bigint' })
    history_code: number;

    @Column({ type: 'bigint' })
    patient_code: number;

    @ManyToOne(() => PatientProfileEntity, patient => patient.history)
    @JoinColumn({ name: 'patient_code' })
    patientCode: PatientProfileEntity;

    @Column({ type: 'bigint' })
    from_bed_code: number;

    @ManyToOne(() => HospitalStructureInfoEntity, structure => structure.fromBedHistory)
    @JoinColumn({ name: 'from_bed_code' })
    fromBedCode: HospitalStructureInfoEntity;
    
    @Column({ type: 'bigint' })
    to_bed_code: number;

    @ManyToOne(() => HospitalStructureInfoEntity, structure => structure.toBedHistory)
    @JoinColumn({ name: 'to_bed_code' })
    toBedCode: HospitalStructureInfoEntity;
}