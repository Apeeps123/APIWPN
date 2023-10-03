const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const connection = require('../config/db');

router.get('/', (req, res) => {
    const query = `
      SELECT MerekSenjata.Nama_MerekSenjata AS Brand, JenisSenjata.Nama_JenisSenjata AS Type
      FROM MerekSenjata
      JOIN JenisSenjata ON MerekSenjata.ID_JenisSenjata = JenisSenjata.ID_JenisSenjata
    `;
    
    connection.query(query, (err, results) => {
      if (err) {
        return handleDatabaseError(res, err, 'Error retrieving brand and type data:');
      }
      return res.status(200).json({ status: true, data: results });
    });
  });
  

router.post('/', (req, res) => {
  const { Nama_MerekSenjata, ID_JenisSenjata } = req.body;
  const query = 'INSERT INTO MerekSenjata (Nama_MerekSenjata, ID_JenisSenjata) VALUES (?, ?)';
  connection.query(query, [Nama_MerekSenjata, ID_JenisSenjata], (err, result) => {
    if (err) {
      console.error('Error creating new MerekSenjata:', err);
      return res.status(500).json({ status: false, message: 'Server Error' });
    }
    return res.status(201).json({ status: true, message: 'Brand created successfully' });
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { Nama_MerekSenjata, ID_JenisSenjata } = req.body;
  const query = 'UPDATE MerekSenjata SET Nama_MerekSenjata = ?, ID_JenisSenjata = ? WHERE ID_MerekSenjata = ?';
  connection.query(query, [Nama_MerekSenjata, ID_JenisSenjata, id], (err, result) => {
    if (err) {
      console.error('Error updating MerekSenjata:', err);
      return res.status(500).json({ status: false, message: 'Server Error' });
    }
    return res.status(200).json({ status: true, message: 'Brand updated successfully' });
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM MerekSenjata WHERE ID_MerekSenjata = ?';
  connection.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error deleting MerekSenjata:', err);
      return res.status(500).json({ status: false, message: 'Server Error' });
    }
    return res.status(200).json({ status: true, message: 'Brand deleted successfully' });
  });
});

module.exports = router;
