import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config';

export interface CollectionAttributes {
    id: number;
    name: string;
    userId: number;
    variables?: any;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface CollectionCreationAttributes extends Optional<CollectionAttributes, 'id'> { }

export class Collection extends Model<CollectionAttributes, CollectionCreationAttributes> implements CollectionAttributes {
    declare public id: number;
    declare public name: string;
    declare public userId: number;
    declare public variables: any;
    declare public readonly createdAt: Date;
    declare public readonly updatedAt: Date;
}

Collection.init(
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        name: { type: DataTypes.STRING, allowNull: false },
        userId: { type: DataTypes.INTEGER, allowNull: false },
        variables: { type: DataTypes.JSON, allowNull: true, defaultValue: [] },
    },
    { sequelize, tableName: 'collections' }
);
