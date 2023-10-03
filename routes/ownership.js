const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const connection = require('../config/db');

router.get('/', (req, res) => {
    const query = `
      SELECT KepemilikanSenjata.ID_Kepemilikan, 
             PemilikSenjata.Nama_PemilikSenjata as Owner, 
             Senjata.Nama_Senjata AS Weapon
      FROM KepemilikanSenjata
      JOIN PemilikSenjata ON KepemilikanSenjata.ID_PemilikSenjata = PemilikSenjata.ID_PemilikSenjata
      JOIN Senjata ON KepemilikanSenjata.ID_Senjata = Senjata.ID_Senjata
    `;
    
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Error retrieving KepemilikanSenjata data:', err);
        return res.status(500).json({ status: false, message: 'Server Error' });
      }
      return res.status(200).json({ status: true, data: results });
    });
  });
  

router.post('/', (req, res) => {
  const { ID_Senjata, ID_PemilikSenjata } = req.body;
  const query = 'INSERT INTO KepemilikanSenjata (ID_Senjata, ID_PemilikSenjata) VALUES (?, ?)';
  connection.query(query, [ID_Senjata, ID_PemilikSenjata], (err, result) => {
    if (err) {
      console.error('Error creating new KepemilikanSenjata:', err);
      return res.status(500).json({ status: false, message: 'Server Error' });
    }
    return res.status(201).json({ status: true, message: 'Ownership created successfully' });
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { ID_Senjata, ID_PemilikSenjata } = req.body;
  const query = 'UPDATE KepemilikanSenjata SET ID_Senjata = ?, ID_PemilikSenjata = ? WHERE ID_Kepemilikan = ?';
  connection.query(query, [ID_Senjata, ID_PemilikSenjata, id], (err, result) => {
    if (err) {
      console.error('Error updating KepemilikanSenjata:', err);
      return res.status(500).json({ status: false, message: 'Server Error' });
    }
    return res.status(200).json({ status: true, message: 'Ownership updated successfully' });
  });
});


router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM KepemilikanSenjata WHERE ID_Kepemilikan = ?';
  connection.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error deleting KepemilikanSenjata:', err);
      return res.status(500).json({ status: false, message: 'Server Error' });
    }
    return res.status(200).json({ status: true, message: 'Ownership deleted successfully' });
  });
});

module.exports = router;
