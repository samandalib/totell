import React, {Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';

class ImageAvatar extends Component{
    constructor(props){
        super(props)

    }
    render(){
        const style = {
            margin: 10,
            width: 60,
            height: 60,
        }
        return(
            <Grid container justify="center" alignItems="center">
              <Avatar alt="Remy Sharp" src={this.props.image} />
            </Grid>
        )
    }
}

export default ImageAvatar;
