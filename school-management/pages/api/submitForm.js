import dbconnection from "@/lib/dbconnection";
import {formidable} from "formidable";
import fs from 'fs/promises';
import path from 'path';


export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const form = formidable()
  form.uploadDir = path.join(process.cwd(), '/public/images');

  // Parse the incoming request
  form.parse(req, (err, fields, files) => {
    if (err) {
      res.status(500).json({ message: 'Error parsing form data', error: err });
      return;
    }

    const {schoolName, email, address, city, state, phone} = fields;
    const oldPath = files.image[0].filepath; 
    const imageName = files.image[0].originalFilename;
    const newPath = path.join(form.uploadDir, imageName);
    
    fs.rename(oldPath, newPath, async (renameErr) => {
      if (renameErr) {
        res.status(500).json({ message: 'Error moving image to folder', error: renameErr });
        return;
      }
    
    });


    if (req.method === 'POST') {

      try {
        const { schoolName, email,  address, city, state, phone } = fields;
        const imagePathInDatabase = `/images/${imageName}`;
        
        const query = 'INSERT INTO schools (name, email_id, image, address, city, state, phone) VALUES (?, ?, ?, ?, ?, ?, ? )';
        const values = [schoolName, email, imagePathInDatabase, address, city, state, phone];
        const result = dbconnection.query(query, values);
  
        res.status(200).json({ message: 'Data inserted successfully', result });
      } catch (error) {
        res.status(500).json({ message: 'Error inserting data', error: error.message });
      }
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  });
}
