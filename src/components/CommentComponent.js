import React, { Component } from 'react'

import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {deleteComment} from '../actions/CommentsAction';
import style from '../style';

class Comment extends Component {
  handleEditComment = event => {
    event.preventDefault()
    this.props.onCommentEdit(this.props.commentdetails)    
  }

  handleDeleteComment = event => {
    event.preventDefault()
    this.props.deleteComment(this.props.commentdetails._id)
  }

  render() {
    let comment = this.props.commentdetails
    return (
      <div style={style.commentBox} key={comment._id}>
          <h3 style={style.heading}>{comment.author}</h3>
          <p style={style.text}>{comment.text}</p>
          <button style={style.button} onClick={this.handleEditComment}>Edit</button>
          <button style={style.button} onClick={this.handleDeleteComment}>Delete</button>
      </div>
    )
  }
}

Comment.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  comments: PropTypes.array.isRequired,
  comment: PropTypes.object
}

const mapStateToProps = state => {
  return {comments: state.comments, comment: state.comment}
}

export default connect(mapStateToProps, {deleteComment})(Comment)