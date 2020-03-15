import Sequelize from "sequelize";
const db = {};

/** The commented out section below is for local testing **/

const sequelize = new Sequelize("gateway", "pradyumna", "pradyumna", {
	host: "localhost",
	dialect: "postgres",
	operatorAliases: false,
	pool: {
		max: 5, //maximum number of connections allowed
		min: 0, // min no. of connections
		aquire: 30000, //max time in milliseconds to get a connection before sending error
		idle: 10000 //max time connection can be idle for
	}
});

/* comment out the next line in case you are running file locally */

// const sequelize = new Sequelize(process.env.DATABASE_URL);

db.sequelize = sequelize;
// db.Sequelize = Sequelize;

export default db;
