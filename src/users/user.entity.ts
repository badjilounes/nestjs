import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { IsNumber, IsString } from 'class-validator';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    @IsNumber()
    id: number;

    @Column({ type: String })
    @IsString()
    email = '';

    @Column({ type: String })
    @IsString()
    password = '';

    @Column({ type: String })
    @IsString()
    firstName = '';

    @Column({ type: String })
    @IsString()
    lastName = '';

    @Column({ type: String })
    @IsString()
    address = '';

    @Column({ type: String })
    @IsString()
    role = 'patient';

    @Column({ type: String })
    @IsString()
    gender = 'male';

    @OneToMany(type => User, user => user.doctors)
    doctors: User[];

    @OneToMany(type => User, user => user.patients)
    patients: User[];
}