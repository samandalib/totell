import React , {Component} from 'react';

class PostComment extends Component{

    render(){

        let commentRoute = `/postcomment/${this.props.name}/${this.props.zip}`
        return(
            <div>
                <form action={commentRoute} method="POST">
                    <input type="text" name="commentText" onChange={this.props.action} className="form-control" id="exampleFormControl" />
                    <button type="submit">Post</button>

                </form>
            </div>
        )
    }

}

export default PostComment;
