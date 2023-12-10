import React, { Component } from 'react';
import { Oval } from 'react-loader-spinner';

export class Loader extends Component {
  render() {
    return (
      <Oval
        height={80}
        width={80}
        color="#962fb5"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#f20515"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    );
  }
}
