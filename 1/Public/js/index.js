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
          text: 'text'
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
        url = urlPre + this.state.text;
        return window.open(url);
      },
      inputKeyDown: function(e) {
        var inputDom;
        console.log(this.refs.searchText);
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
    var WebListOne, WebUl, addNameHolder, addUrlBtnName, addUrlHolder, btnRotateAni, showAddUrlDur, webListArr;
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
    addUrlBtnName = '添加';
    addNameHolder = '名称';
    addUrlHolder = '链接';
    showAddUrlDur = 1000;
    btnRotateAni = ' show-addUrl-btn-display';
    WebListOne = React.createClass({
      getInitialState: function() {
        return {
          isInputShow: false,
          btnRotateAniClass: ''
        };
      },
      changeState: function() {
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
      showAddUrlClicked: function(evt) {
        var $inputBox, that;
        that = this;
        $inputBox = $(this.refs.inputBox.getDOMNode());
        if (!this.state.isInputShow) {
          $inputBox.animate({
            left: '-15px',
            opacity: 1
          }, showAddUrlDur);
        } else {
          $inputBox.animate({
            left: '400px',
            opacity: 0
          }, showAddUrlDur);
        }
        return this.changeState();
      },
      render: function() {
        var itemOne;
        itemOne = this.props.itemOne;
        return ce('li', {
          className: 'web-list'
        }, ce('div', {
          className: 'list-type-header'
        }, ce('span', {
          className: 'header-name'
        }, itemOne.header), ce('span', {
          className: 'show-addUrl-btn' + this.state.btnRotateAniClass,
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
      render: function() {
        return ce('ul', null, webListArr.map(function(itemOne, i, all) {
          return ce(WebListOne, {
            itemOne: itemOne,
            key: 'wl' + i
          });
        }));
      }
    });
    return React.render(ce(WebUl), document.getElementById('web-ul'));
  })();

}).call(this);
