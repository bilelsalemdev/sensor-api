import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class SensorData {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column("float")
	temperature!: number;

	@Column("float")
	ammonia!: number;

	@Column("float")
	co!: number;

	@Column("float")
	co2!: number;
}
