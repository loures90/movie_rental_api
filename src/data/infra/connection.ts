import dotenv from 'dotenv'
import { Sequelize } from 'sequelize'

dotenv.config()

export const connection = new Sequelize({
    dialect: 'mysql',
    username: process.env.DB_USER || 'any_user',
    password: process.env.DB_PASSWORD || 'any_password',
    define: {
        timestamps: true,
        underscored: true
    }
})
export const testConnection = async () => {
    try {
        await connection.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
