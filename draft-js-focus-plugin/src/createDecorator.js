import React, { Component } from 'react';
import clsx from 'clsx';

// Get a component's display name
const getDisplayName = (WrappedComponent) => {
  const component = WrappedComponent.WrappedComponent || WrappedComponent;
  return component.displayName || component.name || 'Component';
};

export default ({ theme, blockKeyStore }) => (WrappedComponent) => class BlockFocusDecorator extends Component {
  static displayName = `BlockFocus(${getDisplayName(WrappedComponent)})`;
  static WrappedComponent = WrappedComponent.WrappedComponent || WrappedComponent;

  componentDidMount() {
    blockKeyStore.add(this.props.block.getKey());
  }

  componentWillUnmount() {
    blockKeyStore.remove(this.props.block.getKey());
  }

  onClick = (evt) => {
    evt.preventDefault();
    if (!this.props.blockProps.isFocused) {
      this.props.blockProps.setFocusToBlock();
    }
  }

  render() {
    const { blockProps, className } = this.props;
    const { isFocused } = blockProps;
    const combinedClassName = isFocused
      ? clsx(className, theme.focused)
      : clsx(className, theme.unfocused);
    return (
      <WrappedComponent
        {...this.props}
        onClick={this.onClick}
        className={combinedClassName}
      />
    );
  }
};
