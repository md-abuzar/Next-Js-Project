import dbconnection from "../../lib/dbconnection";
import fs from 'fs';
import path from 'path';
import formidable from 'formidable';



export default async function handler(req, res) {

  if (req.method === 'POST') {

    try {
      const { schoolName, email, image, address, city, state, phone } = req.body;
      
      const query = 'INSERT INTO schools (name, email_id, image, address, city, state, phone) VALUES (?, ?, ?, ?, ?, ?, ? )';
      const values = [schoolName, email, "test", address, city, state, phone];

      const result = await dbconnection.query(query, values);

      res.status(200).json({ message: 'Data inserted successfully', result });
      console.log(message)
    } catch (error) {
      res.status(500).json({ message: 'Error inserting data', error: error.message });
      console.log(message)
      
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
    console.log(message)
  }
}
