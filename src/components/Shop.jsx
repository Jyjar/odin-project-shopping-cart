import shop from "../styles/Shop.module.css";
import { useOutletContext } from "react-router-dom";

function Shop() {
    const { shopItems } = useOutletContext();

    return (
        <div className={shop.shop}>
            <div className={shop.shopItems}>
                {shopItems.map((item, index) => (
                    <ShopItem
                        key={index}
                        name={item.title}
                        price={item.price}
                        image={item.image}
                        amount={item.amount}
                    />
                ))}
            </div>
        </div>
    );
}

function ShopItem({ price, name, image, amount }) {
    const { cart, removeFromCart, addToCart, adjustItemQuantity } = useOutletContext();
    const isInCart = cart.some((cartItem) => cartItem.name === name);

    function handleAddToCart() {
        if (amount === 0 && isInCart) {
            removeFromCart(name);
        } else if (amount > 0) {
            addToCart({ name, price, image, amount });
        }
    }

    return (
        <div className={shop.shopItem}>
            <div className={shop.imageDiv}>
                <img src={image} className={shop.itemImage} alt={name}></img>
            </div>
            <div className={shop.itemInfo}>
                <div className={shop.namePrice}>
                    <h4 className={shop.itemName}>{name}</h4>
                    <h4 className={shop.itemPrice}>{price}$</h4>
                </div>
                <div className={shop.add}>
                    <button className={shop.minusButton} onClick={() => adjustItemQuantity(name, -1)}>
                        -
                    </button>
                    <p className={shop.amount}>{amount}</p>
                    <button className={shop.plusButton} onClick={() => adjustItemQuantity(name, 1)}>
                        +
                    </button>
                </div>
                <button className={shop.addToCart} onClick={handleAddToCart}>
                    {isInCart ? "UPDATE CART" : "ADD TO CART"}
                </button>
            </div>
        </div>
    );
}

export default Shop;
