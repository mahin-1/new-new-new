import { DataTypes } from "sequelize";
import db from "../config/database.js";

export const User = db.define('users', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    // account_id: {
    //     type: DataTypes.INTEGER,
    //     allowNull: true
    // },
    // reputation: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false
    // },
    // views: {
    //     type: DataTypes.INTEGER,
    //     allowNull: true,
    //     defaultValue: 0
    // },
    down_votes: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    up_votes: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    display_name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    location: {
        type: DataTypes.STRING(512),
        allowNull: true
    },
    profile_image_url: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    website_url: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    about_me: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    creation_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    // last_access_date: {
    //     type: DataTypes.DATE,
    //     allowNull: false
    // }
}, {
    tableName: 'users',
    schema: 'public',
    timestamps: false,
    indexes: [
        {
            name: "users_pkey",
            unique: true,
            fields: [
                { name: "id" },
            ]
        },
    ]
});
