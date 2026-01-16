import { sequelize } from './config';
import { User } from './entities/User';
import { Collection } from './entities/Collection';
import { Folder } from './entities/Folder';
import { Request } from './entities/Request';
import { Environment } from './entities/Environment';
import { Variable } from './entities/Variable';
import { History } from './entities/History';

// Relationships
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

export {
    sequelize,
    User,
    Collection,
    Folder,
    Request,
    Environment,
    Variable,
    History
};
