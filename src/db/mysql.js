const mysql = require('mysql')
const { MYSQL_CONF } = require('../conf/db')

const con = mysql.createConnection(MYSQL_CONF)

con.connect()

// 统一执行sql函数
function exec(sql) {
  const promise = new Promise((resolve,reject) => {
    con.query(sql,(err,res) => {
      if(err){
        reject(err)
        return
      }
      resolve(res)
    })
  })
  return promise
}

module.exports = {
  exec
}