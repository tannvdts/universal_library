'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterBootstrap = require('react-router-bootstrap');

var FooterPanel = (function (_Component) {
  _inherits(FooterPanel, _Component);

  function FooterPanel() {
    _classCallCheck(this, FooterPanel);

    _get(Object.getPrototypeOf(FooterPanel.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(FooterPanel, [{
    key: 'render',
    value: function render() {
      var styles = require('./FooterPanel.scss');
      var footerItems = this.props.footerItems;
      var nav = footerItems.nav;
      var ver = footerItems.ver;

      return _react2['default'].createElement(
        'footer',
        { className: styles.ct_footer },
        _react2['default'].createElement(
          'div',
          { className: 'container' },
          _react2['default'].createElement(
            'p',
            null,
            nav.map(function (link, index) {
              switch (link.type) {
                case 'linkDirect':
                  {
                    return _react2['default'].createElement(
                      'a',
                      { href: link.detail.url },
                      ' ',
                      link.detail.desc,
                      ' ',
                      index < nav.length - 1 && ' | ',
                      ' '
                    );
                  }
                case 'linkRoute':
                  {
                    return _react2['default'].createElement(
                      _reactRouterBootstrap.LinkContainer,
                      { to: link.detail.url },
                      _react2['default'].createElement(
                        'a',
                        null,
                        link.detail.desc,
                        ' ',
                        index < nav.length - 1 && ' | '
                      )
                    );
                  }
                case 'linkAction':
                  {
                    return _react2['default'].createElement(
                      'a',
                      { onClick: link.detail.action },
                      link.detail.desc,
                      ' ',
                      index < nav.length - 1 && ' | '
                    );
                  }
                default:
                  {
                    break;
                  }
              }
            }),
            _react2['default'].createElement('br', null),
            _react2['default'].createElement(
              'span',
              { className: styles.span_bold },
              'Xem chotot.vn phiên bản: '
            ),
            _react2['default'].createElement('br', null),
            ver.map(function (link, index) {
              switch (link.type) {
                case 'linkDirect':
                  {
                    return _react2['default'].createElement(
                      'a',
                      { href: link.detail.url },
                      ' ',
                      link.detail.desc,
                      ' ',
                      index < nav.length - 1 && ' | ',
                      ' '
                    );
                  }
                case 'linkRoute':
                  {
                    return _react2['default'].createElement(
                      _reactRouterBootstrap.LinkContainer,
                      { to: link.detail.url },
                      _react2['default'].createElement(
                        'a',
                        null,
                        link.detail.desc,
                        ' ',
                        index < nav.length - 1 && ' | '
                      )
                    );
                  }
                case 'linkAction':
                  {
                    return _react2['default'].createElement(
                      'a',
                      { onClick: link.detail.action },
                      link.detail.desc,
                      ' ',
                      index < nav.length - 1 && ' | '
                    );
                  }
                default:
                  {
                    break;
                  }
              }
            })
          )
        )
      );
    }
  }]);

  return FooterPanel;
})(_react.Component);

exports['default'] = FooterPanel;

FooterPanel.propTypes = {
  footerItems: _react.PropTypes.object.isRequired
};
module.exports = exports['default'];