import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import LikeOutline from './icons/LikeOutline.jsx';
import DislikeOutline from './icons/DislikeOutline.jsx'
import LikeFilled from './icons/LikeFilled.jsx'
import DislikeFilled from './icons/DislikeFilled.jsx'
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
/*
    handleSubmit(){
        let comment = this.state.commentText
        let route = `/putcomment/${this.props.data.name}/${this.props.data.zip}`

        this.updateComments(route, this.props.data)
    }
*/
/*
    updateComments(route,data){
        fetch(route,{
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => this.setState((prevState,props)=>{
                return {commentsList:prevState.commentsList.concat(data)}
                })
            )
            .catch(error => console.log(`Error in commentsList: ${error}`))
    }
*/

    getLikes(){
        let route = `/getlikes/${this.props.data.name}/${this.props.data.zip}`

    }

    handleLike(){

    }
    handleDisLike(){

    }
    render(){
        let commentRoute = `/postcomment/${this.props.data.name}/${this.props.data.zip}`
        let activeUser = this.props.activeUser
        let restaurant = {name:this.props.data.name, zip:this.props.data.zip}


        console.log(`commentsList is : ${this.state.commentsList}`)
        if (this.state.commentsList.indexOf(this.props.activeUser)>= 0){
            return(
                this.state.commentsList.map((comment)=>{
                    return(
                        <div>
                            <Link to={`/regprofile/${comment.user}`}>
                                <p id="commentText"> <strong>{comment.user}</strong> </p>
                            </Link><br />
                            <Comment activeUser={activeUser} restaurant={restaurant} user={comment.user} text={comment.text} date={comment.posted_at} likes={comment.Likes} dislikes={comment.DisLikes} />

                        </div>
                    )
                })
            )
        } else{
            return(
                <div>
                    {this.state.commentsList.map((comment)=>{
                        return(
                            <Comment activeUser={activeUser} restaurant={restaurant} user={comment.user} text={comment.text} date={comment.posted_at} likes={comment.Likes} dislikes={comment.DisLikes} />
                        )
                    })}
                    <PostComment action={this.handleChange} name={this.props.data.name} zip={this.props.data.zip}/>
                </div>

            )
        }
    }
}

export default CommentsBox;
