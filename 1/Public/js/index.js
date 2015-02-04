(function() {
  var ce;

  ce = React.createElement;

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

  (function() {
    var WebListOne, WebUl, addNameHolder, addTypeName, addUrlBtnName, addUrlHolder, btnRotateAni, defaultTypeName, editHeaderCancelName, editHeaderSubmitName, showAddUrlDur, webListArr, webUlDom;
    webListArr = [
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
    ];
    webUlDom = document.getElementById('web-ul');
    defaultTypeName = '默认';
    addTypeName = '增加分类';
    addNameHolder = '名称';
    addUrlHolder = '链接';
    addUrlBtnName = '添加';
    editHeaderCancelName = '取消';
    editHeaderSubmitName = '确定';
    showAddUrlDur = 750;
    btnRotateAni = ' show-addUrl-btn-display';
    WebListOne = React.createClass({
      getInitialState: function() {
        var headerName;
        headerName = this.props.itemOne.header ? this.props.itemOne.header : defaultTypeName;
        return {
          headerName: headerName,
          defaultHeaderName: headerName,
          isEditHeader: this.props.isEditHeader,
          editHeaderBoxClass: this.props.isEditHeader ? '' : 'hide',
          isInputShow: false,
          btnRotateAniClass: ''
        };
      },
      changeAddUrlState: function() {
        var btnRotateAniClassV;
        if (this.state.isInputShow) {
          btnRotateAniClassV = '';
        } else {
          btnRotateAniClassV = btnRotateAni;
        }
        return this.setState({
          isInputShow: !this.state.isInputShow,
          btnRotateAniClass: btnRotateAniClassV
        });
      },
      editHeaderSubmit: function() {
        var editHeaderBoxClassV;
        editHeaderBoxClassV = 'hide';
        console.log(this.state.headerName);
        return this.setState({
          isEditHeader: false,
          editHeaderBoxClass: editHeaderBoxClassV
        });
      },
      editHeaderCancel: function() {
        var editHeaderBoxClassV;
        editHeaderBoxClassV = 'hide';
        if (this.state.headerName === this.state.defaultHeaderName) {
          return this.setState({
            isEditHeader: false,
            editHeaderBoxClass: editHeaderBoxClassV
          });
        } else {
          return this.setState({
            isEditHeader: !this.state.isEditHeader,
            editHeaderBoxClass: editHeaderBoxClassV,
            headerName: this.state.defaultHeaderName
          });
        }
      },
      editTypeHeader: function(ev) {
        var editHeaderBoxClassV;
        if (this.state.isEditHeader) {
          editHeaderBoxClassV = 'hide';
        } else {
          editHeaderBoxClassV = '';
        }
        return this.setState({
          isEditHeader: !this.state.isEditHeader,
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
        if (!this.refs.$inputBox) {
          this.refs.$inputBox = $(this.refs.inputBox.getDOMNode());
        }
        if (!this.state.isInputShow && !this.state.isEditHeader) {
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
          className: 'addUrl-btn'
        }, addUrlBtnName), ce('input', {
          className: 'url-name',
          type: 'text',
          placeholder: addNameHolder
        }), ce('input', {
          className: 'url-href',
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
          webListArr: webListArr
        };
      },
      addType: function() {
        var curList;
        curList = this.state.webListArr;
        curList.push({
          header: '',
          urls: []
        });
        return this.setState({
          webListArr: curList
        });
      },
      render: function() {
        return ce('ul', null, ce('li', {
          className: 'add-type',
          onClick: this.addType
        }, addTypeName), this.state.webListArr.map(function(itemOne, i, all) {
          var webListOne;
          if (itemOne.header) {
            webListOne = ce(WebListOne, {
              itemOne: itemOne,
              isEditHeader: false,
              key: 'wl' + i
            });
          } else {
            webListOne = ce(WebListOne, {
              itemOne: itemOne,
              isEditHeader: true,
              key: 'wl' + i
            });
          }
          return webListOne;
        }));
      }
    });
    return React.render(ce(WebUl), webUlDom);
  })();

}).call(this);
