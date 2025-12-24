import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, OneToMany } from "typeorm";

@Entity('device_state')
export class DeviceStateEntity {
    
    @PrimaryGeneratedColumn({ type: 'bigint' })
    device_code: number;

    @Column({ type: 'enum', enum : ['On', 'Off'], default: 'Off' })
    is_active: 'On' | 'Off';

    @Column()
    last_seen_at: Date;

    @CreateDateColumn()
    create_at: Date;

    @UpdateDateColumn()
    update_at: Date;
}