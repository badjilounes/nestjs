import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: String })
    firstName = '';

    @Column({ type: String })
    lastName = '';

    @Column({ type: String })
    address = '';

    @Column({ type: String })
    role = 'patient';

    @Column({ type: Number })
    age = 0;

    @Column({ type: String })
    gender = 'male';
}