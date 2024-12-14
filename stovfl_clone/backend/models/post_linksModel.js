// import { DataTypes } from "sequelize";
// import db from "../config/database.js";

// export const Post_Link = db.define('post_links', {
//     id: {
//         autoIncrement: true,
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         primaryKey: true
//     },
//     related_post_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false
//     },
//     post_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false
//     },
//     link_type_id: {
//         type: DataTypes.SMALLINT,
//         allowNull: false
//     },
//     creation_date: {
//         type: DataTypes.DATE,
//         allowNull: false
//     }
// }, {
//     sequelize,
//     tableName: 'post_links',
//     schema: 'public',
//     timestamps: false,
//     indexes: [
//         {
//             name: "post_links_pkey",
//             unique: true,
//             fields: [
//                 { name: "id" },
//             ]
//         },
//     ]
// });
