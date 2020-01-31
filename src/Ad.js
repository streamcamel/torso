import React from 'react';

export default class Ad extends React.Component {
  componentDidMount () {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }

render () {
    return (
        <ins class='adsbygoogle'
          style={{ 
              display:'block' }}
          data-ad-client="ca-pub-9159845052269180"
          data-ad-slot="8470740900"
          data-ad-format="auto"
          data-full-width-responsive="true" />
    );
  }
}