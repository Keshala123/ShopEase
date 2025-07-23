# ShopEase - Complete E-commerce Platform

A feature-rich, modern e-commerce website built with Express.js backend and vanilla HTML/CSS/JavaScript frontend. Features a beautiful gradient design, comprehensive payment system, and enhanced user experience.

## ✨ Features

### 🛒 Core E-commerce Features
- **Product Listings**: Browse all available products with beautiful gradient cards
- **Product Details**: Detailed view with quantity selector and add to cart
- **Shopping Cart**: Add/remove items, adjust quantities, view total with sidebar
- **Order Processing**: Complete checkout flow with order confirmation
- **User Authentication**: Secure register, login, and logout functionality
- **Order History**: View all past orders with payment details and status
- **Payment System**: Complete payment processing with multiple payment methods

### 💳 Payment Features
- **Multiple Payment Methods**: Credit Card, Debit Card, PayPal, Apple Pay, Google Pay
- **Card Validation**: Real-time card number, expiry, and CVV validation
- **Payment Modal**: Beautiful modal interface with form validation
- **Transaction Tracking**: Payment status and transaction ID tracking
- **Secure Processing**: Simulated secure payment processing with confirmation

### 🎨 Enhanced User Experience
- **Modern Gradient Design**: Beautiful color schemes with purple, blue, and gold accents
- **Enhanced Home Page**: Features sections, product categories, and statistics
- **Responsive Design**: Perfect compatibility across desktop, tablet, and mobile
- **Interactive Animations**: Smooth hover effects and transitions
- **Real-time Updates**: Cart and payment updates instantly
- **Toast Notifications**: User-friendly success/error messages
- **Loading States**: Visual feedback during all operations

### 🏠 Enhanced Home Page
- **Hero Banner**: Attractive banner with featured products and call-to-action
- **Features Section**: Showcase of key platform features with icons
- **Product Categories**: Visual category cards for easy navigation
- **Statistics Section**: Platform metrics and achievements display
- **Newsletter Signup**: Email subscription with gradient styling
- **About & Contact**: Integrated contact information and company details

