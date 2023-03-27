const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();

// create MySQL connection pool
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'scoreboard_db'
});

app.use(cors());

// parse application/json
app.use(bodyParser.json());

// get a score by playername
app.get('/test', (req, res) => {
   res.send('Helloo !!');
});

// get all scores
app.get('/scoreboard', (req, res) => {
    pool.query('SELECT * FROM scoreboard', (error, results) => {
        if (error) throw error;
        res.send(results);
    });
});

// get a score by playername
app.get('/scoreboard/:playername', (req, res) => {
    const playername = req.params.playername;
    pool.query('SELECT * FROM scoreboard WHERE playername = ?', playername, (error, results) => {
        if (error) throw error;
        res.send(results[0]);
    });
});

// add a new score
app.post('/scoreboard', (req, res) => {
  const { playername, score } = req.body;
  if (!playername || !score) {
    return res.status(400).json({ message: 'Both playername and score are required.' });
  }

  pool.query('SELECT * FROM scoreboard WHERE playername = ?', [playername], (error, results) => {
    if (error) {
      throw error;
    }

    if (results.length === 0) {
      pool.query('INSERT INTO scoreboard (playername, score) VALUES (?, ?)', [playername, score], (error, results) => {
        if (error) {
          throw error;
        }
        return res.status(201).json({ message: 'Player created successfully.' });
      });
    } else {
      const existingScore = results[0].score;
      const maxScore = Math.max(existingScore, score);
      pool.query('UPDATE scoreboard SET score = ? WHERE playername = ?', [maxScore, playername], (error, results) => {
        if (error) {
          throw error;
        }
        return res.status(200).json({ message: 'Player score updated successfully.' });
      });
    }
  });
});

// update a score
app.put('/scoreboard/:playername', (req, res) => {
    const { playername, score } = req.body;
  if (!playername || !score) {
    return res.status(400).json({ message: 'Both playername and score are required.' });
  }

  pool.query('SELECT * FROM scoreboard WHERE playername = ?', [playername], (error, results) => {
    if (error) {
      throw error;
    }

    if (results.length === 0) {
      pool.query('INSERT INTO scoreboard (playername, score) VALUES (?, ?)', [playername, score], (error, results) => {
        if (error) {
          throw error;
        }
        return res.status(201).json({ message: 'Player created successfully.' });
      });
    } else {
      const existingScore = results[0].score;
      const maxScore = Math.max(existingScore, score);
      pool.query('UPDATE scoreboard SET score = ? WHERE playername = ?', [maxScore, playername], (error, results) => {
        if (error) {
          throw error;
        }
        return res.status(200).json({ message: 'Player score updated successfully.' });
      });
    }
  });
});

// delete a score
app.delete('/scoreboard/:playername', (req, res) => {
    const playername = req.params.playername;
    pool.query('DELETE FROM scoreboard WHERE playername = ?', playername, (error, results) => {
        if (error) throw error;
        res.send(`Score deleted for player ${playername}`);
    });
});

// start the server
app.listen(3000, () => console.log('Server started on port 3000'));
