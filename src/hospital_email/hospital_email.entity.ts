import { HospitalStructureInfoEntity } from "src/hospital_structure_info/hospital_structure_info.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn, } from "typeorm";

@Entity('hospital_email')
export class HospitalEmailEntity {

    @PrimaryGeneratedColumn({ type: 'bigint' })
    hospital_code: number;

    @Column()
    hospital_email: string;

    @Column()
    hospital_password: string;

    @Column()
    hospital_name: string;

    @OneToOne(() => HospitalStructureInfoEntity, structure => structure.hospitalEmail)
    @JoinColumn({ name: 'hospital_name' })
    hospitalName: HospitalStructureInfoEntity;

    @CreateDateColumn()
    create_at: Date;

    @UpdateDateColumn()
    update_at: Date;

    @Column({ nullable: true })
    note: string;

    @Column({ nullable: true })
    description: string;
}