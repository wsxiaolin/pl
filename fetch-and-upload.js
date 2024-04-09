const axios = require('axios');
const mysql = require('mysql');

// 创建数据库连接
const connection = mysql.createConnection({
  host: 'mysql.sqlpub.com',
  user: 'wsxiaolin',
  password: 'WG2qCjfkokKbNfOi',
  database: 'plprojects'
});

// 连接数据库
connection.connect();

// 发送HTTP请求获取数据
axios.get('https://physics-api-cn.turtlesim.com/Users')
  .then(response => {
    const data = response.data;
    // 在这里处理数据，可以将其插入数据库

    // 构造SQL插入语句
    const sql = 'INSERT INTO plstartpage (date, time, data) VALUES (?, ?, ?)';
    const date = new Date().toISOString().slice(0, 10);
    const time = new Date().toLocaleTimeString('en-US', { hour12: false });

    // 执行SQL插入操作
    connection.query(sql, [date, time, JSON.stringify(data)], (error, results, fields) => {
      if (error) {
        console.error('Error inserting data:', error);
        throw error;
      }
      console.log('Data inserted successfully:', results);
    });
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  })
  .finally(() => {
    // 关闭数据库连接
    connection.end();
  });
