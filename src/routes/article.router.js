import { Router } from 'express';
import {
  createArticle,
  updateArticleById,
  deleteArticleById,
  getArticles,
} from '../controllers/article.controller.js';

const articleRouter = Router();

articleRouter
  .get('/', getArticles)
  .post('/', createArticle)
  .put('/:id', updateArticleById)
  .delete('/:id', deleteArticleById);

export default articleRouter;

