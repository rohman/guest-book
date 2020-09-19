import {NextApiRequest, NextApiResponse} from 'next';
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

export default async function getAllGuests(req : NextApiRequest, res: NextApiResponse){
    try {
        const db = await open('./myDb.sqlite',{        
            driver: sqlite3.Database
        });
        const guest = await db.all('SELECT * FROM guest');
        res.json(guest);
    } catch (error) {
        console.log(error);
    }   
}