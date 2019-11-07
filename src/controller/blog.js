const { exec } = require('../db/mysql')


const getList = (author,keyword) => {
  let sql = 'select * from blogs where 1=1 '
  if(author) {
    sql += `and auth ='${author}'` 
  }
  if(keyword) {
    sql += `and title like '%${keyword}%' ` 
  }
  sql += 'order by createtime desc;'

  return exec(sql)
}

const getDetial = id => {
 const sql = `select * from blogs where id='${id}'`
 return exec(sql).then(rows => {
   return rows[0]
 })
}

const newBlog = (blogData = {}) => {
  //blogData 是一个博客对象，包含title等熟悉
  const title = blogData.title
  const content = blogData.content
  const author = blogData.author
  const createtime = Date.now()

  const sql = `
    insert into blogs (title, content, createtime, auth)
    values ('${title}','${content}','${createtime}','${author}')
  `

  return exec(sql).then(insertData => {
    console.log("insertData is", insertData)
    return {
      id: insertData.insertId
    }
  })
}

const updateBlog = (id, blogData = {}) => {
  // id是要更新博客的id
  //blogData 是一个博客对象，包含title等熟悉
  const title = blogData.title
  const content = blogData.content

  const sql = `
    update blogs set title = '${title}',content = '${content}' where id = '${id}'
  `
  
  return exec(sql).then(updateData => {
    // console.log('updateData is ', updateData)
    if(updateData.affectedRows > 0) {
      return true
    }
    return false
  })
}

const deleteBlog = (id, author) => {
  // id是要更新博客的id
  const sql = `
    delete from blogs where id='${id}' and auth='${author}'
  `
  
  return exec(sql).then(delData => {
    // console.log('updateData is ', updateData)
    if(delData.affectedRows > 0) {
      return true
    }
    return false
  })
}

module.exports = {
  getList,
  getDetial,
  newBlog,
  updateBlog,
  deleteBlog
}