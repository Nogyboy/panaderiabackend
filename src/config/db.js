import postgres from 'postgres'

const sql = postgres({
    host                 : '172.27.28.192',            // Postgres ip address[s] or domain name[s]
    port                 : 5432,          // Postgres server port[s]
    database             : 'panaderia',            // Name of database to connect to
    username             : 'postgres',            // Username of database user
    password             : 'mysecretpassword',            // Password of database user
  });


export default sql