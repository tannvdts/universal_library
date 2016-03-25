# universal_library
---

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { isLoaded as isInfoLoaded, load as loadInfo } from 'redux/modules/info';
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import {load as loadUserInfo} from 'redux/modules/headerPanel';
//import { HeaderPanel, FooterPanel } from 'components';
import {HeaderPanel, FooterPanel} from 'universal_library';
import { routeActions } from 'react-router-redux';
import { asyncConnect } from 'redux-async-connect';
import config from '../../config';

@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
    const promises = [];

    if (!isInfoLoaded(getState())) {
      promises.push(dispatch(loadInfo()));
    }
    if (!isAuthLoaded(getState())) {
      promises.push(dispatch(loadAuth()));
    }

    return Promise.all(promises);
  }
}])
@connect(
  state => ({user: state.auth.user, userInfo: state.headerPanel.userInfo, countX: state.headerPanel.countX}),
  { pushState: routeActions.push, loadUserInfo})
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    user: PropTypes.object,
    pushState: PropTypes.func.isRequired,
    loadUserInfo: PropTypes.func,
    userInfo: PropTypes.object,
    countX: PropTypes.number
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user) {
      // login
      this.props.pushState('/loginSuccess');
    } else if (this.props.user && !nextProps.user) {
      // logout
      this.props.pushState('/');
    }
  }


  handleLoadUserInfo=(event) => {
    event.preventDefault();
    this.props.loadUserInfo();
  }

  render() {
    const styles = require('./App.scss');
    var a=require("universal_library/assets/FooterPanel.css") ;
    const headerLogo = {
      largeLogo: {
        styleClass: 'ct_logo_main_large',
        altName: 'chotot-logo-large'
      },
      smallLogo: {
        styleClass: 'ct_logo_main_small',
        altName: 'chotot-logo-small'
      },
      url: 'https://www.chotot.vn/index.htm'
    };

    const headerItems = [
      {
        type: 'linkRoute',
        detail: {
          itemStyle: 'hidden-xs hidden-sm ct_header_item',
          iconStyle: 'ct_searchIcon',
          descStyle: '',
          desc: 'Tìm rao vặt',
          url: '/widgets'
        }
      },
      {
        type: 'linkDirect',
        detail: {
          itemStyle: 'hidden-xs hidden-sm ct_header_item',
          iconStyle: 'ct_chatIcon',
          descStyle: '',
          desc: 'Chat',
          url: 'https://chat.chotot.vn/messages'
        }
      },
      {
        type: 'linkAction',
        detail: {
          itemStyle: 'hidden-xs hidden-sm ct_header_item',
          iconStyle: 'ct_chatIcon',
          descStyle: '',
          desc: 'Info',
          action: this.handleLoadUserInfo
        }
      },
      {
        type: 'dropdown',
        detail: {
          itemStyle: '',
          iconStyle: 'ct_loggedIcon_dropdown',
          desc: 'User Logged',
          list: [
            {
              type: 'linkRoute',
              detail: {
                iconStyle: 'ct_nav_dropdown_item_icon sprite_sunny_common_tatca_new',
                desc: 'Các tin đã đăng',
                url: '/widgets'
              }

            },
            {
              type: 'linkAction',
              detail: {
                iconStyle: 'ct_nav_dropdown_item_icon sprite_sunny_common_info_new',
                desc: 'Thông tin cá nhân',
                action: this.handleLoadUserInfo
              }

            },
            {
              type: 'linkDirect',
              detail: {
                iconStyle: 'ct_nav_dropdown_item_icon sprite_sunny_common_transaction_history',
                desc: 'Lịch sử giao dịch',
                url: 'https://facebook.com'
              }

            },
            {
              type: 'linkRoute',
              detail: {
                iconStyle: 'ct_nav_dropdown_item_icon sprite_sunny_common_logout_new',
                desc: 'Thoát',
                url: '/widgets'
              }

            }
          ]
        }
      },
      {
        type: 'linkDirect',
        detail: {
          itemStyle: 'postAd',
          iconStyle: '',
          descStyle: 'btn btn-primary newad-btn',
          desc: 'ĐĂNG TIN',
          url: 'https://www2.chotot.vn/ai',
          target: '_blank',
        }
      }
    ];

    const footerItems = {
      nav: [
        {
          type: 'linkDirect',
          detail: {url: 'http://trogiup.chotot.vn/', desc: 'Trợ giúp'}
        },
        {
          type: 'linkRoute',
          detail: {url: '/widgets', desc: 'Đăng tin'}
        },
        {
          type: 'linkAction',
          detail: {action: this.handleLoadUserInfo, desc: 'Thông tin'}
        }
      ],
      ver: [
        {
          type: 'linkDirect',
          detail: {url: 'http://m.chotot.vn/?no_m=1', desc: 'Máy tính'},
        },
        {
          type: 'linkDirect',
          detail: {desc: 'Ứng dụng IOS', url: 'https://play.google.com/store/apps/details?id=com.chotot.vn&referrer=utm_source%3Dm-site%26utm_medium%3Dapp-badges%26utm_campaign%3Dad-insert-form'}
        },
        {
          type: 'linkDirect',
          detail: {url: 'https://itunes.apple.com/us/app/chotot.vn/id790034666', desc: 'Ứng dụng Android'}
        }
      ]

    };

    const user = {
      id: '123456',
      name: 'tannguyen',
      avatar: ''
    };
    const {userInfo, countX} = this.props;

    return (
      <div className={styles.app}>
        <Helmet {...config.app.head}/>
        <HeaderPanel headerItems={headerItems} user={user} headerLogo={headerLogo}/>

        <div className="container">
          <div className="page-header">
            <h1>Chợ Tốt</h1>
          </div>
          {userInfo &&
            <div>
              <p>Name: {userInfo.name}</p>
              <p>Address: {userInfo.address}</p>
              <p>Count: {countX}</p>
            </div>
          }
          <p className="lead">React + Redux + Universal JS</p>
          <p className="lead">React + Redux + Universal JS</p>
          <p className="lead">React + Redux + Universal JS</p>
          <p className="lead">React + Redux + Universal JS</p>

        </div>

        <FooterPanel  footerItems={footerItems}/>
      </div>
    );
  }
}
