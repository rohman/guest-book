import { NextApiRequest, NextApiResponse } from 'next';
import { open } from 'sqlite'

export default async function getAllGuests(req: NextApiRequest, res: NextApiResponse) {
    try {
        const db = await open('./myDb.sqlite');
        if (req.method === "GET") {
            const guest = await db.get('SELECT * FROM guest WHERE id = ? ', [req.query.id]);
            res.json(guest);
        } else if (req.method === "PUT") {
            const statement = await db.prepare('UPDATE guest SET name=?, address=?, phoneNumber=?, comment=? WHERE id=?');
            await statement.run(req.body.name, req.body.address, req.body.phoneNumber, req.body.comment, req.query.id);
            res.json({message : 'Success Update'});
        }else if (req.method === "DELETE") {
            const statement = await db.prepare('DELETE FROM guest WHERE id =?');
            await statement.run(req.query.id);
            res.json({message : 'Success Delete'});
        }
        
    } catch (error) {
        console.log(error);
    }
}