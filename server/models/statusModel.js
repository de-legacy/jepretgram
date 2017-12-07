const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const statusSchema = new Schema({
  caption: String,
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'Account',
  },
  image: String,
  createdAt: { type: Date, default: Date.now },
  likelist: [{
    type: Schema.Types.ObjectId,
    ref: 'Account',
  }],
  commentlist: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment',
  }],
});

const StatusModel = mongoose.model('Status', statusSchema);

module.exports = StatusModel;