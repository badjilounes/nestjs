import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: String })
    email = '';

    @Column({ type: String })
    password = '';

    @Column({ type: String })
    firstName = '';

    @Column({ type: String })
    lastName = '';

    @Column({ type: String })
    address = '';

    @Column({ type: String })
    role = 'patient';

    @Column({ type: String })
    gender = 'male';
}