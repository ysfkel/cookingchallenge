define(['require','angular','app/modules/app','app/js/router'],function(rq,ng,appModule,router){
    'use strict'
    
    require(['domReady!'],function(document){
        ng.bootstrap(document,['appModule'])
        console.log('app started');
    })
})


