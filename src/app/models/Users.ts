import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm'
import bcrypt from 'bcrypt'

@Entity('users')
export default class Users {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @BeforeInsert()
    hashPassword () {
      this.password = bcrypt.hashSync(this.password, 8)
    }
}
