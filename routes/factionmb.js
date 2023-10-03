const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const connection = require('../config/db');

router.get('/', (req, res) => {
    const query = `
      SELECT AnggotaFaction.ID_Anggota, AnggotaFaction.Nama_Anggota as Nama, Faction.Nama_Faction as Faction
      FROM AnggotaFaction
      JOIN Faction ON AnggotaFaction.ID_Faction = Faction.ID_Faction
    `;
    
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Error retrieving AnggotaFaction data:', err);
        return res.status(500).json({ status: false, message: 'Server Error' });
      }
      return res.status(200).json({ status: true, data: results });
    });
  });
  

router.post('/', (req, res) => {
  const { Nama_Anggota, ID_Faction } = req.body;
  const query = 'INSERT INTO AnggotaFaction (Nama_Anggota, ID_Faction) VALUES (?, ?)';
  connection.query(query, [Nama_Anggota, ID_Faction], (err, result) => {
    if (err) {
      console.error('Error creating new AnggotaFaction:', err);
      return res.status(500).json({ status: false, message: 'Server Error' });
    }
    return res.status(201).json({ status: true, message: 'Member created successfully' });
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { Nama_Anggota, ID_Faction } = req.body;
  const query = 'UPDATE AnggotaFaction SET Nama_Anggota = ?, ID_Faction = ? WHERE ID_Anggota = ?';
  connection.query(query, [Nama_Anggota, ID_Faction, id], (err, result) => {
    if (err) {
      console.error('Error updating AnggotaFaction:', err);
      return res.status(500).json({ status: false, message: 'Server Error' });
    }
    return res.status(200).json({ status: true, message: 'Member updated successfully' });
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM AnggotaFaction WHERE ID_Anggota = ?';
  connection.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error deleting AnggotaFaction:', err);
      return res.status(500).json({ status: false, message: 'Server Error' });
    }
    return res.status(200).json({ status: true, message: 'Member deleted successfully' });
  });
});

module.exports = router;
