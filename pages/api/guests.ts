import { NextApiRequest, NextApiResponse } from 'next';
import { open } from 'sqlite'

export default async function getAllGuests(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === "GET") {
            const db = await open('./myDb.sqlite');
            const guest = await db.all('SELECT * FROM guest');
            res.json(guest);
        }
    } catch (error) {
        console.log(error);
    }
}