export default {
  route: {
    dashboard: '首頁',
    graphAnalysis:"收益分析",
    annualYield:"年度收益率",
    varieties:"品種明細",
    eaList:"EA列表",
    exchange:"交易熱度",
    comment:"收益明細",
    tvolume:"交易量"
  },
  ea:{
    p101:'EA在所有賬號的收益展示',
    p102:'EA在所有賬號的盈利單月排行',
    p103:'EA在所有賬號的本週收益走勢',
    p104:'EA在所有賬號的總收益',
    p105:'EA在所有Brokers的各項品種盈利及佔比',
    p1unit:'篩選單位',
    p1unity:'年收益率',
    p1unitm:'月收益率',
    p1unitd:'日收益率',
    p201:'EA在所有Brokers的年度收益率',
    p202:'篩選EA',
    p301:'EA在所有Brokers的品種交易量（手數）',
    p302:'EA在所有Brokers的品種盈利金額',
    p401:'EA在所有Brokers的交易熱度',
    p501:'每個EA不同註釋(comment)的收益明細',
    p600:'項目',
    p601:'賬戶',
    p602:'昵称',
    p603:'操作',
    p604:'創建時間',
    p605:'添加賬號',
    p606:'添加分析項目',
    p607:'当前项目',
    p608:'项目列表',
    year:"年",
    mouth:"月",
    years:"年份",
    sum:"總和",
    qx:"全選",
    qxall:"全部",
    p801:"TOP10盈利訂單",
    p802:"TOP10虧損訂單",
    p8001:"序號",
    p8002:"訂單號",
    p8003:"賬戶",
    p8004:"品種",
    p8005:"方向",
    p8006:"手數",
    p8007:"開倉時間",
    p8008:"平倉時間",
    p8009:"盈虧金額",
    nodata:"暫無數據"
  },
  navbar: {
    logOut: '退出登录',
    dashboard: '首页',
    github: '项目地址',
    screenfull: '全屏',
    theme: '换肤'
  },
  login: {
    title: '系统登录',
    logIn: '登录',
    username: '账号',
    password: '密码',
    any: '随便填',
    thirdparty: '第三方登录',
    thirdpartyTips: '本地不能模拟，请结合自己业务进行模拟！！！'
  },
  documentation: {
    documentation: '文档',
    github: 'Github 地址'
  },
  permission: {
    roles: '你的权限',
    switchRoles: '切换权限'
  },
  guide: {
    description: '引导页对于一些第一次进入项目的人很有用，你可以简单介绍下项目的功能。本 Demo 是基于',
    button: '打开引导'
  },
  components: {
    documentation: '文档',
    tinymceTips: '富文本是管理后台一个核心的功能，但同时又是一个有很多坑的地方。在选择富文本的过程中我也走了不少的弯路，市面上常见的富文本都基本用过了，最终权衡了一下选择了Tinymce。更详细的富文本比较和介绍见',
    dropzoneTips: '由于我司业务有特殊需求，而且要传七牛 所以没用第三方，选择了自己封装。代码非常的简单，具体代码你可以在这里看到 @/components/Dropzone',
    stickyTips: '当页面滚动到预设的位置会吸附在顶部',
    backToTopTips1: '页面滚动到指定位置会在右下角出现返回顶部按钮',
    backToTopTips2: '可自定义按钮的样式、show/hide、出现的高度、返回的位置 如需文字提示，可在外部使用Element的el-tooltip元素',
    imageUploadTips: '由于我在使用时它只有vue@1版本，而且和mockjs不兼容，所以自己改造了一下，如果大家要使用的话，优先还是使用官方版本。'
  },
  table: {
    dynamicTips1: '固定表头, 按照表头顺序排序',
    dynamicTips2: '不固定表头, 按照点击顺序排序',
    dragTips1: '默认顺序',
    dragTips2: '拖拽后顺序',
    title: '标题',
    importance: '重要性',
    type: '类型',
    remark: '点评',
    search: '搜索',
    add: '添加',
    export: '导出',
    reviewer: '审核人',
    id: '序号',
    date: '时间',
    author: '作者',
    readings: '阅读数',
    status: '状态',
    actions: '操作',
    edit: '编辑',
    publish: '发布',
    draft: '草稿',
    delete: '删除',
    cancel: '取 消',
    confirm: '确 定'
  },
  errorLog: {
    tips: '请点击右上角bug小图标',
    description: '现在的管理后台基本都是spa的形式了，它增强了用户体验，但同时也会增加页面出问题的可能性，可能一个小小的疏忽就导致整个页面的死锁。好在 Vue 官网提供了一个方法来捕获处理异常，你可以在其中进行错误处理或者异常上报。',
    documentation: '文档介绍'
  },
  excel: {
    export: '导出',
    selectedExport: '导出已选择项',
    placeholder: '请输入文件名(默认excel-list)'
  },
  zip: {
    export: '导出',
    placeholder: '请输入文件名(默认file)'
  },
  theme: {
    change: '换肤',
    documentation: '换肤文档',
    tips: 'Tips: 它区别于 navbar 上的 theme-pick, 是两种不同的换肤方法，各自有不同的应用场景，具体请参考文档。'
  },
  tagsView: {
    close: '关闭',
    closeOthers: '关闭其它',
    closeAll: '关闭所有'
  }
}
