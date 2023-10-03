const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const connection = require('../config/db');

router.get('/', (req, res) => {
  const query = 'SELECT * FROM PemilikSenjata';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error retrieving PemilikSenjata data:', err);
      return res.status(500).json({ status: false, message: 'Server Error' });
    }
    return res.status(200).json({ status: true, data: results });
  });
});

router.post('/', (req, res) => {
  const { Nama_PemilikSenjata } = req.body;
  const query = 'INSERT INTO PemilikSenjata (Nama_PemilikSenjata) VALUES (?)';
  connection.query(query, [Nama_PemilikSenjata], (err, result) => {
    if (err) {
      console.error('Error creating new PemilikSenjata:', err);
      return res.status(500).json({ status: false, message: 'Server Error' });
    }
    return res.status(201).json({ status: true, message: 'Owner created successfully' });
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { Nama_PemilikSenjata } = req.body;
  const query = 'UPDATE PemilikSenjata SET Nama_PemilikSenjata = ? WHERE ID_PemilikSenjata = ?';
  connection.query(query, [Nama_PemilikSenjata, id], (err, result) => {
    if (err) {
      console.error('Error updating PemilikSenjata:', err);
      return res.status(500).json({ status: false, message: 'Server Error' });
    }
    return res.status(200).json({ status: true, message: 'Owner updated successfully' });
  });
});

router.delete(':id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM PemilikSenjata WHERE ID_PemilikSenjata = ?';
  connection.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error deleting PemilikSenjata:', err);
      return res.status(500).json({ status: false, message: 'Server Error' });
    }
    return res.status(200).json({ status: true, message: 'Owner deleted successfully' });
  });
});

module.exports = router;
