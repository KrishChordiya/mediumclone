export default {
    name: 'comment',
    title: 'Comment',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Name',
        type: 'string',
      },
      {
        name: 'email',
        title: 'Email',
        type: 'string',
      },
      {
        name: 'comment',
        title: 'Comment',
        type: 'string',
      },
      {
        name:'approved',
        title:'Approved',
        type:'boolean',
        description:"Comments won't show unitl it is approved here"
      },
      {
        name:"post",
        type:"reference",
        to:[{type:"post"}]
      }
    ]
}