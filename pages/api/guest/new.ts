import { NextApiRequest, NextApiResponse } from 'next';
import { open } from 'sqlite'

export default async function getAllGuests(req: NextApiRequest, res: NextApiResponse) {
    try {
        const db = await open('./myDb.sqlite');

       if (req.method === "POST") {
            const statement = await db.prepare('INSERT INTO guest (name, address, phoneNumber, comment) VALUES(?, ?, ?, ? )');
            await statement.run(req.body.name, req.body.address, req.body.phoneNumber, req.body.comment);
            res.json({message : 'Success Insert'});
        }
    } catch (error) {
        console.log(error);
    }
}