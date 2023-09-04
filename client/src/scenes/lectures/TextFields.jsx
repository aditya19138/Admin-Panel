import React,{useState} from 'react';
import { TextField } from "@mui/material";


function TextFields({ memberIndex, arr }) {
    
    const [subHeading, setSubHeading] = useState('')

    const handelChange = (value) => {
        console.log(memberIndex)
        const arrayOfStrings = value.split('\n\n');
        arr[memberIndex] = { subHeading: subHeading, paragraphs: arrayOfStrings, image: '' };
        console.log(arr);
    }
  
    return (
        <div className='textFieldBox'>
             <TextField
                placeholder="Add Subheading"
                multiline
                fullWidth
                id='testfield'
                onChange={(e) => { setSubHeading(e.target.value) }}
            />
            <TextField
                placeholder="Add SubPara"
                multiline
                fullWidth
                rows={10}
                id='testfield'
                onChange={(e) => { handelChange(e.target.value) }}
            />
        </div>
    );
}
export default TextFields