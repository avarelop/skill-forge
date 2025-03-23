import crypto from 'crypto';
import express from 'express';

const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: './public' });
});

app.post('/hash', (req, res) => {
  const textInput = req.body['text-input'] || '';

  if (textInput.length === 0) {
    res.send(`<p id="result">Please enter some text</p>`);
    return;
  }
  
  // Create SHA-512 hash from the input text
  const hash = hashString(textInput, 'utf8', 'sha512');
  
  res.send(`<p id="result">${hash}</p>`);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

function hashString(input, inputEncoding, hashAlgorithm) {
  try {
    const hash = crypto.createHash(hashAlgorithm);
    hash.update(input, inputEncoding);
    return hash.digest('hex');
  } catch (error) {
    console.error("Error generating hash:", error);
    return null;
  }
}
