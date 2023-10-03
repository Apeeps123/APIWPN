const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000; 

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const typeRouter = require('./routes/type');
const factionRouter = require('./routes/faction');
const memberRouter = require('./routes/factionmb');
const brandRouter = require('./routes/brand');
const weaponRouter = require('./routes/weapon');
const ownerRouter = require('./routes/owner');
const ownershipRouter = require('./routes/ownership');

app.use('/api/type', typeRouter);
app.use('/api/faction', factionRouter);
app.use('/api/factionmb', memberRouter);
app.use('/api/brand', brandRouter);
app.use('/api/weapon', weaponRouter);
app.use('/api/owner', ownerRouter);
app.use('/api/ownership', ownershipRouter);

app.listen(port, () => {
  console.log(`Server running http://localhost:${port}`);
});
