import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  BeforeInsert
} from "typeorm";
import * as bcrypt from "bcrypt";

@Entity("users")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar", { length: 255, nullable: true })
  email: string | null;

  @Column("text", { nullable: true })
  password: string | null;

  @Column("varchar", { nullable: true, length: 255 }) fullName: string | null;
  @Column("varchar", { nullable: false, length: 255 }) createdAt: string;

  @BeforeInsert()
  async hashPasswordBeforeInsert (): Promise<string | undefined> {
    if (this.password) {
      return this.password = await bcrypt.hash(this.password, 12);
    }
    return
  }

  @BeforeInsert()
  async createDate(): Promise<any> {
    return this.createdAt = new Date().toISOString();
  }
}
