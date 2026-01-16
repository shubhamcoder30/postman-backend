import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config';

export interface HistoryAttributes {
    id: number;
    userId: number;
    method: string;
    url: string;
    status?: number;
    time?: number;
    size?: number;
    createdAt?: Date;
}

export interface HistoryCreationAttributes extends Optional<HistoryAttributes, 'id'> { }

export class History extends Model<HistoryAttributes, HistoryCreationAttributes> implements HistoryAttributes {
    declare public id: number;
    declare public userId: number;
    declare public method: string;
    declare public url: string;
    declare public status?: number;
    declare public time?: number;
    declare public size?: number;
    declare public readonly createdAt: Date;
}

History.init(
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        userId: { type: DataTypes.INTEGER, allowNull: false },
        method: { type: DataTypes.STRING, allowNull: false },
        url: { type: DataTypes.STRING, allowNull: false },
        status: { type: DataTypes.INTEGER, allowNull: true },
        time: { type: DataTypes.INTEGER, allowNull: true },
        size: { type: DataTypes.INTEGER, allowNull: true },
    },
    { sequelize, tableName: 'history', updatedAt: false }
);
