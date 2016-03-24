import React, { createElement, cloneElement } from 'react';
import { findDOMNode } from 'react-dom';

let velocity;
if (typeof document !== 'undefined' && typeof window !== 'undefined') {
  // only load velocity on the client
  velocity = require('velocity-animate');
} else {
  // provide a velocity stub for the server
  velocity = function velocityServerDummy() {
    const callback = arguments[arguments.length - 1];
    // call after stack flushes
    // in case you app depends on the asyncron nature of this function
    setImmediate(function() {
      callback();
    });
  };
}

import {
  toArrayChildren,
  findChildInChildrenByKey,
  mergeChildren,
  transformArguments,
  getChildrenFromProps,
} from './utils';
import AnimTypes from './animTypes';

const BackEase = {
  easeInBack: [0.6, -0.28, 0.735, 0.045],
  easeOutBack: [0.175, 0.885, 0.32, 1.275],
  easeInOutBack: [0.68, -0.55, 0.265, 1.55],
};

const placeholderKeyPrefix = 'ant-queue-anim-placeholder-';

class QueueAnim extends React.Component {
  constructor() {
    super(...arguments);

    this.keysToEnter = [];
    this.keysToLeave = [];
    this.keysAnimating = [];
    this.placeholderTimeoutIds = {};

    // 第一次进入，默认进场
    const children = toArrayChildren(getChildrenFromProps(this.props));
    children.forEach(child => {
      if (!child || !child.key) {
        return;
      }
      this.keysToEnter.push(child.key);
    });

    this.originalChildren = toArrayChildren(getChildrenFromProps(this.props));

    this.state = {
      children,
      childrenShow: {},
    };

    [
      'performEnter',
      'performLeave',
      'enterBegin',
      'leaveComplete',
    ].forEach((method) => this[method] = this[method].bind(this));
  }

  componentDidMount() {
    this.componentDidUpdate();
  }

  componentWillReceiveProps(nextProps) {
    const nextChildren = toArrayChildren(nextProps.children);
    const currentChildren = this.originalChildren;
    const newChildren = mergeChildren(
      currentChildren,
      nextChildren
    );

    this.keysToEnter = [];
    this.keysToLeave = [];
    this.keysAnimating = [];

    // need render to avoid update
    this.setState({
      children: newChildren,
    });

    nextChildren.forEach((c)=> {
      if (!c) {
        return;
      }
      const key = c.key;
      const hasPrev = findChildInChildrenByKey(currentChildren, key);
      if (!hasPrev && key) {
        this.keysToEnter.push(key);
      }
    });

    currentChildren.forEach((c)=> {
      if (!c) {
        return;
      }
      const key = c.key;
      const hasNext = findChildInChildrenByKey(nextChildren, key);
      if (!hasNext && key) {
        this.keysToLeave.push(key);
      }
    });
  }

  componentDidUpdate() {
    this.originalChildren = toArrayChildren(getChildrenFromProps(this.props));
    const keysToEnter = Array.prototype.slice.call(this.keysToEnter);
    const keysToLeave = Array.prototype.slice.call(this.keysToLeave);
    if (this.keysAnimating.length === 0) {
      this.keysAnimating = keysToEnter.concat(keysToLeave);
    }
    keysToEnter.forEach(this.performEnter);
    keysToLeave.forEach(this.performLeave);
  }

  componentWillUnmount() {
    if (this.originalChildren && this.originalChildren.length > 0) {
      this.originalChildren.forEach(child => {
        if (this.refs[child.key]) {
          velocity(findDOMNode(this.refs[child.key]), 'stop');
        }
      });
      Object.keys(this.placeholderTimeoutIds).forEach(key => {
        clearTimeout(this.placeholderTimeoutIds[key]);
      });
    }
  }

  getVelocityConfig(index, ...args) {
    if (this.props.animConfig) {
      return transformArguments(this.props.animConfig, ...args)[index];
    }
    return AnimTypes[transformArguments(this.props.type, ...args)[index]];
  }

  getVelocityEnterConfig(...args) {
    return this.getVelocityConfig(0, ...args);
  }

  getVelocityLeaveConfig(...args) {
    const config = this.getVelocityConfig(1, ...args);
    const ret = {};
    Object.keys(config).forEach((key) => {
      if (Array.isArray(config[key])) {
        ret[key] = Array.prototype.slice.call(config[key]).reverse();
      } else {
        ret[key] = config[key];
      }
    });
    return ret;
  }

  getVelocityEasing(...args) {
    return transformArguments(this.props.ease, ...args).map((easeName) => {
      if (typeof easeName === 'string') {
        return BackEase[easeName] || easeName;
      }
    });
  }

  performEnter(key, i) {
    const interval = transformArguments(this.props.interval, key, i)[0];
    const delay = transformArguments(this.props.delay, key, i)[0];
    this.placeholderTimeoutIds[key] = setTimeout(
      this.performEnterBegin.bind(this, key, i),
      interval * i + delay
    );
    if (this.keysToEnter.indexOf(key) >= 0) {
      this.keysToEnter.splice(this.keysToEnter.indexOf(key), 1);
    }
  }

