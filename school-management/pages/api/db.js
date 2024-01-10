import mysql from 'mysql2/promise';

export default async function handler(req, res) {
    
    const dbconnection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'sms',
      });
      
  try {
    const query = 'SELECT name, address, city, image FROM schools'
    const values = [];
    const [data] = await dbconnection.execute(query, values);

    // Close the database connection
     dbconnection.end();
    res.status(200).json({ results: data });
  } catch (error) {
    res.status(500).json({ error:error.message});
  }
}
