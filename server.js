const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// 中间件
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '.')));

// 模拟数据 - 用户
const users = [
  {
    id: 1,
    username: 'customer',
    password: 'customer123',
    role: 'customer'
  },
  {
    id: 2,
    username: 'admin',
    password: 'admin123',
    role: 'admin'
  }
];

// 模拟数据 - 订单
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

// 模拟数据 - 服务项目
const services = [
  {
    id: 1,
    category: 'technical',
    name: '古城技术 - 带装备',
    description: '包含全套装备',
    price: 1.5,
    unit: '局'
  },
  {
    id: 2,
    category: 'technical',
    name: '古城技术 - 不带装备',
    description: '需自备装备',
    price: 1.2,
    unit: '局'
  },
  {
    id: 3,
    category: 'technical',
    name: '昆仑技术',
    description: '默认带装备',
    price: 1.6,
    unit: '局'
  },
  {
    id: 4,
    category: 'technical',
    name: '噩梦技术',
    description: '专业技术',
    price: 3,
    unit: '局'
  },
  {
    id: 5,
    category: 'car',
    name: '古城车里蹲',
    description: '无装备',
    price: 1.2,
    unit: '局'
  },
  {
    id: 6,
    category: 'car',
    name: '昆仑车里蹲',
    description: '无装备',
    price: 1.8,
    unit: '局'
  },
  {
    id: 7,
    category: 'car',
    name: '双队车里蹲',
    description: '含1桃木剑、4摸金符',
    price: 3,
    unit: '局'
  },
  {
    id: 8,
    category: 'specific',
    name: '神鹿',
    description: '',
    price: 34,
    unit: '个'
  },
  {
    id: 9,
    category: 'specific',
    name: '戒指',
    description: '',
    price: 1.2,
    unit: '个'
  },
  {
    id: 10,
    category: 'specific',
    name: '双鱼玉佩',
    description: '',
    price: 2.4,
    unit: '个'
  },
  {
    id: 11,
    category: 'specific',
    name: '面具',
    description: '',
    price: 4.8,
    unit: '个'
  },
  {
    id: 12,
    category: 'specific',
    name: '鬼玺',
    description: '',
    price: 7.2,
    unit: '个'
  },
  {
    id: 13,
    category: 'specific',
    name: '尸香魔芋',
    description: '',
    price: 6,
    unit: '个'
  },
  {
    id: 14,
    category: 'specific',
    name: '大剑',
    description: '',
    price: 53,
    unit: '个'
  },
  {
    id: 15,
    category: 'specific',
    name: '圣杯',
    description: '',
    price: 94,
    unit: '个'
  },
  {
    id: 16,
    category: 'specific',
    name: '雪莲',
    description: '',
    price: 4.8,
    unit: '个'
  },
  {
    id: 17,
    category: 'specific',
    name: '白玉环',
    description: '',
    price: 15,
    unit: '个'
  },
  {
    id: 18,
    category: 'pvp',
    name: '双队PVP - 1人',
    description: '专业PVP对战服务',
    price: 3,
    unit: '局'
  },
  {
    id: 19,
    category: 'pvp',
    name: '双队PVP - 2人',
    description: '专业PVP对战服务',
    price: 5,
    unit: '局'
  },
  {
    id: 20,
    category: 'pvp',
    name: '双队PVP - 3人',
    description: '专业PVP对战服务',
    price: 8,
    unit: '局'
  },
  {
    id: 21,
    category: 'pvp',
    name: '四队PVP - 1人',
    description: '多人混战PVP模式',
    price: 4,
    unit: '局'
  },
  {
    id: 22,
    category: 'pvp',
    name: '四队PVP - 2人',
    description: '多人混战PVP模式',
    price: 7,
    unit: '局'
  },
  {
    id: 23,
    category: 'pvp',
    name: '四队PVP - 3人',
    description: '多人混战PVP模式',
    price: 8,
    unit: '局'
  },
  {
    id: 24,
    category: 'pvp',
    name: '四队PVP - 喷包',
    description: '额外选项',
    price: 2,
    unit: '个'
  },
  {
    id: 25,
    category: 'level',
    name: '代肝 - 100万',
    description: '',
    price: 6,
    unit: '个'
  },
  {
    id: 26,
    category: 'level',
    name: '代肝 - 200万',
    description: '',
    price: 9,
    unit: '个'
  },
  {
    id: 27,
    category: 'level',
    name: '代肝 - 300万',
    description: '',
    price: 12,
    unit: '个'
  },
  {
    id: 28,
    category: 'level',
    name: '代肝 - 500万',
    description: '',
    price: 18,
    unit: '个'
  },
  {
    id: 29,
    category: 'level',
    name: '代肝 - 1000万',
    description: '',
    price: 30,
    unit: '个'
  },
  {
    id: 30,
    category: 'level',
    name: '代肝 - 2000万',
    description: '',
    price: 50,
    unit: '个'
  },
  {
    id: 31,
    category: 'level',
    name: '代肝 - 3000万',
    description: '',
    price: 70,
    unit: '个'
  },
  {
    id: 32,
    category: 'level',
    name: '代肝 - 5000万',
    description: '',
    price: 100,
    unit: '个'
  },
  {
    id: 33,
    category: 'level',
    name: '代肝 - 1亿',
    description: '',
    price: 180,
    unit: '个'
  },
  {
    id: 34,
    category: 'equipment',
    name: '桃木剑',
    description: '',
    price: 1.5,
    unit: '个'
  },
  {
    id: 35,
    category: 'equipment',
    name: '摸金符',
    description: '',
    price: 0.8,
    unit: '个'
  },
  {
    id: 36,
    category: 'equipment',
    name: '洛阳铲',
    description: '',
    price: 2,
    unit: '个'
  },
  {
    id: 37,
    category: 'equipment',
    name: '黑驴蹄子',
    description: '',
    price: 1.2,
    unit: '个'
  },
  {
    id: 38,
    category: 'equipment',
    name: '工兵铲',
    description: '',
    price: 3,
    unit: '个'
  },
  {
    id: 39,
    category: 'equipment',
    name: '登山镐',
    description: '',
    price: 2.5,
    unit: '个'
  },
  {
    id: 40,
    category: 'equipment',
    name: '手电筒',
    description: '',
    price: 0.5,
    unit: '个'
  },
  {
    id: 41,
    category: 'equipment',
    name: '绳索',
    description: '',
    price: 1,
    unit: '个'
  },
  {
    id: 42,
    category: 'equipment',
    name: '医疗包',
    description: '',
    price: 1.8,
    unit: '个'
  },
  {
    id: 43,
    category: 'equipment',
    name: '信号枪',
    description: '',
    price: 4,
    unit: '个'
  }
];

