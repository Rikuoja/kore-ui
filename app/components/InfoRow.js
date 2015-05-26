'use strict';

import React from 'react';
import {Link} from 'react-router';

function getInfoRow(item) {
  if (item.name) {
    return <InfoRow {...item}/>;
  }
}

function getInitialState(props) {
  return {
    expanded: false,
    expandable: props.items.length
  };
}

class InfoRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = getInitialState(props);
    this.handleExpandClick = this.handleExpandClick.bind(this);
  }

  handleExpandClick() {
    this.setState({
      expanded: !this.state.expanded
    });
  }

  getChildInfoRows() {
    let items = this.props.items;
    if (!items.length || !this.state.expanded) {
      return [];
    }
    return (
      items.map(getInfoRow)
    );
  }

  getExpandButton() {
    if (this.state.expandable) {
      let content;
      if (this.state.expanded) {
        content = <i className='fa fa-lg fa-chevron-up'/>;
      } else {
        content = <i className='fa fa-lg fa-chevron-down'/>;
      }
      return (
        <a className='button-expand' onClick={this.handleExpandClick}>
          {content}
        </a>
      );
    }
    return [];
  }

  getInfoBox() {
    if (this.props.boxContent) {
      return <div className='info-box'>{this.props.boxContent}</div>;
    }
    return [];
  }

  getInfoName() {
    const infoNameClassName = this.props.boxContent ? 'info-name with-infobox' : 'info-name';
    const element = <div className={infoNameClassName}>{this.props.name}</div>;
    if (this.props.linkTo) {
      return <Link to={this.props.linkTo} params={this.props.linkParams}>{element}</Link>;
    }
    return element;
  }

  render() {
    let liClassName = 'info-row ';
    if (this.props.className) {
      liClassName += this.props.className;
    }
    if (this.state.expandable) {
      liClassName += ' expandable';
    }
    return (
      <div>
        <li className={liClassName}>
          {this.getExpandButton()}
          {this.getInfoBox()}
          {this.getInfoName()}
        </li>
        <div>
          {this.getChildInfoRows()}
        </div>
      </div>
    );
  }
}

InfoRow.propTypes = {
  boxContent: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.array
  ]),
  className: React.PropTypes.string,
  items: React.PropTypes.array,
  name: React.PropTypes.oneOfType([
    React.PropTypes.string.isRequired,
    React.PropTypes.array.isRequired
  ]),
  linkTo: React.PropTypes.string,
  linkParams: React.PropTypes.object
};

InfoRow.defaultProps = {
  items: []
};

export default InfoRow;
