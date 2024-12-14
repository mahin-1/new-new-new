import { DataTypes } from "sequelize";
import db from "../config/database.js";

export const Comment = db.define('comments', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    post_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    // score: {
    //     type: DataTypes.SMALLINT,
    //     allowNull: false
    // },
    // content_license: {
    //     type: DataTypes.STRING(64),
    //     allowNull: false
    // },
    user_display_name: {
        type: DataTypes.STRING(64),
        allowNull: true
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    creation_date: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: 'comments',
    schema: 'public',
    timestamps: false,
    indexes: [
        {
            name: "comments_pkey",
            unique: true,
            fields: [
                { name: "id" },
            ]
        },
    ]
});
