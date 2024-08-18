# Food Munch - Frontend

Food Munch is a modern web application for exploring food menus, placing orders, and managing food deliveries. The frontend is built with React, offering a smooth and intuitive user experience.

## Features

- **Home Page**: Explore food categories and menu items.
- **Cart**: Manage items in your cart and proceed to checkout.
- **Place Order**: Enter delivery details and place an order.
- **Order Verification**: Automatically verify payment and view order summary.
- **My Orders**: Track past orders and view order details.
- **Error Handling**: User-friendly messages for errors and empty order lists.

## Tech Stack

- **Frontend**: React, React Router, Axios
- **Styling**: CSS

## Installation

Follow these steps to set up the frontend locally:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/varunchithiraala/Food-Munch-Delivery.git
2. **Navigate to the frontend directory:**
   ```bash
   cd frontend
3. **Install dependencies:**
   ```bash
   npm install
4. **Start the development server:**
   ```bash
   npm start
The application will be available at [http://localhost:3000](http://localhost:3000).

## Usage

- **Home**: Browse categories and menu items.
- **Cart**: Add items to your cart and proceed to checkout.
- **Place Order**: Fill in delivery details and place your order.
- **Order Verification**: The app will verify payment and redirect to the orders page.
- **My Orders**: View order history and track current orders.

## Components

- **Navbar**: Navigation bar with links to various sections.
- **Footer**: Footer with links and extra information.
- **LoginPopUp**: Popup component for user login.

## API Endpoints (Frontend Integration)

- **Place Order**: `POST /api/order/place` - Place a new order.
- **Verify Payment**: `POST /api/order/verify` - Verify payment and update order status.
- **User Orders**: `POST /api/order/userorders` - Fetch orders for the logged-in user.

## Styling

- The application uses custom CSS for styling. Make sure to update `index.css` for any global styles.
- Responsive design is incorporated to ensure a seamless experience on mobile devices.

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-branch
3. Commit your changes:
   ```bash
   git commit -m 'Add new feature'
4. Push to the branch:
   ```bash
   git push origin feature-branch
5. Create a Pull Request.

## Contact

For any questions or feedback, please contact:

- **Name:** Ch. Varun Kumar
- **Email:** varuncvk13@gmail.com
- **GitHub:** [https://github.com/varunchithiraala](https://github.com/varunchithiraala)
