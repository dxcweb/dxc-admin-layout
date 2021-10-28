const cookie = require('cookie');

export default {
  'POST /api-server/currentUser': (req, res) => {
    const cookies = cookie.parse(req.get('Cookie') || '');
    if (cookies.user === 'admin') {
      res.send({
        result: true,
        data: {
          username: '管理员',
          authority: ['admin'],
        },
        mse: '',
      });
      return;
    }
    if (cookies.user === 'user') {
      res.send({
        result: true,
        data: {
          username: '普通用户',
          authority: ['user'],
        },
        mse: '',
      });
      return;
    }
    res.send({ result: false, data: null, mse: '未登录' });
  },
  'POST /api-server/login': (req, res) => {
    // const data = JSON.parse(req.body);
    const { account, password } = req.body;
    if (account === 'admin' && password === '123456') {
      res.cookie('user', 'admin');
      res.send({ result: true });
    } else if (account === 'user' && password === '123456') {
      res.cookie('user', 'user');
      res.send({ result: true });
    } else {
      res.send({ result: false, msg: '账号密码错误' });
    }
  },
  'POST /api-server/changePassword': (req, res) => {
    // const data = JSON.parse(req.body);
    const { old_password } = req.body;
    console.log(req.body);
    if (old_password === '123456') {
      res.send({ result: true });
    } else {
      res.send({ result: false, msg: '原密码错误' });
    }
  },
  'POST /api-server/logout': (req, res) => {
    res.cookie('user', '');
    res.send({ result: true });
  },
};
