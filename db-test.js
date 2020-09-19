const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');

async function setup() {
    try {
        const db = await sqlite.open('./myDb.sqlite',{        
            driver: sqlite3.Database
        });
        await db.migrate({
            force: true,
            migrationsPath: './migrations'
        });
    
        const guest = await db.all('SELECT * FROM guest');
        console.log('ALL GUEST', JSON.stringify(guest, null, 2)); 
    } catch (error) {
        console.log(error);
    }   
}

setup();