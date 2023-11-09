import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class File {
    @PrimaryGeneratedColumn('uuid')
    id?: string

    @Column()
    filename: string
}
