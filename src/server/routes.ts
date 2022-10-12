import * as express from 'express';
import { RequestHandler } from 'express';
const fs = require('fs');
const cheeses = require('./data/cheeses.json');

const router = express.Router();
router.use(express.json() as RequestHandler);

router.get('/api/cheeses', (req, res, next) => {
    res.json(cheeses);
});

router.post('/api/purchases', (req, res, next) => {

  console.log(req.body)

  try {
      let rawdata = fs.readFileSync('src/server/data/purchases.json');
      let purchases = JSON.parse(rawdata);
      console.log('purchases are', purchases);

      let newPayment = { id: purchases.length + 1, ...req.body}

      console.log('newPayment', newPayment)

      purchases.push(newPayment);

      console.log(purchases)

      fs.writeFileSync('src/server/data/purchases.json', JSON.stringify(purchases, null, 4));

      res.status(200).send('purchase saved');
    } catch (err) {
      console.log('there is a server error', err)
      res.status(500).send({ error: 'failed to process purchase' })
    }
});




export default router;
