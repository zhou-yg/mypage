ce = React.createElement
cc = React.createClass


###
"[{"header":"社区","urls":[{"url":"http://www.zhihu.com/","name":"知乎"},{"url":"http://www.acfun.tv/v/list63/index.htm","name":"AC文章"},{"url":"http://tieba.baidu.com/","name":"贴吧"},{"url":"http://weibo.com/","name":"新浪微博"}]},{"header":"直播","urls":[{"url":"http://www.douyutv.com/","name":"斗鱼"},{"url":"http://zhanqi.tv/","name":"战棋"},{"url":"http://www.huomaotv.com/","name":"火猫"},{"url":"http://www.kktv5.com/","name":"KK游戏"}]},{"header":"视频","urls":[{"url":"http://www.acfun.tv/","name":"AcFun"},{"url":"http://www.bilibili.com/","name":"B站"},{"url":"http://www.youku.com/i/","name":"优酷"},{"url":"http://www.tudou.com/","name":"土豆"}]}]"
###
do ->
  #各种model
  UrlsModel = Backbone.Model.extend {
    defaults:{
      urlsArr:null
      welUl:null
      webUlDom:document.getElementById('web-ul')
    }
    initialize:->
      @bind 'change:urlsArr',->
        @render()

    saveUrls:->
      urlsArr = @get 'urlsArr'
      urlsJson = JSON.stringify(urlsArr)

      $.post 'phps/index.php',{
        fn:2002
        param:
          type:'update'
          urls:urlsJson
      },(data,state)->
        console.log data,state

    render:->
      React.render(
        ce @get 'webUl'
        @get 'webUlDom'
      )

    addType:->
      curList = @get 'urlsArr'
      curList.push {
        header:''
        urls:[]
      }
      @set 'urlsArr',curList
      @saveUrls()

    removeType:(removeTypeObj)->
      curList = @get 'urlsArr'
      for typeOne,i in curList
        if typeOne is removeTypeObj
          curList.splice i,1
          @set 'urlsArr',curList
          break;

      @saveUrls()

    addUrl:(index,urlObj)->
      curList = @get 'urlsArr'
      curList[index].urls.push urlObj
      @set curList
      @saveUrls()
  }

  urlsModel = new UrlsModel

  #获取服务端的数据
  urlsModel.fetch {
    url:'phps/index.php?fn=2002&param={"type":"get"}'
    success:(model,res)->
      if typeof res is 'string'
        res = JSON.parse res

      model.set 'urlsArr',res
    error:->
      console.log.apply console,arguments
  }


  #各种组件
  #搜索组件
  do ->
    searchTypeSelected = 'selected'

    searchEngineObj = {
      baidu:{
        type:'baidu'
        name:'百度'
        className:'type-baidu selected'
        urlPre:'http://www.baidu.com/s?wd='
      }
      google:{
        type:'google'
        name:'谷歌'
        className:'type-google'
        urlPre:'http://74.125.20.146/#newwindow=1&q='
      }
    }

    defaultEngineType = searchEngineObj.baidu.type

    SearchBox =  cc {
      getInitialState:->
        return {
          searchType:defaultEngineType
          text:''
        }

      changeEngine:(e)->
        selectType = e.target.getAttribute 'type'

        curType = @state.searchType
        if curType is selectType
          return e.stopPropagation()

        searchEngineObj[curType].className = searchEngineObj[curType].className.replace ' '+searchTypeSelected,''
        searchEngineObj[selectType].className +=  ' '+searchTypeSelected

        @setState
          searchType:selectType

      clickSearchBtn:->
        urlPre = searchEngineObj[@state.searchType].urlPre
        if @state.text
          url = urlPre + @state.text
          window.open url

      inputKeyDown:(e)->
        inputDom = e.target
        @setState
          text:inputDom.value

      render:->
        ce 'div',{className:'search'},
          (ce 'ul',{className:'search-type'},
            (ce 'li',{onClick:@changeEngine,type:searchEngineObj.baidu.type,className:searchEngineObj.baidu.className},searchEngineObj.baidu.name)
            (ce 'li',{onClick:@changeEngine,type:searchEngineObj.google.type,className:searchEngineObj.google.className},searchEngineObj.google.name)
            (ce 'li',{className:'cf'})
          )
          (ce 'input',{
            onKeyDown:@inputKeyDown
            className :'search-input'
            ref:'searchText'
            placeholder:'正在使用'+searchEngineObj[@state.searchType].name+'搜索'
            type:'text'
          })
          (ce 'input',{ type:'submit',value:'Go',className:'search-btn',onClick:@clickSearchBtn })
          (ce 'div',{ className:'cf '} )
    }

    React.render(
      ce SearchBox
      document.getElementById('searchBox')
    )

  #网页站点组件
  do ->
    defaultTypeName = '默认'
    addTypeName = '增加分类'

    addNameHolder = '名称'
    addUrlHolder = '链接'
    addUrlBtnName = '添加'

    editHeaderDeleteName = '删除'
    editHeaderCancelName = '取消'
    editHeaderSubmitName = '确定'

    showAddUrlDur = 750
    btnRotateAni = ' show-addUrl-btn-display'

    WebListOne = cc {
      getInitialState:->
        headerName = if @props.itemOne.header then @props.itemOne.header else defaultTypeName
        {
          itemOne:@props.itemOne
          headerName:headerName
          defaultHeaderName:headerName

          isOnEditHeader:@props.isOnEditHeader
          editHeaderBoxClass:if @props.isOnEditHeader then '' else 'hide'

          isOnAddUrl:false
          btnRotateAniClass:''
        }
      #删除该分类名
      editHeaderDelete:->
        urlsModel.removeType @state.itemOne
        @forceUpdate()

      #更新 编辑的分类名
      editHeaderSubmit:->
        editHeaderBoxClassV = 'hide'

        @setState {
          isOnEditHeader:false
          editHeaderBoxClass:editHeaderBoxClassV
        }
      #取消 编辑分类名
      editHeaderCancel:->
        editHeaderBoxClassV = 'hide'

        if @state.headerName is @state.defaultHeaderName
          @setState {
            isOnEditHeader:false
            editHeaderBoxClass:editHeaderBoxClassV
          }
        else
          @setState {
            isOnEditHeader:!@state.isOnEditHeader
            editHeaderBoxClass:editHeaderBoxClassV
            headerName:@state.defaultHeaderName
          }
      #显示 编辑分类名
      #如果有 取消链接添加
      editTypeHeader:(ev)->
        if @state.isOnAddUrl
          @inputBoxHide()

        if @state.isOnEditHeader
          editHeaderBoxClassV = 'hide'
        else
          editHeaderBoxClassV = ''

        @setState {
          isOnEditHeader:!@state.isOnEditHeader
          editHeaderBoxClass:editHeaderBoxClassV
        }
      #headerName输入时
      headerNameChange:->
        if @refs.headerNameInput.getDOMNode().value
          @setState
            headerName:@refs.headerNameInput.getDOMNode().value

      changeAddUrlState:->
        if @state.isOnAddUrl
          btnRotateAniClassV = ''
        else
          btnRotateAniClassV = btnRotateAni

        @setState {
          isOnAddUrl:!@state.isOnAddUrl
          btnRotateAniClass:btnRotateAniClassV
        }
      #添加站点
      addNewUrl:->
        urlName = @refs.urlNameInput.getDOMNode().value
        urlHref = @refs.urlHrefInput.getDOMNode().value

        if urlName and urlHref

          if ! urlHref.match /^(?:http:\/\/|https:\/\/)/
            urlHref = 'http://' + urlHref

          urlsModel.addUrl @props.index,{
            url:urlHref
            name:urlName
          }
          @changeAddUrlState()
          @inputBoxHide()

      #显示 站点输入
      inputBoxShow:->
        #show
        @refs.$inputBox.animate {
          left:'-15px'
          opacity:1
        },showAddUrlDur

        @changeAddUrlState()

      #隐藏 站点输入
      inputBoxHide:->
        #hide
        @refs.$inputBox.animate {
          left:'400px'
          opacity:0
        },showAddUrlDur

        @changeAddUrlState()
      #切换，是否增加一个站点
      #准备弹出添加链接的输入框，如果，则同时editHeader收
      showAddUrlClicked:->
        if @state.isOnEditHeader
          @editHeaderCancel()

        if !@refs.$inputBox
          @refs.$inputBox = $ @refs.inputBox.getDOMNode()

        if !@state.isOnAddUrl
          @inputBoxShow()
        else
          @inputBoxHide()

      render:->
        itemOne = @props.itemOne

        ce 'li',{ className:'web-list'},
          (ce 'div',{ className:'list-type-header' },

            ce 'span',{ className:'header-name',onClick:@editTypeHeader },@state.headerName
            ce 'div',{ className:'edit-header-box '+@state.editHeaderBoxClass },
              ce 'input',{ className:'header-name-input',ref:'headerNameInput',defaultValue:@state.headerName,onChange:@headerNameChange}
              ce 'div',{ className:'header-cancel',onClick:@editHeaderDelete },editHeaderDeleteName
              ce 'div',{ className:'header-cancel',onClick:@editHeaderCancel },editHeaderCancelName
              ce 'div',{ className:'header-submit',onClick:@editHeaderSubmit },editHeaderSubmitName

            ce 'span',{ className:'show-addUrl-btn '+@state.btnRotateAniClass ,onClick:@showAddUrlClicked}
            ce 'div',{ className:'newUrl-input-box',ref:'inputBox'},
              ce 'div',{ className:'addUrl-btn',onClick:@addNewUrl},addUrlBtnName
              ce 'input',{ className:'url-name',ref:'urlNameInput',type:'text',placeholder:addNameHolder }
              ce 'input',{ className:'url-href',ref:'urlHrefInput',type:'url',placeholder:addUrlHolder }
          )
          (ce 'ul',{ className:'list-contents' },itemOne.urls.map (urlOne,i)->
            (ce 'li',{ className:'list-contents-one',key:'url'+i},
              (ce 'a',{ href:urlOne.url,target:'_blank' },urlOne.name)
            )
          )
    }

    WebUl = cc {
      getInitialState:->
        {
          urlListArr:urlsModel.get 'urlsArr'
        }
      addType:->
        urlsModel.addType()
        @forceUpdate()	

      render:->
        ce 'ul',null,
          (ce 'li',{ className:'add-type',onClick:@addType },addTypeName),
          (@state.urlListArr.map (itemOne,i,all)->
            if itemOne.header
              webListOne = ce WebListOne,{ itemOne:itemOne,isOnEditHeader:false,index:i,key:'wl'+i }
            else
              webListOne = ce WebListOne,{ itemOne:itemOne,isOnEditHeader:true,index:i,key:'wl'+i }
            return webListOne
          )
    }
    urlsModel.set('webUl',WebUl)