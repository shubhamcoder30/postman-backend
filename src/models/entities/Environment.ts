import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config';

export interface EnvironmentAttributes {
    id: number;
    name: string;
    userId: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface EnvironmentCreationAttributes extends Optional<EnvironmentAttributes, 'id'> { }

export class Environment extends Model<EnvironmentAttributes, EnvironmentCreationAttributes> implements EnvironmentAttributes {
    declare public id: number;
    declare public name: string;
    declare public userId: number;
    declare public readonly createdAt: Date;
    declare public readonly updatedAt: Date;
}

Environment.init(
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        name: { type: DataTypes.STRING, allowNull: false },
        userId: { type: DataTypes.INTEGER, allowNull: false },
    },
    { sequelize, tableName: 'environments' }
);
