
'use strict';

/**
 *  message controller
 */

const { createCoreController } = require('@strapi/strapi').factories;


module.exports = createCoreController('api::message.message', ({ strapi }) =>  ({

    create: async (ctx) => {
        const user = ctx.state.user;    
        if (!user) {
          return ctx.badRequest(null, [{ messages: [{ id: 'No authorization header was found' }] }]);
        }
        
        console.log("creating with object:")
        
        ctx.request.body = JSON.parse(ctx.request.body)
        
        console.log(ctx.request.body)
  
        ctx.request.body.data['UserId'] = parseInt(user.id);
  
        console.log(ctx.request.body)
  
        var data = await strapi.service('api::message.message').create(ctx.request.body)
  
        console.log(data)
  
        if(!data){
          return ctx.notFound();
        }
        
        ctx.send(data);
      },

    messageGetByService: async (ctx) => {
        const user = ctx.state.user;    
        if (!user) {
          return ctx.badRequest(null, [{ messages: [{ id: 'No authorization header was found' }] }]);
        }
        
        console.log("creating with object:")
      //   ctx.request.body = JSON.parse(ctx.request.body)
  
        var data = await strapi.service('api::message.message').find({
            where: { ServiceId: ctx.params.id },
          })
  
        console.log(data)
  
        if(!data){
          return ctx.notFound();
        }
        
        ctx.send(data);
      },
  
  })
)


