import { useState, useEffect } from 'react';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

type Props = {label: string, initialCheckState:boolean, handleChange:(arg:boolean)=>void}

function MySwitch({label, initialCheckState, handleChange}:Props) {
  const [isChecked, setIsChecked] = useState(false);

  const handleSwitchChange = () => {
    setIsChecked(!isChecked);
    handleChange(isChecked)
  };

  useEffect(()=>{setIsChecked(initialCheckState)}, [initialCheckState])

  return (
    <>
      <FormControlLabel
        control={<Switch inputProps={{height:1}} checked={isChecked} onChange={handleSwitchChange} />}
        label={label}
      />
    </>
  );
}

export default MySwitch;
