import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
    title: { type: String, required: true, minLength: 5, maxLength: 400, trim: true },
    subtitle: { type: String, minLength: 5, trim: true },
    description: { type: String, required: true, minLength: 5, maxLength: 5000 },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    category: { type: String, enum: ['sport', 'games', 'history'], required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const Article = mongoose.model('Article', articleSchema);

export { Article }; 