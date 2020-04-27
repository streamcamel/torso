import React from 'react';

const LoadMore = (props) => {
    return (
        <div className="LoadMoreBar">
            <div className="LoadMoreButton" onClick={props.onLoadMore}>Load More</div>
        </div>
    );
}

export default LoadMore;