# Universal Library

### Install

```sh
$ npm install universal_library --save
```

### HeaderPanel Component
```sh
<HeaderPanel headerItems={headerItems} headerLogo={headerLogo} useDefaultStyle="1"/>
```
**Props**
- headerItems:
```sh
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
```
Type:
    linkRoute: link of react router
    linkDirect: url redirect
    linkAction: call react action
    dropdown: dropdown list

details:
    itemStyle: style of each item
    iconStyle: icon of item
    descStyle: style of description
    desc: description content
    url: url (route or direct link)
    action: function wrap action function
    list: dropdown item

- headerLogo: style and logo image
```sh
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
```

- useDefaultStyle : use default for HeaderPanel style, if you dont want to custom style.

### FooterPanel Component
```sh
<FooterPanel footerItems={footerItems}/>
```

**Props**
- footerItems
```sh
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
```


### Custom style
1. Make file scss in universal-js/src/themse/[file].scss . example: ct_header_main_style.scss
```sh
/* Header Panel global style
-------------------------------------------------- */
.ct_searchIcon {
  width: 26px;
  height: 26px;
  background: url(#{$ct_static_path}/black_search_icon.png);
  background-size: 26px 26px;
  display: inline-block;
  vertical-align: middle;
}
.ct_chatIcon {
  width: 26px;
  height: 26px;
  background: url(#{$ct_static_path}/black_chat_icon.png);
  background-size: 26px 26px;
  display: inline-block;
  vertical-align: middle;
}

.ct_loggedIcon {
  position: absolute;
  background: #eee;
  height: 32px;
  width: 32px;
  top: 9px;
  left: 0;
  border-radius: 50%;
  overflow: hidden;
  background: url(#{$ct_static_path}/member-profile-avatar_140x140.png);
  background-size: 32px 32px;
}

.ct_loggedIcon_dropdown {
  display: inline-block;
  vertical-align: middle;
  background: #eee;
  height: 32px;
  width: 32px;
  border-radius: 50%;
  background: url(#{$ct_static_path}/member-profile-avatar_140x140.png);
  background-size: 32px 32px;
}

.ct_profileName {
  display: block;
  padding-left: 27px;
}



.ct_nav_dropdown_item_icon {
  margin-right: 10px;
  margin-left: -10px;
  width: 20px;
  height: 20px;
  display: inline-block;
  vertical-align: middle;
}

.ct_nav_dropdown_item_icon.sprite_sunny_common_tatca_new {
  background: url(#{$ct_static_path}/sunny_common.png) no-repeat -807px -24px;
}

.ct_nav_dropdown_item_icon.sprite_sunny_common_info_new {
  background: url(#{$ct_static_path}/sunny_common.png) no-repeat -759px -24px;
}

.ct_nav_dropdown_item_icon.sprite_sunny_common_transaction_history {
  background: url(#{$ct_static_path}/sunny_common.png) no-repeat -805px -2px;
}

.ct_nav_dropdown_item_icon.sprite_sunny_common_logout_new {
  background: url(#{$ct_static_path}/sunny_common.png) no-repeat -781px -2px;
}

/* Header Panel global style --end
-------------------------------------------------- */

/* Logo style --end
-------------------------------------------------- */
.ct_logo_main_large {
  background: url(#{$ct_static_path}/logo.png) no-repeat;// background span tag
  background-size: auto 50px; //size background of span tag, auto: width of background is auto, 50px: height of  background is 50px
  width: 195px; // width size of span tag
  height:50px;
}
.ct_logo_main_small {
  background: url(#{$ct_static_path}/logo.png) no-repeat;
  background-size: 142px 36px;
  height: 36px;
  width: 142px;
  margin-top: 5px;
}

/* Logo style --end
-------------------------------------------------- */
```
2. Import scss file into file: univsersal-js/src/themse/bootstrap.overides.scss
```sh
...
...
.reportDropDown.dropdown-toggle:active  {
  background:#FFF !important; color:#000 !important;
  box-shadow: inset 0 0px 0px #fff;
  border: none;
}


.btn-group.open .dropdown-toggle {
  box-shadow: inset 0 0px 0px #fff;
}


@import 'photoswipe/photoswipe.scss';
@import 'photoswipe/default-skin.scss';
@import 'ct_layout/ct_header_main_style.scss'; //IMPORT SCSS FILE
```




