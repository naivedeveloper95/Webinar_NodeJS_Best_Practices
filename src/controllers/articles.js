const { Article, User, Comment } = require('../models/db')

async function createArticle (title, content, authorId) {
  if (typeof title !== 'string' || title.length < 1) {
    throw new Error('Title empty or undefined')
  }
  if (typeof content !== 'string' || content.length < 1) {
    throw new Error('Content empty or undefined')
  }
  if (typeof authorId !== 'number') {
    throw new Error('Author of article not defined')
  }
  try {
    return await Article.create({
      title, content, authorId
    })
  } catch (e) {
    throw e
  }
}

async function fetchArticles () {
  try {
    return await Article.findAll({
      include: [
        { model: User, as: 'author', attributes: ['username'] }
      ]
    })
  } catch (e) {
    throw (e)
  }
}

async function fetchArticleById (articleId) {
  try {
    return await Article.findById(articleId, {
      include: [
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: [ 'username' ]
            }
          ]
        }
      ]
    })
  } catch (e) {
    throw e
  }
}

module.exports = {
  createArticle,
  fetchArticles,
  fetchArticleById
}
