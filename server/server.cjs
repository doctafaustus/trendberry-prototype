const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');

const app = express();
const port = 3001;

// Cloudstore config
let serviceAccount = process.env.SERVICE_ACCOUNT_KEY;
if (!process.env.PORT) {
  serviceAccount = require('../private/serviceAccountKey.json');
} else {
  serviceAccount = JSON.parse(serviceAccount);
}
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
const db = admin.firestore();


// Allow CORS requests locally
if (!process.env.PORT) {
  app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:3001'],
    methods: ['GET', 'POST'],
    credentials: true 
  }));
}


app.get('/api', (req, res) => {
  res.send('Hellow from Express!');
});

app.get('/api/products/:id?', async (req, res) => {
  const { id } = req.params;
  
  try {
    const products = await getProducts(id);
    res.json(products);
  } catch (error) {
    console.error('Error getting documents: ', error);
    res.status(500).send('Error getting products');
  }
});

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});


async function getProducts(id) {
  const collectionRef = db.collection('products');
  
  try {
    if (id) {
      // Get a single product by id
      const productDoc = await collectionRef.doc(id).get();
      
      if (!productDoc.exists) {
        console.log(`No product found with id: ${id}`);
        return { error: `No product found with id: ${id}` };
      }
      
      return { id: productDoc.id, ...productDoc.data() };
    } else {
      // Get all products
      const products = [];
      const snapshot = await collectionRef.get();

      if (snapshot.empty) {
        console.log('No matching documents.');
        return products;
      }

      snapshot.forEach(doc => {
        products.push({ id: doc.id, ...doc.data() });
      });

      return products;
    }
  } catch (error) {
    console.error('Error getting documents: ', error);
    throw error;
  }
}