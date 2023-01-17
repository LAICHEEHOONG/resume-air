import React from 'react';
import { useLocation, useParams } from 'react-router-dom';

const PostsItem = () => {
    let location = useLocation();
    let {email} = useParams();

    console.log(location, 'loaction');
    console.log(email, 'params');

    return (
        <>
            PostsItem
        </>
    )
};

export default PostsItem;