const Koa = require('koa');

const app = new Koa();


app.use((ctx, next)=> {
  ctx.body = 'okok'
});


app.listen(3000, () => {
  console.log('server is listen in port 3000!');
})