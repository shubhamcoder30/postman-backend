import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config';

export interface VariableAttributes {
    id: number;
    key: string;
    value: string;
    environmentId: number;
}

export interface VariableCreationAttributes extends Optional<VariableAttributes, 'id'> { }

export class Variable extends Model<VariableAttributes, VariableCreationAttributes> implements VariableAttributes {
    declare public id: number;
    declare public key: string;
    declare public value: string;
    declare public environmentId: number;
}

Variable.init(
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        key: { type: DataTypes.STRING, allowNull: false },
        value: { type: DataTypes.STRING, allowNull: false },
        environmentId: { type: DataTypes.INTEGER, allowNull: false },
    },
    { sequelize, tableName: 'variables', timestamps: false }
);
