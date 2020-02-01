const mysql = require('./knex')

async function insert() {
    for ( let i = 0; i < 20 ; i++ ){
        await mysql('image').insert({
            title: `标题${i}`,
            content: ``,
            imgUrls: '["http://www.cqdwq.com/UploadFile/201010722525268.jpg","http://www.cqdwq.com/UploadFile/201010722525268.jpg","http://www.cqdwq.com/UploadFile/201010722525268.jpg"]',
            cateid: 3,
            cateindex: 0,
            imgcate: 4
        })
    
    }
}
// insert()
async function navigator () {
    let res = await mysql('navigator').select()
    console.log(res)
}
navigator()