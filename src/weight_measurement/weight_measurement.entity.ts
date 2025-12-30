import { MeasurementEntity } from "src/measurement/measurement.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";

@Entity('weight_measurement')
export class WeightMeasurementEntity {

    @PrimaryColumn({ type: 'bigint' })
    measurement_code: number;

    @OneToOne(() => MeasurementEntity, measure => measure.weights)
    @JoinColumn({ name: 'measurement_code' })
    measurementCode: MeasurementEntity;

    @Column({ type: 'bigint', nullable: true })
    weight1: number;
    
    @Column({ type: 'bigint', nullable: true })
    weight2: number;

    @Column({ type: 'bigint', nullable: true })
    weight3: number;

    @Column({ type: 'bigint', nullable: true })
    weight4: number;

    @Column({ nullable: true})
    description: string;
}