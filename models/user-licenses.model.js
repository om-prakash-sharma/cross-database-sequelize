'use strict';

const userLicenseSchema = (sequelize, DataTypes) => {
    const userLicenses = sequelize.define('user_license',
        {
            id: {
                type: DataTypes.UUID,
                field: 'id',
                primaryKey: true,
                unique: true,
                defaultValue: DataTypes.UUIDV4
            },
            count: {
                type: DataTypes.INTEGER,
                field: 'count'
            },
            expirationDate: {
                type: DataTypes.DATE,
                field: 'expiration_date'
            },
            userId: {
                type: DataTypes.UUID,
                onDelete: 'CASCADE',
                references: {
                    model: 'users',
                    key: 'id'
                },
                field: 'user_id'
            },
            status: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            }
        },
        {
            timestamps: false,
            associate(models) {
                userLicenses.belongsTo(models.user, { foreignKey: 'userId' });
            }
        }
    );
    return userLicenses;
};

module.exports = userLicenseSchema;