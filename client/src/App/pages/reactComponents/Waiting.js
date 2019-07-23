import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
  progress: {
    margin: theme.spacing(2),
  },
}));

export default function CircularIndeterminate() {
  const classes = useStyles();

  return (
    <div>

      <CircularProgress className={classes.progress} color="secondary" />
    </div>
  );
}


/*
import React, {Component} from 'react'

class Waiting extends Component{
    constructor(props){
        super(props)

    }
    render(){
        if (!this.props.status){
            return <p>Loading Data ... </p>
        } else{

        }

    }
}

export default Waiting;

*/
