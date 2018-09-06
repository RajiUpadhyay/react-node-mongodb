import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {fetchComments} from '../actions/CommentsAction';
import Comment from './CommentComponent';

import style from '../style';

class CommentBox extends Component {
    componentWillMount() {
        this.props.fetchComments()
    }

    handleEditComment = comment => {
    }

    render() {
        if(!this.props.comments) {
            return <div>Please Wait...</div>
        }
        const commentItems = this.props.comments.map(comment => {
            return <Comment key={comment._id} commentdetails={comment} onCommentEdit={this.handleEditComment} />
        })
        return (
            <div>
                {commentItems}
            </div>
        )
    }
}

CommentBox.propTypes = {
    fetchComments: PropTypes.func.isRequired,
    comments: PropTypes.array
}

const mapStateToProps = state => {
    return {comments: state.comments}
}

export default connect(mapStateToProps, {fetchComments})(CommentBox)