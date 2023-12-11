import React, { Component } from 'react';
import { Icon } from '@iconify/react';
import arrowCircleDown from '@iconify-icons/fa-solid/arrow-circle-down';
import { ButonLoadMore } from './Button.styled';

export class Button extends Component {
  render() {
    return (
      <ButonLoadMore type="button" onClick={this.props.onFindMore}>
        <span className="button-label">Load More</span>
        <Icon icon={arrowCircleDown} />
      </ButonLoadMore>
    );
  }
}
