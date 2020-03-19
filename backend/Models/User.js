const Sequelize = require('sequelize')
const db = require('../Database/db.js')

module.exports = db.sequelize.define(
    'user',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        phone: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        secret: {
            type: Sequelize.STRING
        },
        verified: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
        secretSent: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
        created: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        }
    },
    {
        timestamps: false
    }
)

db.sequelize.sync();