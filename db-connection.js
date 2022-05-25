'use strict';

const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');
const rootPath = path.normalize(__dirname);
const modelPath = rootPath + '/models';

const dbConfig = {
    DB_NAME: process.env.DB_NAME,
    DB_USER: process.env.DB_USER,
    DB_PASS: process.env.DB_PASS,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_DIALECT: process.env.DB_DIALECT
}

/**
 * Function to return sequelize instance
 * @param {Object} dbConfig 
 * @returns {Object} sequelize object
 */
function getSequelizeInstance(dbConfig) {
    return new Sequelize(
        dbConfig.DB_NAME,
        dbConfig.DB_USER,
        dbConfig.DB_PASS, {
        host: dbConfig.DB_HOST,
        dialect: dbConfig.DB_DIALECT,
        dialectOptions: {
            ssl: false,
        },
        port: dbConfig.DB_PORT,
        logging: true
    });
}

const sequelizeIns = getSequelizeInstance(dbConfig);

// loop through all files in models directory
fs.readdirSync(modelPath)
    .forEach(function (file) {
        require(path.join(modelPath, file))(sequelizeIns, Sequelize.DataTypes);
    });

// check if any model associate
Object.keys(sequelizeIns.models).forEach((modelName) => {
    if (sequelizeIns.models[modelName].options && sequelizeIns.models[modelName].options.hasOwnProperty('associate')) {
        sequelizeIns.models[modelName].options.associate(sequelizeIns.models);
    }
});


module.exports = sequelizeIns;