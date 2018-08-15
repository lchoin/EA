export default {
  route: {
    dashboard: 'Dashboard',
    graphAnalysis:"Analysis",
    annualYield:"Annual Yield",
    varieties:"Varieties",
    eaList:"EA List",
    exchange:"Heat Exchange",
    comment:"Comment",
    tvolume:"Trading Volume"
  },
  ea:{
    p101:"EA's revenue display on all accounts",
    p102:"EA is ranked in the profit month of all accounts",
    p103:"EA's earnings trend for all accounts this week",
    p104:"EA's total revenue on all accounts",
    p105:"EA's profit and proportion of all Brokers varieties",
    p1unit:"Screening unit",
    p1unity:"Annual rate of return",
    p1unitm:"Monthly yield",
    p1unitd:'Daily rate of return',
    p201:"EA's annual rate of return for all Brokers",
    p202:'Select EA',
    p301:"EA's trading volume in all Brokers (lots)",
    p302:"EA's profit amount in all Brokers varieties",
    p401:"EA's trading interest in all Brokers",
    p501:"Revenue breakdown for each EA different comment",
    p600:'Project',
    p601:'Account',
    p602:'Nickname',
    p603:'Operating',
    p604:'Creation time',
    p605:'Add account',
    p606:'Add project',
    p607:'Current project',
    p608:'Project list',
    year:"",
    mouth:"",
    years:"Years",
    sum:"Sum",
    qx:"Select all",
    qxall:"All",
    p801:"Top 10 profit order",
    p802:"Top 10 loss orders",
    p8001:"Serial number",
    p8002:"Order number",
    p8003:"Account",
    p8004:"Variety",
    p8005:"Direction",
    p8006:"Number of hands",
    p8007:"Opening time",
    p8008:"Closing time",
    p8009:"Profit and loss amount",
    nodata:"No data"

  },
  navbar: {
    logOut: 'Log Out',
    dashboard: 'Dashboard',
    github: 'Github',
    screenfull: 'screenfull',
    theme: 'theme'
  },
  login: {
    title: 'Login Form',
    logIn: 'Log in',
    username: 'Username',
    password: 'Password',
    any: 'any',
    thirdparty: 'Or connect with',
    thirdpartyTips: 'Can not be simulated on local, so please combine you own business simulation! ! !'
  },
  documentation: {
    documentation: 'Documentation',
    github: 'Github Repository'
  },
  permission: {
    roles: 'Your roles',
    switchRoles: 'Switch roles'
  },
  guide: {
    description: 'The guide page is useful for some people who entered the project for the first time. You can briefly introduce the features of the project. Demo is based on ',
    button: 'Show Guide'
  },
  components: {
    documentation: 'Documentation',
    tinymceTips: 'Rich text editor is a core part of management system, but at the same time is a place with lots of problems. In the process of selecting rich texts, I also walked a lot of detours. The common rich text editors in the market are basically used, and the finally chose Tinymce. See documentation for more detailed rich text editor comparisons and introductions.',
    dropzoneTips: 'Because my business has special needs, and has to upload images to qiniu, so instead of a third party, I chose encapsulate it by myself. It is very simple, you can see the detail code in @/components/Dropzone.',
    stickyTips: 'when the page is scrolled to the preset position will be sticky on the top.',
    backToTopTips1: 'When the page is scrolled to the specified position, the Back to Top button appears in the lower right corner',
    backToTopTips2: 'You can customize the style of the button, show / hide, height of appearance, height of the return. If you need a text prompt, you can use element-ui el-tooltip elements externally',
    imageUploadTips: 'Since I was using only the vue@1 version, and it is not compatible with mockjs at the moment, I modified it myself, and if you are going to use it, it is better to use official version.'
  },
  table: {
    dynamicTips1: 'Fixed header, sorted by header order',
    dynamicTips2: 'Not fixed header, sorted by click order',
    dragTips1: 'The default order',
    dragTips2: 'The after dragging order',
    title: 'Title',
    importance: 'Imp',
    type: 'Type',
    remark: 'Remark',
    search: 'Search',
    add: 'Add',
    export: 'Export',
    reviewer: 'reviewer',
    id: 'ID',
    date: 'Date',
    author: 'Author',
    readings: 'Readings',
    status: 'Status',
    actions: 'Actions',
    edit: 'Edit',
    publish: 'Publish',
    draft: 'Draft',
    delete: 'Delete',
    cancel: 'Cancel',
    confirm: 'Confirm'
  },
  errorLog: {
    tips: 'Please click the bug icon in the upper right corner',
    description: 'Now the management system are basically the form of the spa, it enhances the user experience, but it also increases the possibility of page problems, a small negligence may lead to the entire page deadlock. Fortunately Vue provides a way to catch handling exceptions, where you can handle errors or report exceptions.',
    documentation: 'Document introduction'
  },
  excel: {
    export: 'Export',
    selectedExport: 'Export selected items',
    placeholder: 'Please enter the file name(default excel-list)'
  },
  zip: {
    export: 'Export',
    placeholder: 'Please enter the file name(default file)'
  },
  theme: {
    change: 'Theme change',
    documentation: 'Theme documentation',
    tips: 'Tips: It is different from the theme-pick on the navbar is two different skinning methods, each with different application scenarios. Refer to the documentation for details.'
  },
  tagsView: {
    close: 'Close',
    closeOthers: 'Close Others',
    closeAll: 'Close All'
  }
}
