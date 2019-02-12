const dbAddress = process.env.DB_ADDRESS || 'localhost:27017';

module.exports = {
	database: `mongodb://${dbAddress}/login`,
		secret: 'secretkey'
}