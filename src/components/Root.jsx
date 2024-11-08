import { Outlet } from "react-router-dom";
import Header from "./Header";
import { useState, useEffect } from "react";

const Root = () => {
    const [cart, setCart] = useState([]);
    const [shopItems, setShopItems] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("https://fakestoreapi.com/products?limit=10")
            .then((response) => {
                if (response.status >= 400) {
                    throw new Error("server error");
                }
                return response.json();
            })
            .then((response) =>
                setShopItems(response.map((item) => ({ ...item, amount: 0 })))
            )
            .catch((error) => setError(error));
    }, []);

    function updateAmount(itemName, newAmount) {
        setShopItems((prevShopItems) =>
            prevShopItems.map((item) =>
                item.title === itemName ? { ...item, amount: newAmount } : item
            )
        );
    }

    function addToCart(item) {
        const existingItem = cart.find(
            (cartItem) => cartItem.name === item.name
        );

        if (!existingItem) {
            setCart((prevCart) => [...prevCart, { ...item, quantity: 1 }]);
        } else {
            console.log(
                `Item with name "${item.name}" is already in the cart.`
            );
        }
    }

    function removeFromCart(itemName) {
        setCart((prevCart) =>
            prevCart.filter((cartItem) => cartItem.name !== itemName)
        );
        updateAmount(itemName, 0);
    }

    function adjustItemQuantity(itemName, adjustment) {
        setShopItems((prevShopItems) =>
            prevShopItems.map((item) =>
                item.title === itemName
                    ? { ...item, amount: Math.max(item.amount + adjustment, 0) }
                    : item
            )
        );

        setCart((prevCart) => {
            const updatedCart = prevCart.map((cartItem) =>
                cartItem.name === itemName
                    ? { ...cartItem, amount: Math.max(cartItem.amount + adjustment, 0) }
                    : cartItem
            );

            return updatedCart.filter((cartItem) => cartItem.amount > 0);
        });
    }

    return (
        <>
            <Header cart={cart} />
            <Outlet
                context={{
                    shopItems,
                    addToCart,
                    updateAmount,
                    removeFromCart,
                    cart,
                    adjustItemQuantity,
                }}
            />
        </>
    );
};

export default Root;
