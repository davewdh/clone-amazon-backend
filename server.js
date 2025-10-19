import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import userRouter from './routers/userRouter.js'
import productRouter from './routers/productRouter.js'
import orderRouter from './routers/orderRouter.js'

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const connection_url = process.env.MONGODB_URI;

mongoose.connect(connection_url, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('MongoDB connected');

    // Keep-alive ping function
    async function keepAlive() {
      try {
        const admin = mongoose.connection.db.admin();
        const result = await admin.ping();
        console.log('MongoDB keep-alive ping successful:', result);
      } catch (err) {
        console.error('MongoDB keep-alive ping failed:', err.message);
      }
    }

    // Ping once on startup
    keepAlive();

    // Ping every 5 days (in milliseconds)
    setInterval(keepAlive, 5 * 24 * 60 * 60 * 1000);
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

app.use(express.json());
app.use(cors());

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);

app.get('/api/config/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});

app.get('/', (req, res) => res.status(200).send('Hello, it is Amazon clone project.'));

app.listen(port, () => console.log(`Listening on localhost:${port}`));
