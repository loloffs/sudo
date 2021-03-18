import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const PurpleSwitch = withStyles({
  switchBase: {
    color: "#72acb1",
    '&$checked': {
      color: "#72acb1",
    },
    '&$checked + $track': {
      backgroundColor: "#72acb1",
    },
  },
  checked: {},
  track: {},
})(Switch);


export default function CustomizedSwitches(props) {
  // const [darkMode, setDarkMode] = React.useState(false);

  // const handleChange = () => {
  //   setDarkMode(!darkMode);
  // };

  return (
    <FormGroup>
      <FormControlLabel
        control={<PurpleSwitch checked={props.darkMode} onChange={() => props.toggleDarkMode()} />}
        label=""
      />
    </FormGroup>
  );
}

