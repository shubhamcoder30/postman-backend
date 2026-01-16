import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config';

export interface RequestAttributes {
    id: number;
    userId: number;
    name: string;
    method: string;
    url: string;
    headers?: object;
    body?: object;
    bodyType: string;
    type: string;
    preRequestScript?: string;
    auth?: object;
    collectionId?: number;
    folderId?: number;
    isFavorite: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface RequestCreationAttributes extends Optional<RequestAttributes, 'id' | 'isFavorite' | 'createdAt' | 'updatedAt' | 'bodyType' | 'type'> { }

export class Request extends Model<RequestAttributes, RequestCreationAttributes> implements RequestAttributes {
    declare public id: number;
    declare public userId: number;
    declare public name: string;
    declare public method: string;
    declare public url: string;
    declare public headers?: object;
    declare public body?: object;
    declare public bodyType: string;
    declare public type: string;
    declare public preRequestScript?: string;
    declare public auth?: object;
    declare public collectionId?: number;
    declare public folderId?: number;
    declare public isFavorite: boolean;
    declare public readonly createdAt: Date;
    declare public readonly updatedAt: Date;
}

Request.init(
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        userId: { type: DataTypes.INTEGER, allowNull: false },
        name: { type: DataTypes.STRING, allowNull: false },
        method: { type: DataTypes.STRING, allowNull: false },
        url: { type: DataTypes.STRING, allowNull: false },
        headers: { type: DataTypes.JSON, allowNull: true },
        body: { type: DataTypes.JSON, allowNull: true },
        bodyType: { type: DataTypes.STRING, defaultValue: 'none' },
        type: { type: DataTypes.STRING, defaultValue: 'http' },
        preRequestScript: { type: DataTypes.TEXT, allowNull: true },
        auth: { type: DataTypes.JSON, allowNull: true },
        collectionId: { type: DataTypes.INTEGER, allowNull: true },
        folderId: { type: DataTypes.INTEGER, allowNull: true },
        isFavorite: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    { sequelize, tableName: 'requests' }
);
