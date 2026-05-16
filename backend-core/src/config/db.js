const {Pool} = require("pg");

const pool = new Pool({
    connectionString : process.env.DATABASE_URL,
});

pool.connect((err,client,release) => {
    if(err){
        console.log("Error connecting with DB : ", err.message);
        process.exit(1); // failure
    }
    console.log("PostgreSQL connected");
    release();
});

// Export a query helper so you never import pool directly in controllers
const query = (text,params) => pool.query(text,params);

module.exports = {query,pool};