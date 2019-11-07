const { 
  getList, 
  getDetial, 
  newBlog,
  updateBlog,
  deleteBlog
} = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleBlogRouter = (req, res) => {
  const method = req.method // GET POST
  const id = req.query.id

  // 获取博客列表
  if (method === 'GET' && req.path === '/api/blog/list') {
    const author = req.query.author || ''
    const keyword = req.query.keyword || ''
    // const listData = getList(author, keyword)
    // return new SuccessModel(listData)
    const result = getList(author, keyword)
    return result.then(listData => {
      return new SuccessModel(listData)
    })
  }
  // 获取博客详情
  if (method === 'GET' && req.path === '/api/blog/detial') {
    // const data = getDetial(id)
    // return new SuccessModel(data)
    const result = getDetial(id)
    return result.then(data => {
      return new SuccessModel(data)
    })
  }
  // 新建博客
  if (method === 'POST' && req.path === '/api/blog/new') {
    // const data = newBlog(req.body)
    // return new SuccessModel(data)
    req.body.author = 'zhangsan' // 假数据，开发登录时再改成真实数据
    const result = newBlog(req.body)
    return result.then(data =>{
      return new SuccessModel(data)
    })
  }
  // 更新博客
  if (method === 'POST' && req.path === '/api/blog/update') {
    const result = updateBlog(id, req.body)
    return result.then(val => {
      if(val) {
        return new SuccessModel()
      } else {
        return new ErrorModel('更新博客失败')
      }
    })
  }
  // 删除博客
  if (method === 'POST' && req.path === '/api/blog/del') {
    const author = 'zhangsan' // 假数据，开发登录时再改成真实数据
    const result = deleteBlog(id, author)
    return result.then(val => {
      if(val) {
        return new SuccessModel()
      } else {
        return new ErrorModel('删除博客失败')
      }
    })
  }
}

module.exports = handleBlogRouter