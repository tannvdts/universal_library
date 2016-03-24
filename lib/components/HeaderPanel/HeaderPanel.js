/**
 * Created by tan on 3/24/16.
 */
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

var _reactBootstrap = require('react-bootstrap');

var HeaderPanel = (function (_Component) {
  _inherits(HeaderPanel, _Component);

  function HeaderPanel() {
    _classCallCheck(this, HeaderPanel);

    _get(Object.getPrototypeOf(HeaderPanel.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(HeaderPanel, [{
    key: 'render',

    //static propTypes = {
    //  user: PropTypes.object,
    //  headerLogo: PropTypes.object,
    //  headerItems: PropTypes.array.isRequired
    //};

    value: function render() {
      //const styles = require('./HeaderPanel.less'); className={styles.headerPanel}
      var _props = this.props;
      var headerItems = _props.headerItems;
      var headerLogo = _props.headerLogo;

      return _react2['default'].createElement(
        'div',
        null,
        _react2['default'].createElement(
          _reactBootstrap.Navbar,
          null,
          _react2['default'].createElement(
            _reactBootstrap.Navbar.Header,
            null,
            _react2['default'].createElement(
              _reactBootstrap.NavbarBrand,
              null,
              _react2['default'].createElement(
                'a',
                { href: headerLogo.url },
                _react2['default'].createElement('span', { className: headerLogo.largeLogo.styleClass + ' img-responsive hidden-xs',
                  alt: 'chotot-logo' }),
                _react2['default'].createElement('span', { className: headerLogo.smallLogo.styleClass + ' img-responsive visible-xs-block',
                  alt: 'chotot-logo' })
              )
            ),
            _react2['default'].createElement(_reactBootstrap.Navbar.Toggle, null)
          ),
          _react2['default'].createElement(
            _reactBootstrap.Navbar.Collapse,
            { className: 'pull-right' },
            _react2['default'].createElement(
              _reactBootstrap.Nav,
              null,
              headerItems.map(function (item) {
                switch (item.type) {
                  case 'linkRoute':
                    {
                      return _react2['default'].createElement(
                        _reactRouterBootstrap.LinkContainer,
                        { to: item.detail.url },
                        _react2['default'].createElement(
                          _reactBootstrap.NavItem,
                          { target: item.detail.target, className: item.detail.itemStyle, title: '' },
                          _react2['default'].createElement(
                            'span',
                            { className: item.detail.iconStyle },
                            '    '
                          ),
                          _react2['default'].createElement(
                            'span',
                            { className: item.detail.descStyle },
                            '   ',
                            item.detail.desc
                          )
                        )
                      );
                    }
                  case 'linkDirect':
                    {
                      return _react2['default'].createElement(
                        _reactBootstrap.NavItem,
                        { target: item.detail.target, className: item.detail.itemStyle, title: '', href: item.detail.url },
                        _react2['default'].createElement(
                          'span',
                          { className: item.detail.iconStyle },
                          '    '
                        ),
                        _react2['default'].createElement(
                          'span',
                          { className: item.detail.descStyle },
                          '   ',
                          item.detail.desc
                        )
                      );
                    }
                  case 'linkAction':
                    {
                      return _react2['default'].createElement(
                        _reactBootstrap.NavItem,
                        { target: item.detail.target, className: item.detail.itemStyle, title: '', onClick: item.detail.action },
                        _react2['default'].createElement(
                          'span',
                          { className: item.detail.iconStyle },
                          '    '
                        ),
                        _react2['default'].createElement(
                          'span',
                          { className: item.detail.descStyle },
                          '   ',
                          item.detail.desc
                        )
                      );
                    }
                  case 'dropdown':
                    {
                      return _react2['default'].createElement(
                        _reactBootstrap.NavDropdown,
                        { title: _react2['default'].createElement(
                            'span',
                            null,
                            ' ',
                            _react2['default'].createElement(
                              'i',
                              { className: item.detail.iconStyle },
                              ' '
                            ),
                            ' ',
                            item.detail.desc
                          ), id: 'nav-dropdown' },
                        item.detail.list.map(function (row) {
                          switch (row.type) {
                            case 'linkRoute':
                              {
                                return _react2['default'].createElement(
                                  _reactRouterBootstrap.LinkContainer,
                                  { to: row.detail.url },
                                  _react2['default'].createElement(
                                    _reactBootstrap.MenuItem,
                                    null,
                                    _react2['default'].createElement('span', { className: row.detail.iconStyle }),
                                    row.detail.desc
                                  )
                                );
                              }
                            case 'linkDirect':
                              {
                                return _react2['default'].createElement(
                                  _reactBootstrap.MenuItem,
                                  { href: row.detail.url },
                                  _react2['default'].createElement('span', { className: row.detail.iconStyle }),
                                  row.detail.desc
                                );
                              }
                            case 'linkAction':
                              {
                                return _react2['default'].createElement(
                                  _reactBootstrap.MenuItem,
                                  { onClick: row.detail.action },
                                  _react2['default'].createElement('span', { className: row.detail.iconStyle }),
                                  row.detail.desc
                                );
                              }
                            default:
                              {
                                break;
                              }
                          }
                        })
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
        )
      );
    }
  }]);

  return HeaderPanel;
})(_react.Component);

exports['default'] = HeaderPanel;

HeaderPanel.propTypes = {
  user: _react.PropTypes.object,
  headerLogo: _react.PropTypes.object,
  headerItems: _react.PropTypes.array.isRequired
};
module.exports = exports['default'];