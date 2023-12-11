import { Article } from '../models/article.model.js';
import { User } from '../models/user.model.js';

export const createArticle = async (req, res, next) => {
  try {
    const { owner, ...articleData } = req.body;

    const user = await User.findById(owner);
    if (!user) {
      return res.status(404).json({ message: 'Owner not found' });
    }

    const article = await Article.create({ owner, ...articleData });
    user.numberOfArticles += 1;
    await user.save();

    res.json(article);
  } catch (err) {
    next(err);
  }
};

export const updateArticleById = async (req, res, next) => {
  try {
    const { owner, ...articleData } = req.body;

    const user = await User.findById(owner);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const article = await Article.findByIdAndUpdate(req.params.id, articleData, { new: true });
    res.json(article);
  } catch (err) {
    next(err);
  }
};

export const getArticles = async (req, res, next) => {
  try {
    const { title, page = 1, limit = 10 } = req.query;

    let query = {};
    if (title) {
      query = { title: { $regex: title, $options: 'i' } };
    }

    const articles = await Article.find(query)
      .limit(limit)
      .skip((page - 1) * limit)
      .populate('owner', 'fullName email age -_id');

    res.json(articles);
  } catch (err) {
    next(err);
  }
};

export const deleteArticleById = async (req, res, next) => {
  try {
    const articleId = req.params.id;

    const article = await Article.findById(articleId);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    const userId = article.owner;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.numberOfArticles -= 1;
    await user.save();

    await Article.deleteOne({ _id: articleId }); // Используйте deleteOne для удаления статьи

    res.json(article);
  } catch (err) {
    next(err);
  }
};
