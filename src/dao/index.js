import mongoProductDao from './dbManager/products.manager.js';
import mongoCartDao from './dbManager/carts.manager.js';
import mongoUserDao from './dbManager/user.manager.js';
//Import del dao de manejo de datos con archivos

const MongoProductDao = new mongoProductDao();
const MongoCartDao = new mongoCartDao();
const MongoUserDao = new mongoUserDao();
//Crear las instancia de manejo de datos con archivos

//export const TOYSDAO = config.persistence === 'MEMORY' ? MemoryToyDao : MongoToyDao;
export const PRODUCTSDAO = MongoProductDao;
export const CARTSDAO = MongoCartDao;
export const USERSDAO = MongoUserDao;