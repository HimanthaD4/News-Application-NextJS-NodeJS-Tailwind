const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  articleHead: {
    type: String,
    required: true
  },
  articleDescription: {
    type: String,
    required: true
  },
  image: {
    data: Buffer,  // Store binary image data
    contentType: String  // Store image content type (e.g., image/jpeg, image/png)
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Article', articleSchema);
