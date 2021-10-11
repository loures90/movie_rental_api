module.exports({
    dialect: 'mysql',
    username: process.env.DB_USER || 'any_user',
    password: process.env.DB_PASSWORD || 'any_password',
    define: {
        timestamps: true,
        underscored: true
    }
})