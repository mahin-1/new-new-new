import { DataTypes } from "sequelize";
import db from "../config/database.js";

export const Auth = db.define('auth', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    user_name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    pass: {
        type: DataTypes.STRING(255),
        allowNull: false
    }

}, {
    tableName: 'auth',
    schema: 'public',
    timestamps: false,
    indexes: [
        {
            name: "auth_pkey",
            unique: true,
            fields: [
                { name: "id" },
            ]
        },
    ]
});
