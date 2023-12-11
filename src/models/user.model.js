import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true, minLength: 4, maxLength: 50, trim: true },
    lastName: { type: String, required: true, minLength: 3, maxLength: 60, trim: true },
    fullName: { type: String },
    email: { type: String, required: true, unique: true, lowercase: true, validate: /\S+@\S+\.\S+/ },
    role: { type: String, enum: ['admin', 'writer', 'guest'], required: true },
    age: { type: Number, min: 1, max: 99, default: 1 },
    numberOfArticles: { type: Number, default: 0 },
    articles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Article' }], // Добавлено поле articles
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

userSchema.pre('save', function (next) {
    this.fullName = `${this.firstName} ${this.lastName}`;
    next();
});

const User = mongoose.model('User', userSchema);

export { User }; 
