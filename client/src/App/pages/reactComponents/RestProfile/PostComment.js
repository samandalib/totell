import React , {Component} from 'react';

class PostComment extends Component{

    render(){

        let commentRoute = `/postcomment/${this.props.name}/${this.props.zip}`
        return(
            <div>
                <form action={commentRoute} method="POST">
                    <textarea name="commentText" onChange={this.props.action} className="form-control" id="exampleFormControl"></textarea>
                    <button id="signupbut" className="btn btn-primary" type="submit">Post</button>

                </form>
            </div>
        )
    }

}

export default PostComment;
