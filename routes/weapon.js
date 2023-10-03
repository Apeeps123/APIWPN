const express = require('express');
const router = express.Router();
const connection = require('../config/db');

router.get('/', (req, res) => {
    const query = 'SELECT s.Nama_Senjata as Weapon, js.Nama_JenisSenjata as Type, ms.Nama_MerekSenjata as Brand, f.Nama_Faction as Faction FROM Senjata s LEFT JOIN JenisSenjata js ON s.ID_JenisSenjata = js.ID_JenisSenjata LEFT JOIN MerekSenjata ms ON s.ID_MerekSenjata = ms.ID_MerekSenjata LEFT JOIN Faction f ON s.ID_Faction = f.ID_Faction';
  
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Error retrieving Senjata data:', err);
        return res.status(500).json({ status: false, message: 'Server Error' });
      }
      return res.status(200).json({ status: true, data: results });
    });
  });
  
  

router.post('/', (req, res) => {
  const { Nama_Senjata, Tahun_Produksi, ID_JenisSenjata, ID_MerekSenjata, ID_Faction } = req.body;
  const query =
    'INSERT INTO Senjata (Nama_Senjata, Tahun_Produksi, ID_JenisSenjata, ID_MerekSenjata, ID_Faction) VALUES (?, ?, ?, ?, ?)';
  connection.query(
    query,
    [Nama_Senjata, Tahun_Produksi, ID_JenisSenjata, ID_MerekSenjata, ID_Faction],
    (err, result) => {
      if (err) {
        console.error('Error creating new Senjata:', err);
        return res.status(500).json({ status: false, message: 'Server Error' });
      }
      return res.status(201).json({ status: true, message: 'Weapon created successfully' });
    }
  );
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { Nama_Senjata, Tahun_Produksi, ID_JenisSenjata, ID_MerekSenjata, ID_Faction } = req.body;
  const query =
    'UPDATE Senjata SET Nama_Senjata = ?, Tahun_Produksi = ?, ID_JenisSenjata = ?, ID_MerekSenjata = ?, ID_Faction = ? WHERE ID_Senjata = ?';
  connection.query(
    query,
    [Nama_Senjata, Tahun_Produksi, ID_JenisSenjata, ID_MerekSenjata, ID_Faction, id],
    (err, result) => {
      if (err) {
        console.error('Error updating Senjata:', err);
        return res.status(500).json({ status: false, message: 'Server Error' });
      }
      return res.status(200).json({ status: true, message: 'Weapon updated successfully' });
    }
  );
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM Senjata WHERE ID_Senjata = ?';
  connection.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error deleting Senjata:', err);
      return res.status(500).json({ status: false, message: 'Server Error' });
    }
    return res.status(200).json({ status: true, message: 'Weapon deleted successfully' });
  });
});

module.exports = router;
