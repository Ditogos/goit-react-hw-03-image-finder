import React, { Component } from 'react';
import { ButonLoadMore } from './Button.styled';

export class Button extends Component {
  render() {
    return (
      <ButonLoadMore type="button" onClick={this.props.onFindMore}>
        Load More
      </ButonLoadMore>
    );
  }
}
