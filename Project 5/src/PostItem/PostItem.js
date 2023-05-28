import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Typography, LinearProgress, Divider } from '@material-ui/core';
import CommentItem from "../CommentItem/CommentItem";

export default function PostItem() {
    const { postId } = useParams();

    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);

    const fetchComments = async () => {
        const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
        const data = await response.json();

        setComments(data);
    }

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
            .then(response => response.json())
            .then(data => setPost(data));
    }, [postId]);

    return (
        <>
            {
                !post ? <LinearProgress />
                    : (
                        <div style={{ textAlign: 'left' }}>

                            <Typography gutterBottom variant="h6">{post.title}</Typography>

                            <Divider />
                            <br />
                            <Typography variant="body2" color="textSecondary" component="p">
                                {post.body}
                            </Typography>
                            <br />

                            <Button size="small" color="primary" onClick={fetchComments} disabled={comments.length}>
                                See Comments
                            </Button>

                            {comments.map(comment =>
                                <CommentItem key={comment.id} {...comment} />
                            )}
                        </div>
            )}
        </>
    );
}