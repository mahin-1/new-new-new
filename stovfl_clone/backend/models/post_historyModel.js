// import { DataTypes } from "sequelize";
// import db from "../config/database.js";

// export const Post_History = db.define('post_history', {
//     id: {
//         autoIncrement: true,
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         primaryKey: true
//     },
//     post_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false
//     },
//     user_id: {
//         type: DataTypes.INTEGER,
//         allowNull: true
//     },
//     post_history_type_id: {
//         type: DataTypes.SMALLINT,
//         allowNull: false
//     },
//     user_display_name: {
//         type: DataTypes.STRING(64),
//         allowNull: true
//     },
//     content_license: {
//         type: DataTypes.STRING(64),
//         allowNull: true
//     },
//     revision_guid: {
//         type: DataTypes.UUID,
//         allowNull: true
//     },
//     text: {
//         type: DataTypes.TEXT,
//         allowNull: true
//     },
//     comment: {
//         type: DataTypes.TEXT,
//         allowNull: true
//     },
//     creation_date: {
//         type: DataTypes.DATE,
//         allowNull: false
//     }
// }, {
//     sequelize,
//     tableName: 'post_history',
//     schema: 'public',
//     timestamps: false,
//     indexes: [
//         {
//             name: "post_history_pkey",
//             unique: true,
//             fields: [
//                 { name: "id" },
//             ]
//         },
//     ]
// });
