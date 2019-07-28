import React, {Component} from 'react'
import {Link} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import LikeOutline from './icons/LikeOutline.jsx';
import DislikeOutline from './icons/DislikeOutline.jsx'
import LikeFilled from './icons/LikeFilled.jsx'
import DislikeFilled from './icons/DislikeFilled.jsx'
import PhotoName from '../RegProfile/PhotoName.js'

class Comment extends Component{
    constructor(props){
        super(props)
        let likesCount = this.props.likes.length
        let dislikesCount = this.props.dislikes.length
        this.state={likeStatus:0, dislikeStatus:0,
            likesCount:likesCount, dislikesCount:dislikesCount,
        }

        this.handleLike = this.handleLike.bind(this)
        this.handleDislike = this.handleDislike.bind(this)
    }

    checkLikeStatus(){
        let activeUser = this.props.activeUser
        let route =`/checklikestatus/${this.props.restaurant.name}/${this.props.restaurant.zip}/${activeUser}`
    }

    handleLike(){

        if (this.state.likeStatus == 0 && this.state.dislikeStatus == 0){//if the user never rate the comment before
            this.updateLikes(1)
            this.setState((prevState, props)=>{
                return {likesCount:prevState.likesCount+1, likeStatus:1, dislikeStatus:0}
            })
        } else if (this.state.likeStatus == 0 && this.state.dislikeStatus == 1){
            this.updateLikes(1)
            this.setState((prevState, props)=>{
                return {likesCount:prevState.likesCount+1, dislikesCount:prevState.dislikesCount-1,
                     likeStatus:1, dislikeStatus:0
                 }
            })
        }else{
            this.updateLikes(0)
            this.setState((prevState,props)=>{
                return {likesCount:prevState.likesCount-1, dislikesCount:0,
                 likeStatus:0, dislikeStatus:0}
             })
        }
    }

    updateLikes(like_status){
        let comment_id = this.props.id
        let route = `/putlikescount/${this.props.restaurant}/${comment_id}/${like_status}`
        console.log(`route to updateLikes ${route}`)

        fetch(route,{
            method: 'PUT',
            //body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res=>{
                res.json()
                console.log('res at updateLikes ', res)
            })
            .then(data=>console.log('likes count updated on database'))
            .catch(error=>console.log('error in updateLikes', error))
    }

    handleDislike(){
        if (this.state.likeStatus == 0 && this.state.dislikeStatus == 0){
            this.updateLikes(-1)
            this.setState((prevState, props)=>{
                return {dislikesCount:prevState.dislikesCount+1, likeStatus:0, dislikeStatus:1}
            })
        } else if (this.state.likeStatus ==1 && this.state.dislikeStatus == 0){
            this.updateLikes(-1)
            this.setState((prevState, props)=>{
                return {likesCount:prevState.likesCount-1, dislikesCount:prevState.dislikesCount+1,
                     likeStatus:0, dislikeStatus:1
                 }
            })
        }else if (this.state.likeStatus ==0 && this.state.dislikeStatus == 1){
            this.updateLikes(0)
            this.setState((prevState,props)=>{
                 return{likesCount:0, dislikesCount:prevState.dislikesCount-1,
                     likeStatus:0, dislikeStatus:0}
                 })
        }
    }

    updateDisLikes(dislike_status){
        let comment_id = this.props.id
        let route = `/putlikescount/${this.props.restaurant}/${comment_id}/${dislike_status}`
        console.log(`route to updateDisLikes ${route}`)

        fetch(route,{
            method: 'PUT',
            //body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res=>res.json())
            .then(data=>console.log('likes count updated on database'))
            .catch(error=>console.log('error in updateDisLikes', error))
    }


    setInitialState(initialValue){
        if (initialValue ==1){
            this.setState({likeStatus:1, dislikeStatus:0})
        } else if (initialValue ==0){
            this.setState({likeStatus:0, dislikeStatus:0})
        } else if (initialValue = -1){
            this.setState({likeStatus:0, dislikeStatus:1})
        }

    }

    componentDidMount(){
        let initialValue
        if (this.props.likes.indexOf(this.props.activeUser)>=0){
            initialValue = 1
        } else if (this.props.dislikes.indexOf(this.props.activeUser)>=0){
            initialValue = -1
        } else{
            initialValue = 0
        }
        this.setInitialState(initialValue)
    }

    render(){


        if (this.state.likeStatus == 0 && this.state.dislikeStatus == 0){
            return(
                <div>
                  <Link to={`/regprofile/${this.props.user}`}>
                        <PhotoName username={this.props.user} />
                  </Link>
                  <Typography variant="body2" gutterBottom>{this.props.text}</Typography>
                  <Typography variant="caption" display="block" gutterBottom>{this.props.date}</Typography>
                  <Typography variant="caption" display="block" gutterBottom> {this.state.likesCount} Likes </Typography>
                  <Typography variant="caption" display="block" gutterBottom> {this.state.dislikesCount} Disikes </Typography>
                  <LikeOutline action={this.handleLike} />
                  <DislikeOutline action={this.handleDislike} />

                </div>

            )
        } else if (this.state.likeStatus==1){
            return(
                <div>
                    <Link to={`/regprofile/${this.props.user}`}>
                        <PhotoName username={this.props.user} />
                    </Link>
                    <Typography variant="body2" gutterBottom>{this.props.text}</Typography>
                    <Typography variant="caption" display="block" gutterBottom>{this.props.date}</Typography>
                    <Typography variant="caption" display="block" gutterBottom> {this.state.likesCount} Likes </Typography>
                    <Typography variant="caption" display="block" gutterBottom> {this.state.dislikesCount} Disikes </Typography>
                    <LikeFilled action={this.handleLike} />
                    <DislikeOutline action={this.handleDislike} />
                </div>

            )
        } else if (this.state.dislikeStatus == 1){
            return (
                <div>
                    <Link to={`/regprofile/${this.props.user}`}>
                        <PhotoName username={this.props.user} />
                    </Link>
                    <Typography variant="body2" gutterBottom>{this.props.text}</Typography>
                    <Typography variant="caption" display="block" gutterBottom>{this.props.date}</Typography>
                    <Typography variant="caption" display="block" gutterBottom> {this.state.likesCount} Likes </Typography>
                    <Typography variant="caption" display="block" gutterBottom> {this.state.dislikesCount} Disikes </Typography>
                    <LikeOutline action={this.handleLike} />
                    <DislikeFilled action={this.handleDislike} />
                </div>
            )
        }
    }
}

export default Comment;
