import React from 'react';
import _ from "lodash" 
import ClipsCarousel from './ClipsCarousel';

const ClipsPage = () => {
    return (
        <>
            <ClipsCarousel className="ClipsCarousel" period="today" title="Today's Top Clips"/>
            <ClipsCarousel className="ClipsCarousel" period="week" title="This Week Top Clips"/>
            <ClipsCarousel className="ClipsCarousel" period="month" title="This Month Top Clips"/>
            <ClipsCarousel className="ClipsCarousel" period="all" title="All Time Top Clips"/>
        </>
    );
};

export default ClipsPage;