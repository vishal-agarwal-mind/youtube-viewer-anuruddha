import { useEffect, useState } from "react";
import axios from "axios";
//import { useSelector, useDispatch } from "react-redux";
//import { commentsSet } from "../actions";

const CommentsHook = (videoId, nextPageToken) => {
    const [comments, setComments] = useState<string[]>([]);
    //const [nextPageToken, setNextPageToken] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [hasMore, setHasMore] = useState(false);

    // useEffect(() => {
    //     dispatch(commentsSet({comments:[], nextPageToken:''}))
    // }, [videoId]);

    useEffect(() => {
        setLoading(true)
        setError(false);
        let cancel;
        axios({
            method: "GET",
            url: `${process.env.REACT_APP_GOOGLE_API_URI}/commentThreads`,
            params: {
              key: process.env.REACT_APP_GOOGLE_API_KEY,
              textFormat: 'plainText',
              part: 'snippet',
              videoId: videoId,
              maxResults: 10,
              pageToken: nextPageToken
            },
            cancelToken: new axios.CancelToken(c=> cancel=c)
          }).then((response) => {
            setLoading(false);
            setHasMore((response.data.nextPageToken ? true : false));
            setComments(response.data.items);
            nextPageToken = response.data.nextPageToken;
        }).catch(e => {
            if(axios.isCancel(e)) return;
        });
        return () => cancel();
    }, [videoId]);

    return {
        loading, error, hasMore, comments, nextPageToken
    }
}

export default CommentsHook;