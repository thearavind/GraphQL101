'use strict'

export default (sequelize, DataTypes) => {
    return sequelize.define('users', {
        _id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_name: {
            type: DataTypes.STRING(50),
            required: true,
            allowNull: false
        },
        role: {
            type: DataTypes.ENUM,
            required: true,
            values: ['student', 'admin'],
            allowNull: false
        },
        sex: {
            type: DataTypes.ENUM,
            required: true,
            values: ['M', 'F'],
            allowNull: false
        },
        department: {
            type: DataTypes.STRING(50),
            required: true,
            allowNull: false
        },
        joined_date: {
            type: DataTypes.DATE,
            required: true,
            allowNull: false
        },
        email_id: {
            type: DataTypes.STRING(50),
            required: true,
            allowNull: false
        },
        password_hash: {
            type: DataTypes.STRING,
            required: true,
            allowNull: false
        },
        refresh_token: {
            type: DataTypes.STRING,
            required: false,
            allowNull: true
        }
    })
}
