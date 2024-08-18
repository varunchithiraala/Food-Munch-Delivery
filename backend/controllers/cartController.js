import userModel from '../models/userModel.js';

// Add items to user cart
const addToCart = async (req, res) => {
    try {
        // Fetch the user data by ID
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;

        // If item is not in the cart, add it with quantity 1, otherwise increase quantity
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        } else {
            cartData[req.body.itemId] += 1;
        }

        // Update the user's cart data
        await userModel.findByIdAndUpdate(req.body.userId, { cartData });

        // Send success response
        res.json({ success: true, message: 'Added To Cart' });
    } catch (error) {
        console.log(error);
        // Send error response
        res.json({ success: false, message: 'Error' });
    }
};

// Remove items from user cart
const removeFromCart = async (req, res) => {
    try {
        // Fetch the user data by ID
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;

        // Decrease quantity if it's greater than 0
        if (cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;
        }

        // Update the user's cart data
        await userModel.findByIdAndUpdate(req.body.userId, { cartData });

        // Send success response
        res.json({ success: true, message: 'Removed From Cart' });
    } catch (error) {
        console.log(error);
        // Send error response
        res.json({ success: false, message: 'Error' });
    }
};

// Fetch user cart data
const getCart = async (req, res) => {
    try {
        // Fetch the user data by ID
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;

        // Send cart data in the response
        res.json({ success: true, cartData });
    } catch (error) {
        console.log(error);
        // Send error response
        res.json({ success: false, message: 'Error' });
    }
};

// Delete item from user cart
const deleteFromCart = async (req, res) => {
    try {
        // Fetch the user data by ID
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;

        // If the item exists in the cart, delete it
        if (cartData[req.body.itemId]) {
            delete cartData[req.body.itemId];
        }

        // Update the user's cart data
        await userModel.findByIdAndUpdate(req.body.userId, { cartData });

        // Send success response
        res.json({ success: true, message: 'Deleted from cart' });
    } catch (error) {
        console.log(error);
        // Send error response
        res.json({ success: false, message: 'Error' });
    }
};

export { addToCart, removeFromCart, getCart, deleteFromCart };
