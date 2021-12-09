const commentReducer = (state={
    comments: [], 
    nextPageToken: '',
    hasMore: ''
}, action) => {
    switch(action.type) {
        case 'COMMENTS_SET':
            return {...state, ...action.payload};
        default: 
            return state;
    }
}

export default commentReducer;