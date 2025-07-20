# ShopEase - Complete E-commerce Site

A full-featured e-commerce website built with Express.js backend and vanilla HTML/CSS/JavaScript frontend.

## Features

### ✅ Core E-commerce Features
- **Product Listings**: Browse all available products with beautiful cards
- **Product Details**: Detailed view with quantity selector and add to cart
- **Shopping Cart**: Add/remove items, adjust quantities, view total
- **Order Processing**: Complete checkout flow with order confirmation
- **User Authentication**: Register, login, and logout functionality
- **Order History**: View all past orders with details

### 🎨 User Experience
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Modern UI**: Beautiful gradient design with smooth animations
- **Real-time Updates**: Cart updates instantly, no page refreshes needed
- **Loading States**: Visual feedback during API calls
- **Error Handling**: User-friendly error messages

### 🔧 Technical Features
- **Express.js Backend**: RESTful API with proper error handling
- **SQLite Database**: Lightweight, file-based database
- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: Bcrypt for secure password storage
- **Session Management**: Persistent user sessions
- **CORS Enabled**: Cross-origin resource sharing support

## Quick Start

### Prerequisites
- Node.js (version 14 or higher)
- npm (comes with Node.js)

### Installation

1. **Clone or download the project files**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   npm start
   ```
   
   For development with auto-restart:
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## Project Structure

```
ecommerce-site/
├── server.js              # Main Express server
├── package.json           # Dependencies and scripts
├── ecommerce.db          # SQLite database (created automatically)
├── public/               # Frontend files
│   ├── index.html        # Main HTML page
│   ├── styles.css        # CSS styling
│   └── script.js         # Frontend JavaScript
└── README.md             # This file
```

## API Endpoints

### Authentication
- `POST /api/register` - User registration
- `POST /api/login` - User login

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product

### Orders
- `POST /api/orders` - Create new order (requires authentication)
- `GET /api/orders` - Get user orders (requires authentication)

## Database Schema

### Users Table
- `id` (Primary Key)
- `username` (Unique)
- `email` (Unique)
- `password` (Hashed)
- `created_at`

### Products Table
- `id` (Primary Key)
- `name`
- `description`
- `price`
- `image_url`
- `category`
- `stock`
- `created_at`

### Orders Table
- `id` (Primary Key)
- `user_id` (Foreign Key)
- `total_amount`
- `status`
- `created_at`

### Order Items Table
- `id` (Primary Key)
- `order_id` (Foreign Key)
- `product_id` (Foreign Key)
- `quantity`
- `price`

## Sample Data

The application comes with 6 sample products:
1. Wireless Headphones - $99.99
2. Cotton T-Shirt - $19.99
3. Coffee Machine - $299.99
4. Programming Book - $39.99
5. Smartphone Case - $24.99
6. Garden Tools Set - $79.99

## Usage Guide

### For Customers

1. **Browse Products**
   - Click "Products" in the navigation
   - View product cards with prices and descriptions
   - Click on a product to see detailed information

2. **Add to Cart**
   - Click "Add to Cart" on any product
   - Adjust quantity in product details page
   - View cart by clicking the cart icon

3. **Manage Cart**
   - Open cart sidebar to see all items
   - Adjust quantities or remove items
   - View total price

4. **Checkout**
   - Register or login to your account
   - Click "Checkout" in the cart
   - Order will be processed and saved

5. **View Orders**
   - Click "My Orders" to see order history
   - View order details, items, and status

### For Developers

#### Adding New Products
Edit the `sampleProducts` array in `server.js`:

```javascript
const sampleProducts = [
    {
        name: 'New Product',
        description: 'Product description',
        price: 29.99,
        image_url: '/images/product.jpg',
        category: 'Category',
        stock: 100
    }
    // ... more products
];
```

#### Customizing Styling
Modify `public/styles.css` to change colors, layout, and design.

#### Adding New Features
- Backend: Add new routes in `server.js`
- Frontend: Add new functions in `public/script.js`
- UI: Add new HTML elements and CSS styles

## Security Features

- **Password Hashing**: All passwords are hashed using bcrypt
- **JWT Tokens**: Secure authentication tokens
- **Input Validation**: Server-side validation for all inputs
- **SQL Injection Protection**: Parameterized queries
- **CORS Configuration**: Proper cross-origin settings

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   # Change port in server.js
   const PORT = process.env.PORT || 3001;
   ```

2. **Database errors**
   - Delete `ecommerce.db` file and restart server
   - Database will be recreated automatically

3. **CORS errors**
   - Ensure you're accessing via `http://localhost:3000`
   - Check browser console for specific errors

4. **Authentication issues**
   - Clear browser localStorage
   - Try registering a new account

### Development Tips

- Use `npm run dev` for development with auto-restart
- Check browser console for JavaScript errors
- Check server console for backend errors
- Use browser dev tools to inspect network requests

## Future Enhancements

Potential features to add:
- Product search and filtering
- Product categories
- User reviews and ratings
- Payment gateway integration
- Admin panel for managing products
- Email notifications
- Wishlist functionality
- Product images upload
- Inventory management
- Discount codes and promotions

## License

This project is open source and available under the MIT License.

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review browser console for errors
3. Check server logs for backend issues
4. Ensure all dependencies are installed correctly

---

**Happy Shopping! 🛒** 