### 🔧 Technical Features
- **Express.js Backend**: RESTful API with comprehensive error handling
- **SQLite Database**: Enhanced with payment tracking and transaction data
- **JWT Authentication**: Secure token-based authentication system
- **Password Hashing**: Bcrypt for secure password storage
- **Session Management**: Persistent user sessions across visits
- **CORS Enabled**: Cross-origin resource sharing support
- **Payment API**: Simulated payment processing endpoints
- **Enhanced Database Schema**: Payment methods, status, and transaction tracking

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
shopEase/
├── server.js              # Main Express server with payment endpoints
├── package.json           # Dependencies and scripts
├── ecommerce.db          # SQLite database with payment tracking
├── public/               # Frontend files
│   ├── index.html        # Enhanced main page with payment modal
│   ├── styles.css        # Modern gradient styling with payment UI
│   ├── script.js         # Frontend JavaScript with payment processing
│   └── images/           # Product images and assets
│       ├── book.jpg
│       ├── coffee-machine.jpg
│       ├── Denim Jeans.jpeg
│       ├── Fiction Novel.jpg
│       ├── garden-tools.jpg
│       ├── headphones.jpg
│       ├── phone-case.jpg
│       ├── shopping.png
│       └── tshirt.jpg
└── README.md             # This comprehensive documentation
```

## API Endpoints

### Authentication
- `POST /api/register` - User registration with validation
- `POST /api/login` - User login with JWT token generation

### Products
- `GET /api/products` - Get all products with enhanced data
- `GET /api/products/:id` - Get single product with detailed information

### Orders
- `POST /api/orders` - Create new order with payment integration (requires authentication)
- `GET /api/orders` - Get user orders with payment status (requires authentication)

### Payment Processing
- `POST /api/payment/intent` - Create payment intent for checkout
- `POST /api/payment/process` - Process payment and create order with transaction tracking

## Enhanced Database Schema

### Users Table
- `id` (Primary Key)
- `username` (Unique)
- `email` (Unique)
- `password` (Hashed with bcrypt)
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

### Orders Table (Enhanced)
- `id` (Primary Key)
- `user_id` (Foreign Key)
- `total_amount`
- `status` (pending, completed, cancelled)
- `payment_method` (credit_card, debit_card, paypal, apple_pay, google_pay)
- `payment_status` (pending, completed, failed)
- `transaction_id` (Unique payment reference)
- `created_at`

### Order Items Table
- `id` (Primary Key)
- `order_id` (Foreign Key)
- `product_id` (Foreign Key)
- `quantity`
- `price`

## Sample Data

The application comes with 9 sample products across different categories:

### Electronics
1. **Wireless Headphones** - $99.99 (High-quality noise-canceling)
2. **Coffee Machine** - $299.99 (Premium automatic brewing)

### Fashion
3. **Cotton T-Shirt** - $19.99 (Comfortable everyday wear)
4. **Denim Jeans** - $59.99 (Classic blue denim)

### Books & Media
5. **Programming Book** - $39.99 (Learn JavaScript fundamentals)
6. **Fiction Novel** - $24.99 (Bestselling adventure story)

### Accessories & Tools
7. **Smartphone Case** - $24.99 (Protective phone cover)
8. **Garden Tools Set** - $79.99 (Complete gardening kit)

All products include high-quality images and detailed descriptions for enhanced shopping experience.

## Usage Guide

### For Customers

1. **Explore the Enhanced Home Page**
   - Browse featured products in the hero banner
   - Explore features section to understand platform capabilities
   - View product categories for easy navigation
   - Check platform statistics and achievements

2. **Browse Products**
   - Click "Products" in the navigation
   - View beautiful gradient product cards with images
   - Click "View Details" to see comprehensive product information
   - Use hover effects for interactive experience

3. **Add to Cart & Shopping**
   - Click "Add to Cart" on any product
   - Adjust quantity in product details page
   - View cart by clicking the cart icon with live count
   - Cart sidebar shows all items with quantities and total

4. **Secure Checkout & Payment**
   - Register or login to your account
   - Click "Checkout" in the cart
   - Choose from multiple payment methods:
     - Credit Card (Visa, MasterCard, etc.)
     - Debit Card
     - PayPal
     - Apple Pay
     - Google Pay
   - Fill in payment details with real-time validation
   - Complete secure payment processing

5. **Order Management**
   - Click "My Orders" to see comprehensive order history
   - View order details including payment method and status
   - Track transaction IDs and payment status
   - Monitor order progression from pending to completed

6. **Contact & Support**
   - Visit "About" section for company information
   - Use "Contact" section for customer support
   - Subscribe to newsletter for updates and offers

### For Developers

#### Adding New Products
Edit the `sampleProducts` array in `server.js`:

```javascript
const sampleProducts = [
    {
        name: 'New Product',
        description: 'Detailed product description',
        price: 29.99,
        image_url: '/images/product.jpg',
        category: 'Electronics', // or Fashion, Books, etc.
        stock: 100
    }
    // ... more products
];
```

#### Customizing Design
- **Colors**: Modify gradient variables in `public/styles.css`
- **Layout**: Adjust grid systems and responsive breakpoints
- **Animations**: Customize hover effects and transitions
- **Payment UI**: Enhance payment modal styling

#### Adding New Payment Methods
Extend the payment system in `server.js`:

```javascript
// Add new payment method validation
if (!['credit_card', 'debit_card', 'paypal', 'apple_pay', 'google_pay', 'new_method'].includes(paymentMethod)) {
    return res.status(400).json({ error: 'Invalid payment method' });
}
```

#### Enhanced Features Development
- **Backend**: Add new routes in `server.js` with payment integration
- **Frontend**: Extend `public/script.js` with new functionalities
- **Database**: Modify schema for additional data tracking
- **UI**: Enhance `public/styles.css` with modern design patterns

## Security Features

- **Password Hashing**: All passwords securely hashed using bcrypt with salt rounds
- **JWT Tokens**: Secure authentication tokens with expiration
- **Input Validation**: Comprehensive server-side validation for all inputs
- **SQL Injection Protection**: Parameterized queries throughout the application
- **CORS Configuration**: Proper cross-origin settings for secure communication
- **Payment Security**: Simulated secure payment processing with validation
- **Session Management**: Secure token-based session handling
- **Card Validation**: Client-side and server-side payment card validation

## Browser Compatibility

- **Chrome** (recommended for best experience)
- **Firefox** (fully supported)
- **Safari** (including mobile Safari)
- **Edge** (modern versions)
- **Mobile browsers** (iOS and Android)
- **Responsive design** works across all screen sizes

## Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   # Change port in server.js
   const PORT = process.env.PORT || 3001;
   ```

