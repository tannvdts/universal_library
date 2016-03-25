// export this package's api
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _componentsHeaderPanelHeaderPanel = require('./components/HeaderPanel/HeaderPanel');

var _componentsHeaderPanelHeaderPanel2 = _interopRequireDefault(_componentsHeaderPanelHeaderPanel);

var _componentsFooterPanelFooterPanel = require('./components/FooterPanel/FooterPanel');

var _componentsFooterPanelFooterPanel2 = _interopRequireDefault(_componentsFooterPanelFooterPanel);

exports.FooterPanel = _componentsFooterPanelFooterPanel2['default'];
exports.HeaderPanel = _componentsHeaderPanelHeaderPanel2['default'];