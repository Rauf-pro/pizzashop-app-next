
import React, { createContext, useState } from "react";

// cart context
export const CartContext = createContext();

const CartProvider = ({ children }) => {
    // cart open state
    const [isOpen, setIsOpen] = useState(false);
    // cart state
    const [cart, setCart] = useState([]);
    // add to cart
    const addToCart = (
        id,
        image,
        name,
        price,
        additionalTopping,
        size,
        crust) => {

        // sort additionalTopping array by  name
        additionalTopping.sort((a, b) => a.name.localeCompare(b.name));

        const newItem = {
            id,
            image,
            name,
            price,
            additionalTopping,
            size,
            crust,
            amount: 1
        };


        const CartItemIndex = cart.findIndex((item) => item.id === id && item.price === price && item.size === size &&
            // check if additionalTopping array is equal
            JSON.stringify(item.additionalTopping) === JSON.stringify(additionalTopping) && item.crust === crust);

        // if item already exists in the cart, increase the amount
        if (CartItemIndex === -1) {
            setCart([...cart, newItem]);
        } else {
            const newCart = [...cart];
            newCart[CartItemIndex].amount += 1;
            setCart(newCart);
        }



        // open the cart everytime an item is added
        setIsOpen(true);
    }

    return (
        <CartContext.Provider value={{ isOpen, setIsOpen, addToCart, cart }}>
            {children}
        </CartContext.Provider>)
}

export default CartProvider