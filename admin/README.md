# Food Munch - Admin Portal

## Overview

The Admin Portal is a web application for managing food items and orders. It features a user-friendly interface for adding, listing, and managing orders. The application is built with React and provides a seamless experience for administrators.

## Features

- **Add Items**: Add new food items to the inventory.
- **List Items**: View and manage the list of food items.
- **Orders**: View and manage customer orders.
- **Responsive Design**: The application is designed to be responsive and accessible on various devices.
- **Toast Notifications**: User feedback is provided via toast notifications.

## Technologies Used

- **React**: For building the user interface.
- **React Router**: For handling routing within the application.
- **Axios**: For making HTTP requests.
- **React Toastify**: For displaying toast notifications.
- **CSS**: For styling the components.
  
## Installation

### Prerequisites

Ensure you have `node` and `npm` installed. You can download them from [Node.js official site](https://nodejs.org/).

### Steps

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/varunchithiraala/Food-Munch-Delivery.git
2. **Navigate to the Project Directory:**
   ```bash
   cd admin
3. **Install Dependencies:**
   ```bash
   npm install
4. **Run the Application:**
   ```bash
   npm start
The application will be available at [http://localhost:3001](http://localhost:3001).

## Usage

- **Home Page**: Welcome message and links to navigate to different sections.
- **Add Items**: Use the form to add new food items. Upload an image, provide the item’s name, description, category, and price.
- **List Items**: View and manage the list of food items.
- **Orders**: View and update the status of customer orders.

## API Endpoints

- **GET /api/order/list**: Fetch all orders.
- **POST /api/order/status**: Update the status of an order.
- **POST /api/food/add**: Add a new food item.

## Directory Structure

- `src/assets/`: Contains static assets like images and icons.
- `src/components/`: Contains reusable components like Navbar and Sidebar.
- `src/pages/`: Contains the different pages of the application, such as Home, Add, List, and Orders.

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature
3. Commit your changes:
   ```bash
   git commit -m 'Add new feature'
4. Push to the branch:
   ```bash
   git push origin feature/your-feature
5. Open a Pull Request.

## Contact

For any questions or feedback, please contact:

- **Name:** Ch. Varun Kumar
- **Email:** varuncvk13@gmail.com
- **GitHub:** [https://github.com/varunchithiraala](https://github.com/varunchithiraala)
