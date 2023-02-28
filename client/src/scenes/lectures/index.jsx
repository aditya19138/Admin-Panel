import React, { useState, useRef } from "react";
import {
    Box,
    TextField
} from "@mui/material";
import axios from "axios";
import { Editor } from '@tinymce/tinymce-react';

const Lectures = () => {
    // const { data, isLoading } = useGetProductsQuery();
    // const isNonMobile = useMediaQuery("(min-width: 1000px)");
    const [title, setTitle] = useState("");
    const [courseId, setCourseId] = useState("");
    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            console.log(title)
            // axios posst request to serve
            axios.post('http://localhost:5000/client/lecture/add', {
                no: 1,
                title: title,
                content: editorRef.current.getContent(),
                courseId: courseId
            })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

    };
    return (
        <>
            <TextField id="outlined-basic" label="Title" variant="outlined" onChange={(event) => setTitle(event.target.value)} />
            <TextField id="outlined-basic" label="CourseId" variant="outlined" onChange={(event) => setCourseId(event.target.value)} />
            <h2>Content</h2>
            <Editor apiKey='18njo3cex5ijqgdwlkqewqxzo8xxvuiln9hwtasdb5muxnth'
                onInit={(evt, editor) => editorRef.current = editor}
                initialValue="<p>This is the initial content of the editor.</p>"
                init={{
                    selector: 'textarea#local-upload',
                    plugins: 'image code',
                    toolbar: 'undo redo | image code| formatselect | ' +
                        'bold italic backcolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',

                    /* without images_upload_url set, Upload tab won't show up*/
                    images_upload_url: 'postAcceptor.php',

                    /* we override default upload handler to simulate successful upload*/
                    images_upload_handler: function (blobInfo, success, failure) {
                        setTimeout(function () {
                            /* no matter what you upload, we will turn it into TinyMCE logo :)*/
                            success('http://moxiecode.cachefly.net/tinymce/v9/images/logo.png');
                        }, 2000);
                    },
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
            />
            <button onClick={log}>Log editor content</button>
        </>
    );
};

export default Lectures;
