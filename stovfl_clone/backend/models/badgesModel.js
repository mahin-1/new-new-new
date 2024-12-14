// import { DataTypes } from "sequelize";
// import db from "../config/database.js";

// export const Badge = db.define('badges', {
//     id: {
//         autoIncrement: true,
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         primaryKey: true
//     },
//     user_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false
//     },
//     class: {
//         type: DataTypes.SMALLINT,
//         allowNull: false
//     },
//     name: {
//         type: DataTypes.STRING(64),
//         allowNull: false
//     },
//     tag_based: {
//         type: DataTypes.BOOLEAN,
//         allowNull: false
//     },
//     date: {
//         type: DataTypes.DATE,
//         allowNull: false
//     }
// }, {
//     sequelize,
//     tableName: 'badges',
//     schema: 'public',
//     timestamps: false,
//     indexes: [
//         {
//             name: "badges_pkey",
//             unique: true,
//             fields: [
//                 { name: "id" },
//             ]
//         },
//     ]
// });
