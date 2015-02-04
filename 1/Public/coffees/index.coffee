ce = React.createElement
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

  SearchBox =  React.createClass {
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
  #server return json
  webListArr = [{
    header:'社区'
    urls:[{
      url:'http://www.zhihu.com/'
      name:'知乎'
    },{
      url:'http://www.acfun.tv/v/list63/index.htm'
      name:'AC文章'
    },{
      url:'http://tieba.baidu.com/'
      name:'贴吧'
    },{
      url:'http://weibo.com/'
      name:'新浪微博'
    }]
  },{
    header:'直播'
    urls:[{
      url:'http://www.douyutv.com/'
      name:'斗鱼'
    },{
      url:'http://zhanqi.tv/'
      name:'战棋'
    },{
      url:'http://www.huomaotv.com/'
      name:'火猫'
    },{
      url:'http://www.kktv5.com/'
      name:'KK游戏'
    }]
  },{
    header:'视频'
    urls:[{
      url:'http://www.acfun.tv/'
      name:'AcFun'
    },{
      url:'http://www.bilibili.com/'
      name:'B站'
    },{
      url:'http://www.youku.com/i/'
      name:'优酷'
    },{
      url:'http://www.tudou.com/'
      name:'土豆'
    }]
  }]

  webUlDom = document.getElementById('web-ul')

  defaultTypeName = '默认'
  addTypeName = '增加分类'

  addNameHolder = '名称'
  addUrlHolder = '链接'
  addUrlBtnName = '添加'

  editHeaderCancelName = '取消'
  editHeaderSubmitName = '确定'

  showAddUrlDur = 750
  btnRotateAni = ' show-addUrl-btn-display'

  WebListOne = React.createClass {
    getInitialState:->
      headerName = if @props.itemOne.header then @props.itemOne.header else defaultTypeName
      {
        headerName:headerName
        defaultHeaderName:headerName
        isEditHeader:@props.isEditHeader
        editHeaderBoxClass:if @props.isEditHeader then '' else 'hide'
        isInputShow:false
        btnRotateAniClass:''
      }
    changeAddUrlState:->
      if @state.isInputShow
        btnRotateAniClassV = ''
      else
        btnRotateAniClassV = btnRotateAni

      @setState {
        isInputShow:!@state.isInputShow
        btnRotateAniClass:btnRotateAniClassV
      }
    #更新 编辑的分类名
    editHeaderSubmit:->
      editHeaderBoxClassV = 'hide'

      console.log @state.headerName

      @setState {
        isEditHeader:false
        editHeaderBoxClass:editHeaderBoxClassV
      }
    #取消 编辑分类名
    editHeaderCancel:->
      editHeaderBoxClassV = 'hide'

      if @state.headerName is @state.defaultHeaderName
        @setState {
          isEditHeader:false
          editHeaderBoxClass:editHeaderBoxClassV
        }
      else
        @setState {
          isEditHeader:!@state.isEditHeader
          editHeaderBoxClass:editHeaderBoxClassV
          headerName:@state.defaultHeaderName
        }
    #编辑 分类名
    editTypeHeader:(ev)->
      if @state.isEditHeader
        editHeaderBoxClassV = 'hide'
      else
        editHeaderBoxClassV = ''

      @setState {
        isEditHeader:!@state.isEditHeader
        editHeaderBoxClass:editHeaderBoxClassV
      }
    headerNameChange:->
      if @refs.headerNameInput.getDOMNode().value
        @setState
          headerName:@refs.headerNameInput.getDOMNode().value

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
    showAddUrlClicked:->
      if !@refs.$inputBox
        @refs.$inputBox = $ @refs.inputBox.getDOMNode()

      if !@state.isInputShow and !@state.isEditHeader
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
            ce 'div',{ className:'header-cancel',onClick:@editHeaderCancel },editHeaderCancelName
            ce 'div',{ className:'header-submit',onClick:@editHeaderSubmit },editHeaderSubmitName

          ce 'span',{ className:'show-addUrl-btn '+@state.btnRotateAniClass ,onClick:@showAddUrlClicked}
          ce 'div',{ className:'newUrl-input-box',ref:'inputBox' },
            ce 'div',{ className:'addUrl-btn' },addUrlBtnName
            ce 'input',{ className:'url-name',type:'text',placeholder:addNameHolder }
            ce 'input',{ className:'url-href',type:'url',placeholder:addUrlHolder }
        )
        (ce 'ul',{ className:'list-contents' },itemOne.urls.map (urlOne,i)->
          (ce 'li',{ className:'list-contents-one',key:'url'+i},
            (ce 'a',{ href:urlOne.url,target:'_blank' },urlOne.name)
          )
        )

  }

  WebUl = React.createClass {
    getInitialState:->
      {
        webListArr:webListArr
      }
    addType:->
      curList = @state.webListArr
      curList.push {
        header:''
        urls:[]
      }
      @setState
        webListArr:curList

    render:->
      ce 'ul',null,
        (ce 'li',{ className:'add-type',onClick:@addType },addTypeName),
        (@state.webListArr.map (itemOne,i,all)->
          if itemOne.header
            webListOne = ce WebListOne,{ itemOne:itemOne,isEditHeader:false,key:'wl'+i }
          else
            webListOne = ce WebListOne,{ itemOne:itemOne,isEditHeader:true,key:'wl'+i }
          return webListOne
        )
  }

  React.render(
    ce WebUl
    webUlDom
  )