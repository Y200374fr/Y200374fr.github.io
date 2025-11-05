const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '.')));

// 模拟数据
const users = [
  { id: 1, username: 'customer', password: 'customer123', role: 'customer' },
  { id: 2, username: 'admin', password: 'admin123', role: 'admin' }
];

let orders = [
  {
    id: 'WF202507210001',
    user_id: 1,
    game_id: 'player123',
    order_type: '古城技术',
    order_name: '带装备',
    price: 1.5,
    quantity: 5,
    status: 'completed',
    remark: '请尽快处理',
    created_at: '2025-07-21T10:30:00Z'
  },
  {
    id: 'WF202507200002',
    user_id: 1,
    game_id: 'player123',
    order_type: '指定单',
    order_name: '神鹿',
    price: 34,
    quantity: 1,
    status: 'processing',
    remark: '',
    created_at: '2025-07-20T15:45:00Z'
  },
  {
    id: 'WF202507190003',
    user_id: 1,
    game_id: 'player123',
    order_type: '代肝',
    order_name: '100万',
    price: 6,
    quantity: 2,
    status: 'pending',
    remark: '周末完成即可',
    created_at: '2025-07-19T09:15:00Z'
  }
];

// 生成订单ID
function generateOrderId() {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `WF${date}${random}`;
}

// 登录接口
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(400).json({ error: '请输入用户名和密码' });
  }
  
  const user = users.find(u => u.username === username && u.password === password);
  
  if (!user) {
    return res.status(401).json({ error: '用户名或密码错误' });
  }
  
  const token = 'token_' + Date.now();
  
  res.json({
    token,
    user: {
      id: user.id,
      username: user.username,
      role: user.role
    }
  });
});

// 获取用户订单
app.get('/api/orders', (req, res) => {
  const { user_id, status, search } = req.query;
  
  let filteredOrders = [...orders];
  
  if (user_id) {
    filteredOrders = filteredOrders.filter(order => order.user_id.toString() === user_id);
  }
  
  if (status && status !== 'all') {
    filteredOrders = filteredOrders.filter(order => order.status === status);
  }
  
  if (search) {
    const searchTerm = search.toLowerCase();
    filteredOrders = filteredOrders.filter(order => 
      order.id.toLowerCase().includes(searchTerm) || 
      order.game_id.toLowerCase().includes(searchTerm)
    );
  }
  
  res.json(filteredOrders);
});

// 创建订单
app.post('/api/orders', (req, res) => {
  const { user_id, game_id, order_items, remark } = req.body;
  
  if (!user_id || !game_id || !order_items || !Array.isArray(order_items) || order_items.length === 0) {
    return res.status(400).json({ error: '缺少必要参数' });
  }
  
  const newOrders = order_items.map(item => ({
    id: generateOrderId(),
    user_id: parseInt(user_id),
    game_id,
    order_type: item.type,
    order_name: item.name,
    price: item.price,
    quantity: item.quantity,
    status: 'pending',
    remark: remark || '',
    created_at: new Date().toISOString()
  }));
  
  orders = [...newOrders, ...orders];
  
  res.json({
    success: true,
    orders: newOrders
  });
});

// 更新订单状态
app.put('/api/orders/:id', (req, res) => {
  const { id } = req.params;
  const { status, remark } = req.body;
  
  const orderIndex = orders.findIndex(order => order.id === id);
  
  if (orderIndex === -1) {
    return res.status(404).json({ error: '订单不存在' });
  }
  
  orders[orderIndex].status = status;
  if (remark) {
    orders[orderIndex].remark = remark;
  }
  
  res.json({
    success: true,
    order: orders[orderIndex]
  });
});

// 完成订单
app.post('/api/orders/:id/complete', (req, res) => {
  const { id } = req.params;
  
  const orderIndex = orders.findIndex(order => order.id === id);
  
  if (orderIndex === -1) {
    return res.status(404).json({ error: '订单不存在' });
  }
  
  orders[orderIndex].status = 'completed';
  
  res.json({
    success: true,
    order: orders[orderIndex]
  });
});

// 取消订单
app.post('/api/orders/:id/cancel', (req, res) => {
  const { id } = req.params;
  
  const orderIndex = orders.findIndex(order => order.id === id);
  
  if (orderIndex === -1) {
    return res.status(404).json({ error: '订单不存在' });
  }
  
  orders[orderIndex].status = 'cancelled';
  
  res.json({
    success: true,
    order: orders[orderIndex]
  });
});

// 获取所有用户
app.get('/api/users', (req, res) => {
  const userList = users.map(user => ({
    id: user.id,
    username: user.username,
    role: user.role
  }));
  
  res.json(userList);
});

// 提供静态文件
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
  console.log('晚风俱乐部游戏服务下单平台已启动');
  console.log('顾客账号: customer / customer123');
  console.log('管理员账号: admin / admin123');
});