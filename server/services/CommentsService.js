const Comments = require('../models/CommentsModel');

exports.getComments = () => {
    return new Promise((resolve, reject) => {
        Comments.find((err, comments) => {
            if(err) return reject(err);
            resolve(comments)
        })
    });
}

exports.createComment = ({author, text}) => {
    return new Promise((resolve, reject) => {
        let comment = new Comments;
        comment.author = author;
        comment.text = text;
        comment.save(err => {
            if(err) return reject(err);
            resolve(comment);
        });
    });
}

exports.deleteComment = ({commentId}) => {
    return new Promise((resolve, reject) => {
        Comments.remove({_id: commentId}, (err, comment) => {
            if(err) return reject(err);
            resolve(comment);
        });
    });
}