  performEnterBegin(key, i) {
    const childrenShow = this.state.childrenShow;
    childrenShow[key] = true;
    this.setState({childrenShow}, this.realPerformEnter.bind(this, key, i));
  }

  realPerformEnter(key, i) {
    const node = findDOMNode(this.refs[key]);
    if (!node) {
      return;
    }
    const duration = transformArguments(this.props.duration, key, i)[0];
    node.style.visibility = 'hidden';
    velocity(node, 'stop');
    velocity(node, this.getVelocityEnterConfig(key, i), {
      duration: duration,
      easing: this.getVelocityEasing(key, i)[0],
      visibility: 'visible',
      begin: this.enterBegin.bind(this, key),
      complete: this.enterComplete.bind(this, key),
    });
  }

  performLeave(key, i) {
    clearTimeout(this.placeholderTimeoutIds[key]);
    delete this.placeholderTimeoutIds[key];
    const node = findDOMNode(this.refs[key]);
    if (!node) {
      return;
    }
    const interval = transformArguments(this.props.interval, key, i)[1];
    const delay = transformArguments(this.props.delay, key, i)[1];
    const duration = transformArguments(this.props.duration, key, i)[1];
    const order = this.props.leaveReverse ? (this.keysToLeave.length - i - 1) : i;
    velocity(node, 'stop');
    velocity(node, this.getVelocityLeaveConfig(key, i), {
      delay: interval * order + delay,
      duration: duration,
      easing: this.getVelocityEasing(key, i)[1],
      begin: this.leaveBegin.bind(this),
      complete: this.leaveComplete.bind(this, key),
    });
  }

  enterBegin(key, elements) {
    elements.forEach((elem) => {
      const animatingClassName = this.props.animatingClassName;
      elem.className = elem.className.replace(animatingClassName[1], '');
      if (elem.className.indexOf(animatingClassName[0]) === -1) {
        elem.className += (' ' + animatingClassName[0]);
      }
    });
  }

  enterComplete(key, elements) {
    if (this.keysAnimating.indexOf(key) >= 0) {
      this.keysAnimating.splice(this.keysAnimating.indexOf(key), 1);
    }
    elements.forEach((elem) => {
      elem.className = elem.className.replace(this.props.animatingClassName[0], '').trim();
    });
  }

  leaveBegin(elements) {
    elements.forEach((elem) => {
      const animatingClassName = this.props.animatingClassName;
      elem.className = elem.className.replace(animatingClassName[0], '');
      if (elem.className.indexOf(animatingClassName[1]) === -1) {
        elem.className += (' ' + animatingClassName[1]);
      }
    });
  }

  leaveComplete(key, elements) {
    if (this.keysAnimating.indexOf(key) < 0) {
      return;
    }
    this.keysAnimating.splice(this.keysAnimating.indexOf(key), 1);
    const childrenShow = this.state.childrenShow;
    childrenShow[key] = false;
    if (this.keysToLeave.indexOf(key) >= 0) {
      this.keysToLeave.splice(this.keysToLeave.indexOf(key), 1);
    }
    const needLeave = this.keysToLeave.some(c => childrenShow[c]);
    if (!needLeave) {
      const currentChildren = toArrayChildren(getChildrenFromProps(this.props));
      this.setState({
        children: currentChildren,
        childrenShow: childrenShow,
      });
    }
    elements.forEach((elem) => {
      elem.className = elem.className.replace(this.props.animatingClassName[1], '').trim();
    });
  }

  render() {
    const childrenToRender = toArrayChildren(this.state.children).map(child => {
      if (!child || !child.key) {
        return child;
      }
      return this.state.childrenShow[child.key] ? cloneElement(child, {
        ref: child.key,
        key: child.key,
      }) : createElement('div', {
        ref: placeholderKeyPrefix + child.key,
        key: placeholderKeyPrefix + child.key,
      });
    });
    return createElement(this.props.component, this.props, childrenToRender);
  }
}

const numberOrArray = React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.array]);
const stringOrArray = React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.array]);
const objectOrArray = React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.array]);
const funcOrStringOrArray = React.PropTypes.oneOfType([React.PropTypes.func, stringOrArray]);
const funcOrObjectOrArray = React.PropTypes.oneOfType([React.PropTypes.func, objectOrArray]);
const funcOrNumberOrArray = React.PropTypes.oneOfType([React.PropTypes.func, numberOrArray]);

QueueAnim.propTypes = {
  component: React.PropTypes.string,
  interval: numberOrArray,
  duration: funcOrNumberOrArray,
  delay: funcOrNumberOrArray,
  type: funcOrStringOrArray,
  animConfig: funcOrObjectOrArray,
  ease: funcOrStringOrArray,
  leaveReverse: React.PropTypes.bool,
  animatingClassName: React.PropTypes.array,
};

QueueAnim.defaultProps = {
  component: 'div',
  interval: 100,
  duration: 500,
  delay: 0,
  type: 'right',
  animConfig: null,
  ease: 'easeOutQuart',
  leaveReverse: false,
  animatingClassName: ['queue-anim-entering', 'queue-anim-leaving'],
};

export default QueueAnim;
