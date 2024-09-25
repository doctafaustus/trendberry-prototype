const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');
const cheerio = require('cheerio');

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


let fetch;
async function initializeFetch() {
  fetch = (await import('node-fetch')).default;
}

initializeFetch().catch(err => console.error(err));

app.use(express.json());

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

app.get('/api/products/:id/comments', async (req, res) => {
  const { id } = req.params;

  try {
    const collectionRef = db.collection('products').doc(id).collection('comments');
    const snapshot = await collectionRef.orderBy('createdAt', 'desc').get();

    const comments = [];
    if (!snapshot.empty) {
      snapshot.forEach(doc => {
        comments.push({ id: doc.id, ...doc.data() });
      });
    }

    res.json(comments);
  } catch (error) {
    console.error('Error getting comments: ', error);
    res.status(500).send('Error getting comments');
  }
});

app.post('/api/scrape', async (req, res) => {
  const { productUrl } = req.body;

  try {
    const response = await fetch(productUrl);
    const body = await response.text();
    const $ = cheerio.load(body);
    const brand = $('meta[property="og:site_name"]').attr('content');
    const productName = $('meta[property="og:title"]').attr('content');
    const description = $('meta[property="og:description"]').attr('content');
    const image = $('meta[property="og:image"]').attr('content');

    const product = {
      productUrl,
      brand,
      productName,
      description,
      image,
      upvotes: 1
    };

    res.json(product);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error submitting product');
  }
});


app.post('/api/submit', async (req, res) => {
  const { productData } = req.body;

  console.log('---------', productData);

  try {
    const collectionRef = db.collection('products');
    const productDataWithTimestamp = {
      ...productData,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      commentCount: 0
    };

    const docRef = await collectionRef.add(productDataWithTimestamp);
    const doc = await docRef.get();
    const docData = doc.data(); 

    res.json({ id: doc.id, ...docData });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error submitting product');
  }
});


app.post('/api/add-comment', async (req, res) => {
  const { productId, text, user } = req.body;

  console.log('---------', text, user);

  try {
    const productRef = db.collection('products').doc(productId);
    const collectionRef = productRef.collection('comments');
    const commentData = {
      text,
      user,
      createdAt: new Date().toISOString()
    };

    // Start a Firestore transaction
    await db.runTransaction(async (t) => {
      // Add the new comment
      const docRef = await collectionRef.add(commentData);
      const doc = await t.get(docRef);
      const docData = doc.data(); 

      // Increment the commentCount field of the product
      t.update(productRef, { commentCount: admin.firestore.FieldValue.increment(1) });

      res.json({ id: doc.id, ...docData });
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error submitting comment');
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
      const snapshot = await collectionRef.orderBy('createdAt', 'desc').get();

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


// async function getAllCommentsFromUser(userId) {
//   // Perform a collection group query on "comments" to get all comments across all products
//   const commentsSnapshot = await db.collectionGroup('comments')
//     .where('userId', '==', userId)
//     .get();

//   // Array to hold all comments from the user
//   let userComments = [];

//   commentsSnapshot.forEach((doc) => {
//     // Get the product ID from the parent document
//     const productId = doc.ref.parent.parent.id;

//     // Add each comment to the array, including the product ID
//     userComments.push({ ...doc.data(), productId });
//   });

//   console.log(`All comments from user ${userId}:`, userComments);
// }

// getAllCommentsFromUser('user123').catch(err => console.error(err));

