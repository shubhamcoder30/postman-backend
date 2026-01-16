import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config';

export interface UserAttributes {
    id: number;
    email: string;
    password: string;
    otp?: string;
    otpExpiry?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface UserCreationAttributes extends Optional<UserAttributes, 'id'> { }

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    declare public id: number;
    declare public email: string;
    declare public password: string;
    declare public otp?: string;
    declare public otpExpiry?: Date;
    declare public readonly createdAt: Date;
    declare public readonly updatedAt: Date;
}

User.init(
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        email: { type: DataTypes.STRING, allowNull: false, unique: true },
        password: { type: DataTypes.STRING, allowNull: false },
        otp: { type: DataTypes.STRING, allowNull: true },
        otpExpiry: { type: DataTypes.DATE, allowNull: true },
    },
    { sequelize, tableName: 'users' }
);
