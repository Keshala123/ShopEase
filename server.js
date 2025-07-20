const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = 'your-secret-key-change-in-production';

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({
    secret: 'your-session-secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// Database setup
const db = new sqlite3.Database('ecommerce.db');

// Initialize database tables
db.serialize(() => {
    // Users table
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Products table
    db.run(`CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        price REAL NOT NULL,
        image_url TEXT,
        category TEXT,
        stock INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Orders table
    db.run(`CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        total_amount REAL NOT NULL,
        status TEXT DEFAULT 'pending',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id)
    )`);

    // Order items table
    db.run(`CREATE TABLE IF NOT EXISTS order_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        order_id INTEGER,
        product_id INTEGER,
        quantity INTEGER NOT NULL,
        price REAL NOT NULL,
        FOREIGN KEY (order_id) REFERENCES orders (id),
        FOREIGN KEY (product_id) REFERENCES products (id)
    )`);

    // Insert sample products
    const sampleProducts = [
        {
            name: 'Wireless Headphones',
            description: 'High-quality wireless headphones with noise cancellation',
            price: 99.99,
            image_url: '/images/headphones.jpg',
            category: 'Electronics',
            stock: 50
        },
        {
            name: 'Cotton T-Shirt',
            description: 'Comfortable cotton t-shirt in various colors',
            price: 19.99,
            image_url: '/images/tshirt.jpg',
            category: 'Clothing',
            stock: 100
        },
        {
            name: 'Coffee Machine',
            description: 'Professional coffee machine for home use',
            price: 299.99,
            image_url: '/images/coffee-machine.jpg',
            category: 'Home & Kitchen',
            stock: 25
        },
        {
            name: 'Programming Book',
            description: 'Complete guide to Python programming',
            price: 39.99,
            image_url: '/images/book.jpg',
            category: 'Books',
            stock: 75
        },
        {
            name: 'Smartphone Case',
            description: 'Durable smartphone case with modern design',
            price: 24.99,
            image_url: '/images/phone-case.jpg',
            category: 'Electronics',
            stock: 200
        },
        {
            name: 'Garden Tools Set',
            description: 'Complete set of essential gardening tools',
            price: 79.99,
            image_url: '/images/garden-tools.jpg',
            category: 'Home & Garden',
            stock: 30
        }
    ];

    // Check if products already exist
    db.get("SELECT COUNT(*) as count FROM products", (err, row) => {
        if (row.count === 0) {
            const stmt = db.prepare("INSERT INTO products (name, description, price, image_url, category, stock) VALUES (?, ?, ?, ?, ?, ?)");
            sampleProducts.forEach(product => {
                stmt.run(product.name, product.description, product.price, product.image_url, product.category, product.stock);
            });
            stmt.finalize();
        }
    });
});

// Authentication middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Access token required' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid token' });
        }
        req.user = user;
        next();
    });
};

// Routes

// User registration
app.post('/api/register', async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        
        db.run('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', 
            [username, email, hashedPassword], 
            function(err) {
                if (err) {
                    if (err.message.includes('UNIQUE constraint failed')) {
                        return res.status(400).json({ error: 'Username or email already exists' });
                    }
                    return res.status(500).json({ error: 'Database error' });
                }
                
                const token = jwt.sign({ id: this.lastID, username }, JWT_SECRET);
                res.json({ token, user: { id: this.lastID, username, email } });
            });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// User login
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        try {
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET);
            res.json({ 
                token, 
                user: { 
                    id: user.id, 
                    username: user.username, 
                    email: user.email 
                } 
            });
        } catch (error) {
            res.status(500).json({ error: 'Server error' });
        }
    });
});

// Get all products
app.get('/api/products', (req, res) => {
    db.all('SELECT * FROM products', (err, products) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(products);
    });
});

// Get single product
app.get('/api/products/:id', (req, res) => {
    const { id } = req.params;
    
    db.get('SELECT * FROM products WHERE id = ?', [id], (err, product) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
    });
});

// Create order
app.post('/api/orders', authenticateToken, (req, res) => {
    const { items, totalAmount } = req.body;
    const userId = req.user.id;

    if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ error: 'Order items are required' });
    }

    db.run('INSERT INTO orders (user_id, total_amount) VALUES (?, ?)', 
        [userId, totalAmount], 
        function(err) {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }

            const orderId = this.lastID;
            const stmt = db.prepare('INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)');
            
            items.forEach(item => {
                stmt.run(orderId, item.productId, item.quantity, item.price);
            });
            
            stmt.finalize((err) => {
                if (err) {
                    return res.status(500).json({ error: 'Database error' });
                }
                res.json({ orderId, message: 'Order created successfully' });
            });
        });
});

// Get user orders
app.get('/api/orders', authenticateToken, (req, res) => {
    const userId = req.user.id;

    db.all(`
        SELECT o.*, oi.product_id, oi.quantity, oi.price, p.name as product_name
        FROM orders o
        JOIN order_items oi ON o.id = oi.order_id
        JOIN products p ON oi.product_id = p.id
        WHERE o.user_id = ?
        ORDER BY o.created_at DESC
    `, [userId], (err, orders) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(orders);
    });
});

// Serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
}); 