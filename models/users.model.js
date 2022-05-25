'use strict';

const userSchema = (sequelize, DataTypes) => {
    const users = sequelize.define('user',
        {
            id: {
                type: DataTypes.UUID,
                field: 'id',
                primaryKey: true,
                unique: true,
                defaultValue: DataTypes.UUIDV4
            },
            name: {
                type: DataTypes.STRING,
                field: 'name'
            },
            emailId: {
                type: DataTypes.STRING,
                field: 'email_id'
            },
            status: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            }
        },
        {
            timestamps: false,
            associate(models) {
                users.hasOne(models.user_license, { foreignKey: 'userId' });
            }
        }
    );
    return users;
};

module.exports = userSchema;