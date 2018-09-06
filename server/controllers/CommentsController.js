const commentsService = require('../services/CommentsService');

exports.getComments = (req, res) => {
  let comments = commentsService.getComments();
  comments.then((results) => {
    res.send({ status: true, data: results });
  });
}

exports.createComment = (req, res) => {
  let createComment = commentsService.createComment({author, text} = req.body);
  createComment.then((results) => {
    res.send({ status: true, message: '', comment: results });
  });
}

exports.deleteComment = (req, res) => {
  let deleteComment = commentsService.deleteComment({commentId} = req.params);
  deleteComment.then((results) => {
    res.send({ status: true, message: '', comment: results });
  });
}