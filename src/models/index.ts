import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import dotenv from 'dotenv';

// Load environment variables before creating Sequelize instance
dotenv.config();

const sequelize = new Sequelize({
    dialect: 'mysql',
    host: process.env.MYSQL_HOST || 'localhost',
    port: parseInt(process.env.MYSQL_PORT || '3306'),
    username: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || '',
    database: process.env.MYSQL_DATABASE || 'postman_clone',
    logging: false,
});

// User Model
interface UserAttributes {
    id: number;
    email: string;
    password: string;
    otp?: string;
    otpExpiry?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> { }

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
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        otp: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        otpExpiry: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: 'users',
    }
);

// Collection Model
interface CollectionAttributes {
    id: number;
    name: string;
    userId: number;
    createdAt?: Date;
    updatedAt?: Date;
}

interface CollectionCreationAttributes extends Optional<CollectionAttributes, 'id'> { }

export class Collection extends Model<CollectionAttributes, CollectionCreationAttributes> implements CollectionAttributes {
    declare public id: number;
    declare public name: string;
    declare public userId: number;
    declare public readonly createdAt: Date;
    declare public readonly updatedAt: Date;
}

Collection.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'collections',
    }
);

// Folder Model
interface FolderAttributes {
    id: number;
    name: string;
    collectionId: number;
    createdAt?: Date;
    updatedAt?: Date;
}

interface FolderCreationAttributes extends Optional<FolderAttributes, 'id'> { }

export class Folder extends Model<FolderAttributes, FolderCreationAttributes> implements FolderAttributes {
    declare public id: number;
    declare public name: string;
    declare public collectionId: number;
    declare public readonly createdAt: Date;
    declare public readonly updatedAt: Date;
}

Folder.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        collectionId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'folders',
    }
);

// Request Model
interface RequestAttributes {
    id: number;
    userId: number;
    name: string;
    method: string;
    url: string;
    headers?: object;
    body?: object;
    bodyType: string;
    auth?: object;
    collectionId?: number;
    folderId?: number;
    isFavorite: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

interface RequestCreationAttributes extends Optional<RequestAttributes, 'id' | 'isFavorite' | 'createdAt' | 'updatedAt' | 'bodyType'> { }

export class Request extends Model<RequestAttributes, RequestCreationAttributes> implements RequestAttributes {
    declare public id: number;
    declare public name: string;
    declare public method: string;
    declare public url: string;
    declare public headers?: object;
    declare public body?: object;
    declare public bodyType: string;
    declare public auth?: object;
    declare public collectionId?: number;
    declare public folderId?: number;
    declare public userId: number;
    declare public isFavorite: boolean;
    declare public readonly createdAt: Date;
    declare public readonly updatedAt: Date;
}

Request.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        method: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        headers: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        body: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        bodyType: {
            type: DataTypes.STRING,
            defaultValue: 'none',
        },
        auth: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        collectionId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        folderId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        isFavorite: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    {
        sequelize,
        tableName: 'requests',
    }
);

// Environment Model
interface EnvironmentAttributes {
    id: number;
    name: string;
    userId: number;
    createdAt?: Date;
    updatedAt?: Date;
}

interface EnvironmentCreationAttributes extends Optional<EnvironmentAttributes, 'id'> { }

export class Environment extends Model<EnvironmentAttributes, EnvironmentCreationAttributes> implements EnvironmentAttributes {
    declare public id: number;
    declare public name: string;
    declare public userId: number;
    declare public readonly createdAt: Date;
    declare public readonly updatedAt: Date;
}

Environment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'environments',
    }
);

// Variable Model
interface VariableAttributes {
    id: number;
    key: string;
    value: string;
    environmentId: number;
}

interface VariableCreationAttributes extends Optional<VariableAttributes, 'id'> { }

export class Variable extends Model<VariableAttributes, VariableCreationAttributes> implements VariableAttributes {
    declare public id: number;
    declare public key: string;
    declare public value: string;
    declare public environmentId: number;
}

Variable.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        key: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        value: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        environmentId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'variables',
        timestamps: false,
    }
);

// History Model
interface HistoryAttributes {
    id: number;
    userId: number;
    method: string;
    url: string;
    status?: number;
    time?: number;
    size?: number;
    createdAt?: Date;
}

interface HistoryCreationAttributes extends Optional<HistoryAttributes, 'id'> { }

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
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        method: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        time: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        size: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: 'history',
        updatedAt: false,
    }
);

// Define relationships
User.hasMany(Collection, { foreignKey: 'userId' });
Collection.belongsTo(User, { foreignKey: 'userId' });

Collection.hasMany(Folder, { foreignKey: 'collectionId', as: 'folders' });
Folder.belongsTo(Collection, { foreignKey: 'collectionId' });

Collection.hasMany(Request, { foreignKey: 'collectionId', as: 'requests' });
Request.belongsTo(Collection, { foreignKey: 'collectionId' });

Folder.hasMany(Request, { foreignKey: 'folderId', as: 'requests' });
Request.belongsTo(Folder, { foreignKey: 'folderId' });

User.hasMany(Environment, { foreignKey: 'userId' });
Environment.belongsTo(User, { foreignKey: 'userId' });

Environment.hasMany(Variable, { foreignKey: 'environmentId' });
Variable.belongsTo(Environment, { foreignKey: 'environmentId' });

User.hasMany(History, { foreignKey: 'userId' });
History.belongsTo(User, { foreignKey: 'userId' });

export { sequelize };
