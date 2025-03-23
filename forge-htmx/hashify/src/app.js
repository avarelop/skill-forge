import crypto from 'crypto';
import express from 'express';

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));

// Define the list of supported hash algorithms
const SUPPORTED_ALGORITHMS = [
  'md5',
  'sha1', 
  'sha256',
  'sha512',
  'sha3',
  'ripemd160'
];

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: './public' });
});

app.post('/hash', (req, res) => {
  const input = req.body['input'] || '';
  const algorithm = req.body['algorithm'] || 'sha256';

  console.log(req.body);

  if (input.length === 0) {
    res.send(`<p id="result">Please enter some text</p>`);
    return;
  }

  // Validate the algorithm
  if (!SUPPORTED_ALGORITHMS.includes(algorithm)) {
    res.send(`<p id="result">Invalid hashing algorithm: ${algorithm}</p>`);
    return;
  }

  try {
    // Create hash using the selected algorithm
    const hash = crypto.createHash(algorithm)
      .update(input)
      .digest('hex');

    res.send(`<p id="result">${hash}</p>`);
  } catch (error) {
    console.error('Hashing error:', error);
    res.send(`<p id="result">Error generating hash: ${error.message}</p>`);
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
