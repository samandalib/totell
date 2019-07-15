import React, {Component} from 'react';

class CommentsBox extends Component{
    constructor(props){
        super(props)
        this.state = {commentLoad:[]}
    }
    getComments(route){
        fetch(route)
            .then(res => res.json())
            .then(data => this.setState({commentLoad:this.state.commentLoad.concat(data)}))
            .catch(error => console.log(`Error in commentLoad: ${error}`))
    }
    componentDidMount(){
        let route = "/getcomments" + this.props.path
        console.log(`commentsPath is: ${route}`)
        this.getComments(route)
    }
    render(){
        return
    }
}

export default CommentsBox;
