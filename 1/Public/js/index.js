(function() {
  var ce;

  ce = React.createElement;

  (function() {
    var UrlsModel, urlsModel;
    UrlsModel = Backbone.Model.extend({
      defaults: {
        urlsArr: [
          {
            header: '社区',
            urls: [
              {
                url: 'http://www.zhihu.com/',
                name: '知乎'
              }, {
                url: 'http://www.acfun.tv/v/list63/index.htm',
                name: 'AC文章'
              }, {
                url: 'http://tieba.baidu.com/',
                name: '贴吧'
              }, {
                url: 'http://weibo.com/',
                name: '新浪微博'
              }
            ]
          }, {
            header: '直播',
            urls: [
              {
                url: 'http://www.douyutv.com/',
                name: '斗鱼'
              }, {
                url: 'http://zhanqi.tv/',
                name: '战棋'
              }, {
                url: 'http://www.huomaotv.com/',
                name: '火猫'
              }, {
                url: 'http://www.kktv5.com/',
                name: 'KK游戏'
              }
            ]
          }, {
            header: '视频',
            urls: [
              {
                url: 'http://www.acfun.tv/',
                name: 'AcFun'
              }, {
                url: 'http://www.bilibili.com/',
                name: 'B站'
              }, {
                url: 'http://www.youku.com/i/',
                name: '优酷'
              }, {
                url: 'http://www.tudou.com/',
                name: '土豆'
              }
            ]
          }
        ]
      },
      initialize: function() {},
      addType: function() {
        var curList;
        curList = this.get('urlsArr');
        curList.push({
          header: '',
          urls: []
        });
        return this.set('urlsArr', curList);
      },
      removeType: function(removeTypeObj) {
        var curList, i, typeOne, _i, _len, _results;
        curList = this.get('urlsArr');
        _results = [];
        for (i = _i = 0, _len = curList.length; _i < _len; i = ++_i) {
          typeOne = curList[i];
          if (typeOne === removeTypeObj) {
            curList.splice(i, 1);
            this.set('urlsArr', curList);
            console.log(curList);
            break;
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      },
      addUrl: function(index, urlObj) {
        var curList;
        curList = this.get('urlsArr');
        curList[index].urls.push(urlObj);
        return this.set(curList);
      }
    });
    urlsModel = new UrlsModel;
    (function() {
      var SearchBox, defaultEngineType, searchEngineObj, searchTypeSelected;
      searchTypeSelected = 'selected';
      searchEngineObj = {
        baidu: {
          type: 'baidu',
          name: '百度',
          className: 'type-baidu selected',
          urlPre: 'http://www.baidu.com/s?wd='
        },
        google: {
          type: 'google',
          name: '谷歌',
          className: 'type-google',
          urlPre: 'http://74.125.20.146/#newwindow=1&q='
        }
      };
      defaultEngineType = searchEngineObj.baidu.type;
      SearchBox = React.createClass({
        getInitialState: function() {
          return {
            searchType: defaultEngineType,
            text: ''
          };
        },
        changeEngine: function(e) {
          var curType, selectType;
          selectType = e.target.getAttribute('type');
          curType = this.state.searchType;
          if (curType === selectType) {
            return e.stopPropagation();
          }
          searchEngineObj[curType].className = searchEngineObj[curType].className.replace(' ' + searchTypeSelected, '');
          searchEngineObj[selectType].className += ' ' + searchTypeSelected;
          return this.setState({
            searchType: selectType
          });
        },
        clickSearchBtn: function() {
          var url, urlPre;
          urlPre = searchEngineObj[this.state.searchType].urlPre;
          if (this.state.text) {
            url = urlPre + this.state.text;
            return window.open(url);
          }
        },
        inputKeyDown: function(e) {
          var inputDom;
          inputDom = e.target;
          return this.setState({
            text: inputDom.value
          });
        },
        render: function() {
          return ce('div', {
            className: 'search'
          }, ce('ul', {
            className: 'search-type'
          }, ce('li', {
            onClick: this.changeEngine,
            type: searchEngineObj.baidu.type,
            className: searchEngineObj.baidu.className
          }, searchEngineObj.baidu.name), ce('li', {
            onClick: this.changeEngine,
            type: searchEngineObj.google.type,
            className: searchEngineObj.google.className
          }, searchEngineObj.google.name), ce('li', {
            className: 'cf'
          })), ce('input', {
            onKeyDown: this.inputKeyDown,
            className: 'search-input',
            ref: 'searchText',
            placeholder: '正在使用' + searchEngineObj[this.state.searchType].name + '搜索',
            type: 'text'
          }), ce('input', {
            type: 'submit',
            value: 'Go',
            className: 'search-btn',
            onClick: this.clickSearchBtn
          }), ce('div', {
            className: 'cf '
          }));
        }
      });
      return React.render(ce(SearchBox), document.getElementById('searchBox'));
    })();
    return (function() {
      var WebListOne, WebUl, addNameHolder, addTypeName, addUrlBtnName, addUrlHolder, btnRotateAni, defaultTypeName, editHeaderCancelName, editHeaderDeleteName, editHeaderSubmitName, showAddUrlDur, webUlDom;
      webUlDom = document.getElementById('web-ul');
      defaultTypeName = '默认';
      addTypeName = '增加分类';
      addNameHolder = '名称';
      addUrlHolder = '链接';
      addUrlBtnName = '添加';
      editHeaderDeleteName = '删除';
      editHeaderCancelName = '取消';
      editHeaderSubmitName = '确定';
      showAddUrlDur = 750;
      btnRotateAni = ' show-addUrl-btn-display';
      WebListOne = React.createClass({
        getInitialState: function() {
          var headerName;
          headerName = this.props.itemOne.header ? this.props.itemOne.header : defaultTypeName;
          return {
            itemOne: this.props.itemOne,
            headerName: headerName,
            defaultHeaderName: headerName,
            isOnEditHeader: this.props.isOnEditHeader,
            editHeaderBoxClass: this.props.isOnEditHeader ? '' : 'hide',
            isOnAddUrl: false,
            btnRotateAniClass: ''
          };
        },
        editHeaderDelete: function() {
          urlsModel.removeType(this.state.itemOne);
          return this.forceUpdate();
        },
        editHeaderSubmit: function() {
          var editHeaderBoxClassV;
          editHeaderBoxClassV = 'hide';
          return this.setState({
            isOnEditHeader: false,
            editHeaderBoxClass: editHeaderBoxClassV
          });
        },
        editHeaderCancel: function() {
          var editHeaderBoxClassV;
          editHeaderBoxClassV = 'hide';
          if (this.state.headerName === this.state.defaultHeaderName) {
            return this.setState({
              isOnEditHeader: false,
              editHeaderBoxClass: editHeaderBoxClassV
            });
          } else {
            return this.setState({
              isOnEditHeader: !this.state.isOnEditHeader,
              editHeaderBoxClass: editHeaderBoxClassV,
              headerName: this.state.defaultHeaderName
            });
          }
        },
        editTypeHeader: function(ev) {
          var editHeaderBoxClassV;
          if (this.state.isOnAddUrl) {
            this.inputBoxHide();
          }
          if (this.state.isOnEditHeader) {
            editHeaderBoxClassV = 'hide';
          } else {
            editHeaderBoxClassV = '';
          }
          return this.setState({
            isOnEditHeader: !this.state.isOnEditHeader,
            editHeaderBoxClass: editHeaderBoxClassV
          });
        },
        headerNameChange: function() {
          if (this.refs.headerNameInput.getDOMNode().value) {
            return this.setState({
              headerName: this.refs.headerNameInput.getDOMNode().value
            });
          }
        },
        changeAddUrlState: function() {
          var btnRotateAniClassV;
          if (this.state.isOnAddUrl) {
            btnRotateAniClassV = '';
          } else {
            btnRotateAniClassV = btnRotateAni;
          }
          return this.setState({
            isOnAddUrl: !this.state.isOnAddUrl,
            btnRotateAniClass: btnRotateAniClassV
          });
        },
        addNewUrl: function() {
          var urlHref, urlName;
          urlName = this.refs.urlNameInput.getDOMNode().value;
          urlHref = this.refs.urlHrefInput.getDOMNode().value;
          if (urlName && urlHref) {
            if (!urlHref.match(/^(?:http:\/\/|https:\/\/)/)) {
              urlHref = 'http://' + urlHref;
            }
            urlsModel.addUrl(this.props.index, {
              url: urlHref,
              name: urlName
            });
            this.changeAddUrlState();
            return this.inputBoxHide();
          }
        },
        inputBoxShow: function() {
          this.refs.$inputBox.animate({
            left: '-15px',
            opacity: 1
          }, showAddUrlDur);
          return this.changeAddUrlState();
        },
        inputBoxHide: function() {
          this.refs.$inputBox.animate({
            left: '400px',
            opacity: 0
          }, showAddUrlDur);
          return this.changeAddUrlState();
        },
        showAddUrlClicked: function() {
          if (this.state.isOnEditHeader) {
            this.editHeaderCancel();
          }
          if (!this.refs.$inputBox) {
            this.refs.$inputBox = $(this.refs.inputBox.getDOMNode());
          }
          if (!this.state.isOnAddUrl) {
            return this.inputBoxShow();
          } else {
            return this.inputBoxHide();
          }
        },
        render: function() {
          var itemOne;
          itemOne = this.props.itemOne;
          return ce('li', {
            className: 'web-list'
          }, ce('div', {
            className: 'list-type-header'
          }, ce('span', {
            className: 'header-name',
            onClick: this.editTypeHeader
          }, this.state.headerName), ce('div', {
            className: 'edit-header-box ' + this.state.editHeaderBoxClass
          }, ce('input', {
            className: 'header-name-input',
            ref: 'headerNameInput',
            defaultValue: this.state.headerName,
            onChange: this.headerNameChange
          }), ce('div', {
            className: 'header-cancel',
            onClick: this.editHeaderDelete
          }, editHeaderDeleteName), ce('div', {
            className: 'header-cancel',
            onClick: this.editHeaderCancel
          }, editHeaderCancelName), ce('div', {
            className: 'header-submit',
            onClick: this.editHeaderSubmit
          }, editHeaderSubmitName)), ce('span', {
            className: 'show-addUrl-btn ' + this.state.btnRotateAniClass,
            onClick: this.showAddUrlClicked
          }), ce('div', {
            className: 'newUrl-input-box',
            ref: 'inputBox'
          }, ce('div', {
            className: 'addUrl-btn',
            onClick: this.addNewUrl
          }, addUrlBtnName), ce('input', {
            className: 'url-name',
            ref: 'urlNameInput',
            type: 'text',
            placeholder: addNameHolder
          }), ce('input', {
            className: 'url-href',
            ref: 'urlHrefInput',
            type: 'url',
            placeholder: addUrlHolder
          }))), ce('ul', {
            className: 'list-contents'
          }, itemOne.urls.map(function(urlOne, i) {
            return ce('li', {
              className: 'list-contents-one',
              key: 'url' + i
            }, ce('a', {
              href: urlOne.url,
              target: '_blank'
            }, urlOne.name));
          })));
        }
      });
      WebUl = React.createClass({
        getInitialState: function() {
          return {
            urlListArr: urlsModel.get('urlsArr')
          };
        },
        addType: function() {
          urlsModel.addType();
          return this.forceUpdate();
        },
        render: function() {
          return ce('ul', null, ce('li', {
            className: 'add-type',
            onClick: this.addType
          }, addTypeName), this.state.urlListArr.map(function(itemOne, i, all) {
            var webListOne;
            if (itemOne.header) {
              webListOne = ce(WebListOne, {
                itemOne: itemOne,
                isOnEditHeader: false,
                index: i,
                key: 'wl' + i
              });
            } else {
              webListOne = ce(WebListOne, {
                itemOne: itemOne,
                isOnEditHeader: true,
                index: i,
                key: 'wl' + i
              });
            }
            return webListOne;
          }));
        }
      });
      window.webUl = ce(WebUl);
      window.wu = webUlDom;
      return React.render(webUl, webUlDom);
    })();
  })();

}).call(this);