2. **Database errors**
   - Delete `ecommerce.db` file and restart server
   - Database will be recreated automatically with enhanced schema

3. **CORS errors**
   - Ensure you're accessing via `http://localhost:3000`
   - Check browser console for specific errors

4. **Authentication issues**
   - Clear browser localStorage and sessionStorage
   - Try registering a new account
   - Check JWT token expiration

5. **Payment processing issues**
   - Verify payment modal opens correctly
   - Check card validation functions
   - Ensure all required payment fields are filled

6. **UI/Styling issues**
   - Clear browser cache and refresh
   - Check if all CSS files are loading properly
   - Verify responsive design on different screen sizes

### Development Tips

- Use `npm run dev` for development with auto-restart
- Check browser console for JavaScript errors
- Check server console for backend errors
- Use browser dev tools to inspect network requests

## Future Enhancements

### Planned Features
- **Advanced Product Search**: Search and filtering by category, price, rating
- **User Reviews & Ratings**: Customer feedback and product ratings system
- **Real Payment Gateway**: Integration with Stripe, PayPal, or similar services
- **Admin Dashboard**: Complete admin panel for product and order management
- **Email Notifications**: Order confirmations and status updates
- **Wishlist Functionality**: Save favorite products for later
- **Advanced Analytics**: Sales reports and customer insights

### Technical Improvements
- **Product Image Upload**: Admin functionality to upload product images
- **Advanced Inventory Management**: Stock tracking and low inventory alerts
- **Discount Codes & Promotions**: Coupon system and promotional campaigns
- **Multi-language Support**: Internationalization for global reach
- **Advanced Security**: Two-factor authentication and enhanced encryption
- **Performance Optimization**: Caching and database optimization
- **Mobile App**: React Native or Flutter mobile application

### User Experience Enhancements
- **Live Chat Support**: Real-time customer service integration
- **Social Media Integration**: Share products and login with social accounts
- **Advanced Recommendations**: AI-powered product suggestions
- **Progressive Web App**: Offline functionality and app-like experience

## Technology Stack

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **SQLite** - Lightweight database with enhanced schema
- **bcrypt** - Password hashing library
- **jsonwebtoken** - JWT token generation and verification
- **cors** - Cross-origin resource sharing middleware

### Frontend
- **HTML5** - Modern semantic markup
- **CSS3** - Advanced styling with gradients and animations
- **Vanilla JavaScript** - Pure JavaScript for enhanced performance
- **Responsive Design** - Mobile-first approach with flexbox and grid

### Features Integration
- **Payment Processing** - Simulated secure payment system
- **Real-time Updates** - Dynamic cart and order management
- **Modern UI/UX** - Gradient design with smooth animations
- **Token-based Authentication** - Secure user session management

## License

This project is open source and available under the MIT License.

## Support & Contact

For issues, questions, or contributions:

### Technical Support
1. Check the troubleshooting section above
2. Review browser console for JavaScript errors
3. Check server logs for backend issues
4. Ensure all dependencies are installed correctly

### Development Support
- **Issues**: Report bugs or request features via GitHub issues
- **Documentation**: Comprehensive inline code comments
- **Code Structure**: Well-organized and modular architecture
- **Best Practices**: Follows modern web development standards

### Contact Information
- **Project**: ShopEase E-commerce Platform
- **Version**: 2.0 (Enhanced with Payment System)
- **Last Updated**: July 2025

---

**🎉 Welcome to ShopEase - Your Complete E-commerce Solution! 🛒**

*Experience modern online shopping with secure payments, beautiful design, and seamless user experience.* 