import { Injectable, NotFoundException, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository, UpdateResult } from 'typeorm';
import { User } from './user.entity';
import { RoleEnum } from '../common/role.enum';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private usersRepository: Repository<User>) { }

    async getUsers(): Promise<User[]> {
        return await this.usersRepository.find({
            relations: ['doctors']
        });
    }

    async getUserById(id: number): Promise<User> {
        const user: User | undefined = await this.usersRepository.findOne({
            where: [{ id }],
            relations: ['doctors']
        });
        
        if (!user) {
            throw new NotFoundException('user does not exist');
        }
        return user;
    }

    async getUserByMail(email: string): Promise<User> {
        return await this.usersRepository.findOne({
            where: [{ email }],
            relations: ['doctors']
        });
    }

    async emailExists(email: string): Promise<boolean> {
        return !!await this.getUserByMail(email);
    }

    async createUser(user: Partial<User>): Promise<User> {
        user.password = await bcrypt.hash(user.password, 10);
        const emailExists = await this.emailExists(user.email);
        if (emailExists) {
            throw new ForbiddenException('email already exists');
        }

        const userCreated: User = this.usersRepository.create(user);
        return this.usersRepository.save(userCreated);
    }

    async checkUserCredentials(email: string, password: string): Promise<User | undefined> {
        const user: User = await this.getUserByMail(email);
        if (!user) {
            throw new UnauthorizedException('email does not exist');
        }
        
        const passwordMatch: boolean = await bcrypt.compare(password, user.password)
        if (!passwordMatch) {
            throw new UnauthorizedException('invalid password');
        }
        return user;
    }

    async updateUser(id: number, user: Partial<User>): Promise<User> {
        if (!!user.password) {
            user.password = await bcrypt.hash(user.password, 10);
        }

        const result: UpdateResult = await this.usersRepository.update(id, user);

        if (result.raw.affectedRows <= 0) {
            throw new NotFoundException('user does not exist');
        }
        return await this.getUserById(id);
    }

    async deleteUser(id: number): Promise<void> {
        const user: User | undefined = await this.getUserById(id);
        if (!user) {
            throw new NotFoundException('user does not exist');
        }
        await this.usersRepository.delete(user.id);
    }

    async getPatients(): Promise<User[]>{
        return await this.usersRepository.find({
            where: [{ role: 'patient' }]
        })
    }

    async getDoctors(): Promise<User[]>{
        return await this.usersRepository.find({
            where: [{ role: 'doctor' }]
        })
    }

    async getPatientFromId(userId: number): Promise<User>{
        const patient: User = await this.getUserById(userId);
        const isUserPatient: boolean = patient.role === RoleEnum.Patient;
        if (!isUserPatient) {
            throw new ForbiddenException('user id does not match patient user.');
        }
        return patient;
    }

    async getDoctorFromId(userId: number): Promise<User>{
        const doctor: User = await this.getUserById(userId);
        const isUserDoctor: boolean = doctor.role === RoleEnum.Doctor;
        if (!isUserDoctor) {
            throw new ForbiddenException('user id does not match doctor user.');
        }
        return doctor;
    }

    private userTokenIdMatchPatientId(userTokenId: number, patientId: number): void {
        if (userTokenId !== patientId) {
            throw new UnauthorizedException('user token id does not match patient id');
        }
    }

    async addDoctorToPatient(userTokenId: number, patientId: number, doctorId: number): Promise<User> {
        this.userTokenIdMatchPatientId(userTokenId, patientId);
        const patient: User = await this.getPatientFromId(patientId);
        const doctor: User = await this.getDoctorFromId(doctorId);
        if (patient.doctors.find(d => d.id === doctor.id)) {
            throw new ForbiddenException('doctor already attached to this patient.');
        }

        patient.doctors = patient.doctors.concat(doctor);
        return await this.usersRepository.save(patient);
    }

    async removeDoctorToPatient(userTokenId: number, patientId: number, doctorId: number): Promise<User> {
        this.userTokenIdMatchPatientId(userTokenId, patientId);
        const patient: User = await this.getPatientFromId(patientId);
        const doctor: User = await this.getDoctorFromId(doctorId);

        if (!patient.doctors.find(d => d.id === doctor.id)) {
            throw new ForbiddenException('doctor not attached to this patient.');
        }

        patient.doctors = patient.doctors.filter(d => d.id !== doctor.id);
        return await this.usersRepository.save(patient);
    }

    async getAllDoctorPatients(doctorTokenId: number): Promise<User[]> {
        await this.getDoctorFromId(doctorTokenId)
        const patients: User[] = await this.getPatients();
        return patients.filter((p) => p.doctors.find(d => d.id === doctorTokenId));
    }
}
