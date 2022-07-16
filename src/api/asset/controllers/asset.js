'use strict';

/**
 *  asset controller
 */

const { createCoreController } = require('@strapi/strapi').factories;


module.exports = createCoreController('api::asset.asset', ({ strapi }) =>  ({
   

    UploadUserProfilePic: async (ctx) => {
      const user = ctx.state.user;    
      if (!user) {
        return ctx.badRequest(null, [{ messages: [{ id: 'No authorization header was found' }] }]);
      }
      
      console.log("creating with object:")
    //   ctx.request.body = JSON.parse(ctx.request.body)
      ctx.request.body = JSON.parse(ctx.request.body)
      
      console.log(ctx.request.body)

      ctx.request.body.data['ForeignObject']='User'
      ctx.request.body.data['ForeignId']=parseInt(user.id)
      ctx.request.body.data["Ordre"]=1

      console.log(ctx.request.body)

      var foundProfilePics = await strapi.service('api::asset.asset').find(ctx.request.body)

      foundProfilePics = foundProfilePics.results

      console.log(foundProfilePics)

      var foundProfilePic = foundProfilePics.find(function(d){
        return d.ForeignId == user.id && d.ForeignObject == 'User'
      })

      var data;
      if(foundProfilePic)
      {
        data = await strapi.service('api::asset.asset').update(foundProfilePic.id,ctx.request.body)
      }
      else
      {
        data = await strapi.service('api::asset.asset').create(ctx.request.body)
      }

      console.log(data)

      if(!data){
        return ctx.notFound();
      }
      
      ctx.send(data);
    },

    GetUserProfilePic: async (ctx) => {
        const user = ctx.state.user;    
        if (!user) {
          return ctx.badRequest(null, [{ messages: [{ id: 'No authorization header was found' }] }]);
        }
        
        console.log("creating with object:")
      //   ctx.request.body = JSON.parse(ctx.request.body)
  
        var data = await strapi.service('api::asset.asset').find(ctx.request.body)

        data = data.results.filter(function(d){
            return d.ForeignId == ctx.params.id && d.ForeignObject == 'User'
        })
  
        console.log(data)
  
        if(!data){
          return ctx.notFound();
        }
        
        ctx.send(data);
      },

      GetEventPics: async (ctx) => {
        const user = ctx.state.user;    
        if (!user) {
          return ctx.badRequest(null, [{ messages: [{ id: 'No authorization header was found' }] }]);
        }
        
        console.log("creating with object:")
      //   ctx.request.body = JSON.parse(ctx.request.body)
  
        var data = await strapi.service('api::asset.asset').find(ctx.request.body)

        data = data.results.filter(function(d){
            return d.ForeignId == ctx.params.id && d.ForeignObject == 'Service'
        })
  
        console.log(data)
  
        if(!data){
          return ctx.notFound();
        }
        
        ctx.send(data);
      },
  
  })
)
