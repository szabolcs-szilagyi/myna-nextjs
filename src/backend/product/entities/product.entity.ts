import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
  name: 'products'
})
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  idname: string;

  @Column('varchar')
  availability: string;

  @Column('boolean', { name: 'is_one_size' })
  isOneSize: number;

  @Column('varchar', { name: 'productname' })
  name: string;

  @Column('varchar', { name: 'productcolor' })
  color: string;

  @Column('smallint', { name: 'productprice' })
  price: number;

  @Column('varchar', { name: 'desclong' })
  description: string;

  @Column('varchar', { name: 'comp_care' })
  compCare: string;

  @Column('varchar')
  pic1: string;

  @Column('varchar')
  pic2: string;

  @Column('varchar')
  pic3: string;

  @Column('varchar')
  pic4: string;

  @Column('varchar')
  pic5: string;

  @Column('varchar')
  pic6: string;

  @Column('varchar')
  pic7: string;

  @Column('varchar')
  pic8: string;

  @Column('varchar')
  pic9: string;
}
