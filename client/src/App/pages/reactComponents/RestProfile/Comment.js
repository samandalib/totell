import React, {Component} from 'react'
import {Link} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import LikeOutline from './icons/LikeOutline.jsx';
import DislikeOutline from './icons/DislikeOutline.jsx'
import LikeFilled from './icons/LikeFilled.jsx'
import DislikeFilled from './icons/DislikeFilled.jsx'

class Comment extends Component{
    constructor(props){
        super(props)
        this.state={likeStatus:0, dislikeStatus:0}

        this.handleLike = this.handleLike.bind(this)
        this.handleDislike = this.handleDislike.bind(this)
    }

    checkLikeStatus(){
        let activeUser = this.props.activeUser
        let route =`/checklikestatus/${this.props.restaurant.name}/${this.props.restaurant.zip}/${activeUser}`
    }

    handleLike(initialValue){

        if (this.state.likeStatus == 0 && this.state.dislikeStatus == 0){
            this.setState({likeStatus:1, dislikeStatus:0})
        } else if (this.state.likeStatus == 0 && this.state.dislikeStatus == 1){
            this.setState({likeStatus:1, dislikeStatus:0})
        }else{
            this.setState({likeStatus:0, dislikeStatus:0})
        }

    }
    handleDislike(){
        if (this.state.likeStatus == 0 && this.state.dislikeStatus == 0){
            this.setState({likeStatus:0, dislikeStatus:1})
        } else if (this.state.likeStatus ==1 && this.state.dislikeStatus == 0){
            this.setState({likeStatus:0, dislikeStatus:1})
        }else{
            this.setState({likeStatus:0, dislikeStatus:0})
        }
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
                        <p id="commentText"> <strong>{this.props.user}</strong></p>
                    </Link>
                    <Typography variant="body2" gutterBottom>{this.props.text}</Typography>
                    <Typography variant="caption" display="block" gutterBottom>{this.props.date}</Typography>
                    <Typography variant="caption" display="block" gutterBottom> {this.props.likes} Likes </Typography>
                    <Typography variant="caption" display="block" gutterBottom> {this.props.dislikes} Disikes </Typography>

                    <LikeOutline action={this.handleLike} />
                    <DislikeOutline action={this.handleDislike} />
                </div>

            )
        } else if (this.state.likeStatus==1){
            return(
                <div>
                    <Link to={`/regprofile/${this.props.user}`}>
                        <p id="commentText"> <strong>{this.props.user}</strong></p>
                    </Link>
                    <Typography variant="body2" gutterBottom>{this.props.text}</Typography>
                    <Typography variant="caption" display="block" gutterBottom>{this.props.date}</Typography>
                    <Typography variant="caption" display="block" gutterBottom> {this.props.like} Likes </Typography>
                    <Typography variant="caption" display="block" gutterBottom> {this.props.dislike} Disikes </Typography>
                    <LikeFilled action={this.handleLike} />
                    <DislikeOutline action={this.handleDislike} />
                </div>

            )
        } else if (this.state.dislikeStatus == 1){
            return (
                <div>
                    <Link to={`/regprofile/${this.props.user}`}>
                        <p id="commentText"> <strong>{this.props.user}</strong></p>
                    </Link>
                    <Typography variant="body2" gutterBottom>{this.props.text}</Typography>
                    <Typography variant="caption" display="block" gutterBottom>{this.props.date}</Typography>
                    <Typography variant="caption" display="block" gutterBottom> {this.props.like} Likes </Typography>
                    <Typography variant="caption" display="block" gutterBottom> {this.props.dislike} Disikes </Typography>
                    <LikeOutline action={this.handleLike} />
                    <DislikeFilled action={this.handleDislike} />
                </div>
            )
        }
    }
}

export default Comment;
