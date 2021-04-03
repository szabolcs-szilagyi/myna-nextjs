import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  email: string;

  @Column('varchar', { name: 'firstname' })
  firstName: string;

  @Column('varchar', { name: 'lastname' })
  lastName: string;

  @Column('datetime', { name: 'lastlogin' })
  lastLogin: Date;

  @Column('date')
  birthday: Date;
}