// 生成订单ID
function generateOrderId() {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `WF${date}${random}`;
}

// 登录API
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  
  const user = users.find(u => u.username === username && u.password === password);
  
  if (!user) {
    return res.status(401).json({ message: '用户名或密码错误' });
  }
  
  // 生成模拟token
  const token = `token_${Date.now()}_${user.id}`;
  
  res.json({
    token,
    user: {
      id: user.id,
      username: user.username,
      role: user.role
    }
  });
});

// 获取服务列表API
app.get('/api/services', (req, res) => {
  const category = req.query.category;
  
  if (category) {
    const filteredServices = services.filter(service => service.category === category);
    return res.json(filteredServices);
  }
  
  res.json(services);
});

// 获取订单列表API
app.get('/api/orders', (req, res) => {
  const { user_id, page = 1, limit = 10 } = req.query;
  
  let filteredOrders = orders;
  
  if (user_id) {
    filteredOrders = orders.filter(order => order.user_id.toString() === user_id.toString());
  }
  
  // 分页
  const start = (page - 1) * limit;
  const end = start + parseInt(limit);
  const paginatedOrders = filteredOrders.slice(start, end);
  
  res.json({
    orders: paginatedOrders,
    total: filteredOrders.length,
    page: parseInt(page),
    limit: parseInt(limit)
  });
});

// 创建订单API
app.post('/api/orders', (req, res) => {
  const { user_id, game_id, order_items, remark } = req.body;
  
  if (!user_id || !game_id || !order_items || !Array.isArray(order_items) || order_items.length === 0) {
    return res.status(400).json({ message: '缺少必要参数' });
  }
  
  // 为每个订单项创建订单
  const createdOrders = [];
  
  order_items.forEach(item => {
    const order = {
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
    };
    
    orders.unshift(order);
    createdOrders.push(order);
  });
  
  res.status(201).json({
    message: '订单创建成功',
    orders: createdOrders
  });
});

// 更新订单状态API
app.put('/api/orders/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  
  const orderIndex = orders.findIndex(order => order.id === id);
  
  if (orderIndex === -1) {
    return res.status(404).json({ message: '订单不存在' });
  }
  
  orders[orderIndex].status = status;
  
  res.json({
    message: '订单状态更新成功',
    order: orders[orderIndex]
  });
});

// 删除订单API
app.delete('/api/orders/:id', (req, res) => {
  const { id } = req.params;
  
  const orderIndex = orders.findIndex(order => order.id === id);
  
  if (orderIndex === -1) {
    return res.status(404).json({ message: '订单不存在' });
  }
  
  orders.splice(orderIndex, 1);
  
  res.json({ message: '订单删除成功' });
});

// 健康检查API
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: '服务运行正常' });
});

// 提供静态文件
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
  console.log(`API文档地址: http://localhost:${PORT}/api/health`);
  console.log(`顾客账号: customer / customer123`);
  console.log(`管理员账号: admin / admin123`);
});