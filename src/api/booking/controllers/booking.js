'use strict';

/**
 *  booking controller
 */

const { createCoreController } = require('@strapi/strapi').factories;


module.exports = createCoreController('api::booking.booking', ({ strapi }) =>  ({
   

    create: async (ctx) => {
      const user = ctx.state.user;    
      if (!user) {
        return ctx.badRequest(null, [{ messages: [{ id: 'No authorization header was found' }] }]);
      }
      
      console.log("creating with object:")
    //   ctx.request.body = JSON.parse(ctx.request.body)
      ctx.request.body = JSON.parse(ctx.request.body)
      
      console.log(ctx.request.body)

      ctx.request.body.data['UserId'] = parseInt(user.id);

      console.log(ctx.request.body)

      var data = await strapi.service('api::booking.booking').create(ctx.request.body)

      console.log(data)

      if(!data){
        return ctx.notFound();
      }
      
      ctx.send(data);
    },

    findOne: async (ctx) => {
        const user = ctx.state.user;    
        if (!user) {
          return ctx.badRequest(null, [{ messages: [{ id: 'No authorization header was found' }] }]);
        }
        
        console.log("finding "+ctx.params.id)
  
        var data = await strapi.service('api::booking.booking').findOne(ctx.params.id)
  
        console.log(data)
  
        if(!data){
          return ctx.notFound();
        }

        if (data.UserId != user.id) {
            return ctx.badRequest(null, [{ messages: [{ id: 'No authorization header was found' }] }]);
          }
    
        ctx.send(data);
      },

      update: async (ctx) => {
        const user = ctx.state.user;    
        if (!user) {
          return ctx.badRequest(null, [{ messages: [{ id: 'No authorization header was found' }] }]);
        }
        
        console.log(ctx.params.id)
        var foundTask = await strapi.db.query('api::booking.booking').findOne({
          where: { id: ctx.params.id },
        });
        // debugger;
        console.log(foundTask)
        if(!foundTask ){
          return ctx.notFound();
        }
  
        if(foundTask.UserId != user.id ){
          return ctx.notFound();
        }
  
        console.log("updating...")
        
        // ctx.request.body.data['UserId'] = parseInt(user.id);
  
        console.log(ctx.request.body)
  
        var data = await strapi.service('api::booking.booking').update(ctx.params.id,ctx.request.body)
  
        console.log(data)
  
        if(!data){
          return ctx.notFound();
        }
    
        ctx.send(data);
      },

      delete: async (ctx) => {
        const user = ctx.state.user;    
        if (!user) {
          return ctx.badRequest(null, [{ messages: [{ id: 'No authorization header was found' }] }]);
        }
        
        console.log(ctx.params.id)
        var foundTask = await strapi.db.query('api::booking.booking').findOne({
          where: { id: ctx.params.id },
        });
        // debugger;
        console.log(foundTask)
        if(!foundTask ){
          return ctx.notFound();
        }
  
        if(foundTask.UserId != user.id ){
          return ctx.notFound();
        }
  
        console.log("updating...")
  
        ctx.request.body = JSON.parse(ctx.request.body)
        
        // ctx.request.body.data['UserId'] = parseInt(user.id);
  
        console.log(ctx.request.body)
  
        var data = await strapi.service('api::booking.booking').delete(ctx.params.id)
  
        console.log(data)
  
        if(!data){
          return ctx.notFound();
        }
    
        ctx.send(data);
      },

      find: async (ctx) => {
        // console.log("getting all my bookings")
        const user = ctx.state.user;    
        if (!user) {
          return ctx.badRequest(null, [{ messages: [{ id: 'No authorization header was found' }] }]);
        }
    
        console.log(user)
        var data = await strapi.service('api::booking.booking').find(ctx)
        // debugger;
        console.log(data)
        if(!data){
          return ctx.notFound();
        }
  
        data = data.results.filter(function(d){
          return d.UserId == user.id
        })
    
        ctx.send(data);
      },
  
  })
)