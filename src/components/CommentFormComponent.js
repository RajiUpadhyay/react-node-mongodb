import React, { Component } from 'react'

import { addArticle } from '../actions/CommentsAction'
import style from '../style'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {addCommentToDB} from '../actions/CommentsAction'

class CommentForm extends Component {
  addComment = event => {
    event.preventDefault()
    const comment = { author: event.target.author.value, text: event.target.text.value }
    event.target.author.value = ''
    event.target.text.value = ''
    if(!comment.author || !comment.text) return
    this.props.addCommentToDB(comment)
  }
  render() {
    return (
      <form onSubmit={this.addComment} style={style.form}>
        <input style={style.input} type="text" name="author" placeholder="Author..." />
        <textarea style={style.textarea} name="text" placeholder="Text..." />
        <input type="submit" value="Add" />
      </form>
    )
  }
}

CommentForm.propTypes = {
  addCommentToDB: PropTypes.func.isRequired,
  comments: PropTypes.array,
  comment: PropTypes.object
}

const mapStateToProps = state => {
  return {comments: state.comments, comment: state.comment}
}

export default connect(mapStateToProps, {addCommentToDB})(CommentForm)