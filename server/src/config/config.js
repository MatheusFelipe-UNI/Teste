module.exports = {
   development: {
      username: "root",
      password: "1234",
      database: "mydb",
      host: "127.0.0.1",
      port: 3306,
      dialect: "mysql",
      timezone: "-03:00",
   },
   test: {
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      host: process.env.DB_HOST,
      port: 3306,
      dialect: process.env.DB_DIALECT,
      timezone: "-03:00",
   },
   production: {
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      host: process.env.DB_HOST,
      port: 3306,
      dialect: process.env.DB_DIALECT,
      timezone: "-03:00",
   },
};
