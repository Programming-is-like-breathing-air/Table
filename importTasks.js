const { Client } = require('pg');
const fs = require('fs');

// PostgreSQL client setup
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'prisma',
    password: '123',
    port: 5432,
});

// Connect to your database
client.connect();

// Read JSON file
const tasks = JSON.parse(fs.readFileSync('./src/data/tasks.json', 'utf8'));

// Function to insert task data
async function insertTask(task) {
    const { id, title, status, label, priority } = task;
    const query = 'INSERT INTO "Task" (id, title, status, label, priority) VALUES ($1, $2, $3, $4, $5)';
    const values = [id, title, status, label, priority];

    try {
        await client.query(query, values);
        console.log(`Inserted: ${id}`);
    } catch (err) {
        console.error(`Error inserting ${id}: ${err}`);
    }
}

// Insert each task into the database
tasks.forEach(task => {
    insertTask(task).then(() => {
        if (tasks.indexOf(task) === tasks.length - 1) {
            client.end();
        }
    });
});