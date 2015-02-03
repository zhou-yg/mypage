(function() {
  (function() {
    var SearchBox, ce, defaultEngineType, searchEngineObj, searchTypeSelected;
    ce = React.createElement;
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
    defaultEngineType = 'baidu';
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
          placeholder: '正在使用' + searchEngineObj[this.state.searchType].name + '搜索',
          type: 'text'
        }), ce('div', {
          className: 'search-btn',
          onClick: this.clickSearchBtn
        }, 'Go'), ce('div', {
          className: 'cf '
        }));
      }
    });
    return React.render(ce(SearchBox), document.getElementById('searchBox'));
  })();


  /*
  do ->
    $searchType = $ '.search-type'
    $searchBtn = $ '.search-btn'
    $searchInput = $ '.search-input'
  
    searchTypeDefault = 'baidu'
    searchTypeMap =
      baidu:
        desc:'正在使用百度搜索'
        queryTo:(_searchText)->
          return 'http://www.baidu.com/s?wd='+_searchText
      google:
        desc:'正在使用谷歌搜索'
        queryTo:(_searchText)->
          return 'http://74.125.20.146/#newwindow=1&q='+_searchText
  
    buildSearchUrl = searchTypeMap[searchTypeDefault].queryTo
  
    $searchType
      .children()
      .click (e)->
        $this=  $ this
        type = $this.attr 'searchType'
        typeObj = searchTypeMap[type] || searchTypeMap[searchTypeDefault]
  
        buildSearchUrl = typeObj.queryTo
  
        $this.addClass 'selected'
              .siblings 'li'
                .removeClass 'selected'
  
        $searchInput.attr 'placeholder',typeObj.desc
  
    $searchBtn
      .click ->
        text = $searchInput.val()
  
        if text
          url = buildSearchUrl text
          window.open url,'_blank'
   */

}).call(this);
