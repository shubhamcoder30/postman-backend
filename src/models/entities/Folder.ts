import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config';

export interface FolderAttributes {
    id: number;
    name: string;
    collectionId: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface FolderCreationAttributes extends Optional<FolderAttributes, 'id'> { }

export class Folder extends Model<FolderAttributes, FolderCreationAttributes> implements FolderAttributes {
    declare public id: number;
    declare public name: string;
    declare public collectionId: number;
    declare public readonly createdAt: Date;
    declare public readonly updatedAt: Date;
}

Folder.init(
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        name: { type: DataTypes.STRING, allowNull: false },
        collectionId: { type: DataTypes.INTEGER, allowNull: false },
    },
    { sequelize, tableName: 'folders' }
);
