const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('debug', true);

const TaskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ['pending', 'in progress', 'completed'], default: 'pending' },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('Task', TaskSchema);