import React, { useState, useRef } from "react";
import {
    Box,
    TextField
} from "@mui/material";
import axios from "axios";
import Header from "components/Header";
import { useGetProductsQuery } from "state/api";
import { Editor } from '@tinymce/tinymce-react';
import profileImage from "assets/profile.jpeg";


// const Product = ({
//     _id,
//     name,
//     description,
//     price,
//     rating,
//     category,
//     supply,
//     stat,
// }) => {
//     const theme = useTheme();
//     const [isExpanded, setIsExpanded] = useState(false);

//     return (
//         <Card
//             sx={{
//                 backgroundImage: "none",
//                 backgroundColor: theme.palette.background.alt,
//                 borderRadius: "0.55rem",
//             }}
//         >
//             <CardContent>
//                 <Typography
//                     sx={{ fontSize: 14 }}
//                     color={theme.palette.secondary[700]}
//                     gutterBottom
//                 >
//                     {category}
//                 </Typography>
//                 <Typography variant="h5" component="div">
//                     {name}
//                 </Typography>
//                 <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[400]}>
//                     ${Number(price).toFixed(2)}
//                 </Typography>
//                 <Rating value={rating} readOnly />

//                 <Typography variant="body2">{description}</Typography>
//             </CardContent>
//             <CardActions>
//                 <Button
//                     variant="primary"
//                     size="small"
//                     onClick={() => setIsExpanded(!isExpanded)}
//                 >
//                     See More
//                 </Button>
//             </CardActions>
//             <Collapse
//                 in={isExpanded}
//                 timeout="auto"
//                 unmountOnExit
//                 sx={{
//                     color: theme.palette.neutral[300],
//                 }}
//             >
//                 <CardContent>
//                     <Typography>id: {_id}</Typography>
//                     <Typography>Supply Left: {supply}</Typography>
//                     <Typography>
//                         Yearly Sales This Year: {stat.yearlySalesTotal}
//                     </Typography>
//                     <Typography>
//                         Yearly Units Sold This Year: {stat.yearlyTotalSoldUnits}
//                     </Typography>
//                 </CardContent>
//             </Collapse>
//         </Card>
//     );
// };

const Products = () => {
    // const { data, isLoading } = useGetProductsQuery();
    // const isNonMobile = useMediaQuery("(min-width: 1000px)");
    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            // axios posst request to serve
            axios.post('/lecture/add', {
                no: 1,
                title: "Lecture 1",
                content: editorRef.current.getContent()
                courseId: "636a270e66ec5d3bb8f7ff2f"
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
            <h1>Lecture content</h1>
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

export default Products;
