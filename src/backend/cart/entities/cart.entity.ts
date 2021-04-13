import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'cart' })
export class CartEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { name: 'idname' })
  idName: string;

  @Column('varchar')
  size: string;

  @Column('varchar', { name: 'session_token' })
  sessionToken: string;

  @Column('tinyint')
  amount: number;

  @Column('tinyint')
  paid: number;
}
