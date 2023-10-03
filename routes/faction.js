const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const connection = require('../config/db');

router.get('/', (req, res) => {
  const query = 'SELECT * FROM Faction';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error retrieving Faction data:', err);
      return res.status(500).json({ status: false, message: 'Server Error' });
    }
    return res.status(200).json({ status: true, data: results });
  });
});

router.post('/', (req, res) => {
  const { Nama_Faction, Kode_Faction } = req.body;
  const query = 'INSERT INTO Faction (Nama_Faction, Kode_Faction) VALUES (?, ?)';
  connection.query(query, [Nama_Faction, Kode_Faction], (err, result) => {
    if (err) {
      console.error('Error creating new Faction:', err);
      return res.status(500).json({ status: false, message: 'Server Error' });
    }
    return res.status(201).json({ status: true, message: 'Faction created successfully' });
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { Nama_Faction, Kode_Faction } = req.body;
  const query = 'UPDATE Faction SET Nama_Faction = ?, Kode_Faction = ? WHERE ID_Faction = ?';
  connection.query(query, [Nama_Faction, Kode_Faction, id], (err, result) => {
    if (err) {
      console.error('Error updating Faction:', err);
      return res.status(500).json({ status: false, message: 'Server Error' });
    }
    return res.status(200).json({ status: true, message: 'Faction updated successfully' });
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM Faction WHERE ID_Faction = ?';
  connection.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error deleting Faction:', err);
      return res.status(500).json({ status: false, message: 'Server Error' });
    }
    return res.status(200).json({ status: true, message: 'Faction deleted successfully' });
  });
});

module.exports = router;
