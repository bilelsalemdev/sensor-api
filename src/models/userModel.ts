import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ type: "varchar", unique: true })
	email!: string;

	@Column({ type: "varchar" })
	password!: string;
}
