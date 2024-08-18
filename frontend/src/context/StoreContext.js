import { createContext, useState, useEffect, useMemo, useCallback } from "react";
import axios from 'axios';

// Create a Context for the Store
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    // Base URL for API requests
    const url = 'https://food-munch-delivery-backend.onrender.com';

    // State variables
    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState('');
    const [username, setUsername] = useState('');
    const [food_list, setFoodList] = useState([]);
    const [promoCode, setPromoCode] = useState('');
    const [deliveryFee, setDeliveryFee] = useState(29);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Load token and username from localStorage
    const loadToken = () => {
        const savedToken = localStorage.getItem('token');
        const savedUsername = localStorage.getItem('username');
        if (savedToken) {
            setToken(savedToken);
        }
        if (savedUsername) {
            setUsername(savedUsername);
        }
        return savedToken;
    };

    // Add item to cart
    const addToCart = useCallback(async (itemId) => {
        setCartItems((prevState) => {
            const newCart = { ...prevState };
            if (!newCart[itemId]) {
                newCart[itemId] = 1;
            } else {
                newCart[itemId] += 1;
            }
            return newCart;
        });

        if (token) {
            try {
                await axios.post(`${url}/api/cart/add`,
                    { itemId },
                    { headers: { token } }
                );
            } catch (error) {
                console.error('Failed to add to cart', error);
                setError('Failed to add to cart. Please try again.');
            }
        }
    }, [token, url]);

    // Remove item from cart (reduce quantity)
    const removeFromCart = useCallback(async (itemId) => {
        setCartItems((prevState) => {
            const newCart = { ...prevState };
            const currentCount = newCart[itemId] || 0;
            const newCount = currentCount - 1;
            if (newCount <= 0) {
                delete newCart[itemId];
                if (token) {
                    axios.post(`${url}/api/cart/delete`,
                        { itemId },
                        { headers: { token } }
                    ).catch(error => {
                        console.error('Failed to delete from cart', error);
                        setError('Failed to delete item from cart. Please try again.');
                    });
                }
            } else {
                newCart[itemId] = newCount;
                if (token) {
                    axios.post(`${url}/api/cart/remove`,
                        { itemId },
                        { headers: { token } }
                    ).catch(error => {
                        console.error('Failed to remove from cart', error);
                        setError('Failed to remove from cart. Please try again.');
                    });
                }
            }
            return newCart;
        });
    }, [token, url]);

    // Completely remove item from cart
    const deleteFromCart = useCallback(async (itemId) => {
        setCartItems((prevState) => {
            const { [itemId]: _, ...updatedCart } = prevState;
            if (token) {
                axios.post(`${url}/api/cart/delete`,
                    { itemId },
                    { headers: { token } }
                ).catch(error => {
                    console.error('Failed to delete from cart', error);
                    setError('Failed to delete item from cart. Please try again.');
                });
            }
            return updatedCart;
        });
    }, [token, url]);

    // Calculate total cart amount
    const getTotalCartAmount = useCallback(() => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                const itemInfo = food_list.find(
                    (product) => product._id === item
                );
                totalAmount += itemInfo?.price * cartItems[item];
            }
        }
        return totalAmount;
    }, [cartItems, food_list]);

    // Get total count of items in the cart
    const getCartItemsCount = useCallback(() => {
        return Object.keys(cartItems).length;
    }, [cartItems]);

    // Fetch the list of food items
    const fetchFoodList = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`${url}/api/food/list`);
            setFoodList(response.data.data);
        } catch (error) {
            console.error('Failed to fetch food list', error);
            setError('Failed to load food orders list. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Load cart data based on the token
    const loadCartData = async (token) => {
        try {
            const response = await axios.post(`${url}/api/cart/get`, {}, { headers: { token } });
            setCartItems(response.data.cartData);
        } catch (error) {
            console.error('Failed to load cart data', error);
            setError('Failed to load cart data. Please try again.');
        }
    };

    // Apply a promo code and adjust delivery fee
    const applyPromoCode = (code) => {
        if (code === 'Varuncvk' || code === 'FoodMunch') {
            setPromoCode(code);
            setDeliveryFee(0);
        } else {
            setPromoCode('');
            setDeliveryFee(29);
        }
    };

    useEffect(() => {
        const initializeApp = async () => {
            setLoading(true);
            await fetchFoodList();
            const token = loadToken();
            if (token) {
                await loadCartData(token);
            }
            setLoading(false);
        };
        initializeApp();
    }, []);

    // Memoized context value to avoid unnecessary re-renders
    const contextValue = useMemo(() => ({
        url,
        token,
        username,
        food_list,
        cartItems,
        promoCode,
        deliveryFee,
        loading,
        error,
        applyPromoCode,
        setToken,
        setUsername,
        fetchFoodList,
        setCartItems,
        addToCart,
        removeFromCart,
        deleteFromCart,
        getTotalCartAmount,
        getCartItemsCount,
        setLoading,
        setError
    }), [
        url, token, username, food_list, cartItems, promoCode,
        deliveryFee, loading, error, addToCart, removeFromCart,
        deleteFromCart, getTotalCartAmount, getCartItemsCount
    ]);

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
