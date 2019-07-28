import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

import Tooltip from '@material-ui/core/Tooltip';

function IngredientTooltip(props){//IT IS USED IN MenuItem.js
    return(
        <Tooltip title={props.title}>
            <Button variant="contained" color="primary" >
              {props.title}
            </Button>
      </Tooltip>
    )
}

export default IngredientTooltip;
