import React, { useState } from 'react';

function AddAssignment() {
    const [question, setQuestion] = useState('');
    const [option1, setOption1] = useState('');
    const [option2, setOption2] = useState('');
    const [option3, setOption3] = useState('');
    const [option4, setOption4] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // TODO: add logic to submit question and options to database
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Question:
                    <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} />
                </label>
                <br />
                <label>
                    Option 1:
                    <input type="text" value={option1} onChange={(e) => setOption1(e.target.value)} />
                </label>
                <br />
                <label>
                    Option 2:
                    <input type="text" value={option2} onChange={(e) => setOption2(e.target.value)} />
                </label>
                <br />
                <label>
                    Option 3:
                    <input type="text" value={option3} onChange={(e) => setOption3(e.target.value)} />
                </label>
                <br />
                <label>
                    Option 4:
                    <input type="text" value={option4} onChange={(e) => setOption4(e.target.value)} />
                </label>
                <br />
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default AddAssignment;
