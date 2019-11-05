import { Injectable, NotFoundException, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository, UpdateResult } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private usersRepository: Repository<User>) { }

    async getUsers(): Promise<User[]> {
        return await this.usersRepository.find();
    }

    async getUserById(id: number): Promise<User> {
        const user: User | undefined = await this.usersRepository.findOne({
            where: [{ id }]
        });
        if (!user) {
            throw new NotFoundException('user does not exist');
        }
        return user;
    }

    async getUserByMail(email: string): Promise<User> {
        return await this.usersRepository.findOne({
            where: [{ email }]
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
        await this.usersRepository.delete(user);
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
}
