import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private usersRepository: Repository<User>) { }

    async getUsers(): Promise<User[]> {
        return this.usersRepository.find();
    }

    async getUser(_id: number): Promise<User[]> {
        return this.usersRepository.find({
            where: [{ "id": _id }]
        });
    }

    async createUser(user: Partial<User>): Promise<User> {
        return this.usersRepository.save(user);
    }

    async updateUser(user: User): Promise<User> {
        return this.usersRepository.save(user);
    }

    async deleteUser(user: User): Promise<DeleteResult> {
        return this.usersRepository.delete(user);
    }
}
