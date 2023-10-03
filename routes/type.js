const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const connection = require('../config/db');

function handleDatabaseError(res, err, message) {
  console.error(message, err);
  return res.status(500).json({ status: false, message: 'Server Error' });
}

router.get('/', (req, res) => {
    const query = 'SELECT * FROM JenisSenjata';
    connection.query(query, (err, results) => {
      if (err) {
        return handleDatabaseError(res, err, 'Error retrieving JenisSenjata data:');
      }
      return res.status(200).json({ status: true, data: results });
    });
  });
  

router.post('/', (req, res) => {
  const { Nama_JenisSenjata } = req.body;
  const query = 'INSERT INTO JenisSenjata (Nama_JenisSenjata) VALUES (?)';
  connection.query(query, [Nama_JenisSenjata], (err, result) => {
    if (err) {
      return handleDatabaseError(res, err, 'Error creating new JenisSenjata:');
    }
    return res.status(201).json({ status: true, message: 'Weapon type created successfully' });
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { Nama_JenisSenjata } = req.body;
  const query = 'UPDATE JenisSenjata SET Nama_JenisSenjata = ? WHERE ID_JenisSenjata = ?';
  connection.query(query, [Nama_JenisSenjata, id], (err, result) => {
    if (err) {
      return handleDatabaseError(res, err, 'Error updating JenisSenjata:');
    }
    return res.status(200).json({ status: true, message: 'Weapon type updated successfully' });
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM JenisSenjata WHERE ID_JenisSenjata = ?';
  connection.query(query, [id], (err, result) => {
    if (err) {
      return handleDatabaseError(res, err, 'Error deleting JenisSenjata:');
    }
    return res.status(200).json({ status: true, message: 'Weapon type deleted successfully' });
  });
});

module.exports = router;
