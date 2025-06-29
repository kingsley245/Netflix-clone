const logger = require('./logger');
const sendErrorMail = require('./mailer');

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const axios = require('axios');
const cron = require('node-cron');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB error:', err));

// Example schema
const videoSchema = new mongoose.Schema({
  title: String,
  url: String,
  thumbnail: String,
  publishedAt: Date,
  videoId: String
});

const Video = mongoose.model('Video', videoSchema);

// Random topics to rotate daily
const searchTopics = [
  'Nigerian Cartoons',
  'Nollywood Trailers',
  'African Folktales',
  'Funny Nigerian Animations',
  'Nigerian Comedy Skits',
  'New Naija Cartoons 2025',
  'African Animation Shorts',
  'Kids Animation Nigeria'
];

const fetchAndSaveVideos = async (query) => {
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=6&q=${encodeURIComponent(
    query
  )}&key=${process.env.YOUTUBE_API_KEY}`;

  try {
    const response = await axios.get(url);
    const items = response.data.items;

    for (const item of items) {
      const exists = await Video.findOne({ videoId: item.id.videoId });
      if (!exists) {
        await Video.create({
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails.high.url,
          videoId: item.id.videoId,
          publishedAt: item.snippet.publishedAt
        });
        logger.info(`Saved: ${item.snippet.title}`);
      } else {
        logger.info(`Skipped: ${item.snippet.title}`);
      }
    }
  } catch (error) {
    const msg = `Fetch failed for "${query}" - ${error.message}`;
    logger.error(msg);
    await sendErrorMail(msg);
  }
};

// Manual fetch endpoint
app.get('/fetch-and-save', async (req, res) => {
  const query =
    req.query.q ||
    searchTopics[Math.floor(Math.random() * searchTopics.length)];
  await fetchAndSaveVideos(query);
  res.status(200).json({ message: `Fetched and saved videos for: ${query}` });
});

// Daily Cron Job – runs every day at 10:00 AM
cron.schedule('0 10 * * *', async () => {
  const randomTopic =
    searchTopics[Math.floor(Math.random() * searchTopics.length)];
  console.log(`🌅 Running daily fetch for topic: ${randomTopic}`);
  await fetchAndSaveVideos(randomTopic);
});

// All Routes
app.get('/videos', async (req, res) => {
  const videos = await Video.find().sort({ publishedAt: -1 });
  res.json(videos);
});

app.post('/videos', async (req, res) => {
  const newVideo = new Video(req.body);
  await newVideo.save();
  res.json(newVideo);
});

// updating by id
app.put('/videos/:id', async (req, res) => {
  console.log('PUT request received for:', req.params.id);
  console.log('Update body:', req.body);

  try {
    const updatedVIdeo = await Video.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedVIdeo)
      return res.status(404).json({ error: 'Video not found' });
    res.json(updatedVIdeo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update video' });
  }
});
// delete by id
app.delete('/videos/:id', async (req, res) => {
  console.log('🗑️ DELETE request received:', req.params.id);
  try {
    const deleted = await Video.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Video not found' });

    res.json({ message: 'Video deleted' });
  } catch (error) {
    console.error('Delete Error:', error.message);
    res.status(500).json({ error: 'Failed to delete video' });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🚀 Server running on port ${PORT}`);
  logger.info(`🚀 Server started on port ${PORT}`);
});
