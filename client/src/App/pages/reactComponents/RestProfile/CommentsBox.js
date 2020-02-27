import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import PostComment from './PostComment.js'
import Comment from './Comment.js'

class CommentsBox extends Component{
    constructor(props){
        super(props)
        let data = this.props.data
        let comments = data.comments
        this.state = {
            commentText:"",
            commentsList:comments, updatedData:[],
        }

        this.handleChange= this.handleChange.bind(this)
    }

    handleChange(e){
        let commentText = e.target.value
        this.setState({commentText:commentText})
    }

    render(){
        let commentRoute = `/postcomment/${this.props.data.name}/${this.props.data.zip}`
        let activeUser = this.props.activeUser
        let restaurant = this.props.data._id
        console.log(`commentsList is : ${this.state.commentsList}`)
        return(
            <div>
                {this.state.commentsList.map((comment)=>{
                    return(
                        <Comment activeUser={activeUser} restaurant={restaurant} id={comment._id} user={comment.user} text={comment.text} date={comment.posted_at} likes={comment.Likes} dislikes={comment.DisLikes} />
                    )
                })}
                <PostComment action={this.handleChange} name={this.props.data.name} zip={this.props.data.zip}/>
            </div>
        )
    }

}

export default CommentsBox;
