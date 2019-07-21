import React, {Component} from 'react';
import {Link} from 'react-router-dom';
class CommentsBox extends Component{
    constructor(props){
        super(props)
        let data = this.props.data
        let comments = data.comments
        this.state = {
            commentText:"",
            commentsList:comments, updatedData:[]
        }
        this.handleChange= this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e){
        let commentText = e.target.value
        this.setState({commentText:commentText})
    }
    handleSubmit(){
        let comment = this.state.commentText
        let route = `/putcomment/${this.props.data.name}/${this.props.data.zip}`

        this.updateComments(route, this.props.data)
    }
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

    componentDidMount(){
    }
    render(){
        let commentRoute = `/putcomment/${this.props.data.name}/${this.props.data.zip}`

        console.log(`commentsList is : ${this.state.commentsList}`)
        if (this.state.commentsList.indexOf(this.props.activeUser)>= 0){
            return(
                this.state.commentsList.map((comment)=>{
                    return(
                        <div>
                            <Link to={`/regprofile/${comment.user}`}>
                                <p id="commentText"> <strong>{comment.user}</strong> </p>
                            </Link><br />
                            <p>{comment.text}</p>
                            <p>{comment.posted_at}</p>
                            <p> {comment.usersLiked.length-1} agree with this comment </p>

                        </div>
                    )
                })
            )
        } else{
            return(
                <div>
                    {this.state.commentsList.map((comment)=>{
                        return(
                            <div>
                                <Link to={`/regprofile/${comment.user}`}>
                                    <p id="commentText"> <strong>{comment.user}</strong></p>
                                </Link><br />
                                <p>{comment.text}</p>
                                <p>{comment.posted_at}</p>
                                <p> {comment.usersLiked.length-1} agree with this comment </p>
                            </div>
                        )
                    })}
                    <form action={commentRoute} method="PUT">
                        <textarea name="commentText" onChange={this.handleChange} className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                        <button type="submit">Post</button>
                    </form>
                </div>

            )
        }
    }
}

export default CommentsBox;
