const Koa = require('koa');
const KoaRouter = require('koa-router');
const KoaBodyParser = require('koa-bodyparser');
var landingInfo = require('./landing-info');
var fs = require('fs');
//const uuidv4 = require('uuid/v4');

//-----------------------------------------------------------------------------
// SERVICE ENTRY POINT
//-----------------------------------------------------------------------------
const service = new Koa();
const router = new KoaRouter();

service.use(KoaBodyParser());

console.log('yay!');
router
    .get('/', async (ctx, next) => {
        ctx.body = landingInfo;
    })
    .get('/percentRed', async (ctx, next) => {
        ctx.body = landingInfo.percentRed; 
    })
    .put('/percentRed', async (ctx, next) => {
        landingInfo.percentRed = await ctx.request.body['percentRed'];
    })
    .get('/time', async (ctx, next) => {
        ctx.body = landingInfo.time; 
    })
    .put('/time', async (ctx, next) => {
        landingInfo.time = await ctx.request.body['time'];
    })
    .get('/device', async (ctx, next) => {
        ctx.body = landingInfo.device; 
    })
    .put('/device', async (ctx, next) => {
        landingInfo.device = await ctx.request.body['device'];
    })
    .get('/tad', async (ctx, next) => {
        ctx.body = landingInfo.tad; 
    })
    .put('/tad', async (ctx, next) => {
        landingInfo.tad = await ctx.request.body['tad'];
    })
    .get('/taw', async (ctx, next) => {
        ctx.body = landingInfo.taw; 
    })
    .put('/taw', async (ctx, next) => {
        landingInfo.taw = await ctx.request.body['taw'];
    })
    .get('/inspire', async (ctx, next) => {
        ctx.body = landingInfo.inspire; 
    })
    .put('/inspire', async (ctx, next) => {
        landingInfo.inspire = await ctx.request.body['inspire'];
    })
service.use(router.routes());
service.use(router.allowedMethods());

service.listen(3000);