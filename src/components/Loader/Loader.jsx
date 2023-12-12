import React, { Component } from 'react';
import { Oval } from 'react-loader-spinner';
import { DivLoader } from './Loader.styled';

export class Loader extends Component {
  render() {
    return (
      <DivLoader>
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
      </DivLoader>
    );
  }
}
