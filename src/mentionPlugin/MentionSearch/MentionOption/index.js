import React, {
  // PropTypes,
  Component,
} from 'react';
import styles from './styles.css';
import Avatar from './Avatar';

export default class MentionOption extends Component {

  constructor(props) {
    super(props);
    this.mouseDown = false;
  }

  componentDidUpdate() {
    this.mouseDown = false;
  }

  onMouseUp = () => {
    if (this.mouseDown) {
      this.mouseDown = false;
      this.props.onMentionSelect(this.props.mention);
    }
  };

  onMouseDown = (event) => {
    // Note: important to avoid a content edit change
    event.preventDefault();

    this.mouseDown = true;
  };

  onMouseEnter = () => {
    this.props.onMentionFocus(this.props.index);
  };

  render() {
    const className = this.props.isFocused ? styles.focusedRoot : styles.root;
    return (
      <div
        className={ className }
        onMouseDown={ this.onMouseDown }
        onMouseUp={ this.onMouseUp }
        onMouseEnter={ this.onMouseEnter }
        role="option"
      >
        <Avatar mention={ this.props.mention } />
        <span className={ styles.text }>{ this.props.mention.get('name') }</span>
      </div>
    );
  }
}
