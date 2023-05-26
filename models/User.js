// Import Model parent class and enumerator from sequelize library
const { Model, DataTypes } = require('sequelize');

// Import bcrypt module to hash password values
const bcrypt = require('bcrypt');

// Import sequelize connection
const sequelize = require('../config/connection');

// Extend Model parent class and define an instance method to validate password
class User extends Model {
    checkPassword(inputPwd) {
        return bcrypt.compareSync(inputPwd, this.password); // Returns true if values match
    }
}

// Define User model properties
User.init(
    // Define columns
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8]
            }
        }
    },
    {
        // Define hooks to hash password value before a user entry is created or updated
        hooks: {
            beforeCreate: async (newUserData) => {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
            beforeUpdate: async (updatedUserData) => {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            }
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
    }
);

module.exports = User;