import { useOutletContext } from "react-router-dom";
import cartStyle from "../styles/Cart.module.css";
import { Link } from "react-router-dom";

function Cart() {
    const { cart } = useOutletContext();

    return (
        <div className={cartStyle.cart}>
            {cart === undefined || cart.length === 0 ? (
                <div className={cartStyle.emptyCart}>
                    <h3>Your cart is empty!</h3>
                    <p>
                        Browse our selection of premium cuts and add your
                        favorites to the cart.
                    </p>
                    <Link to="/shop" className={cartStyle.shopNowLink}>
                        SHOP NOW
                    </Link>
                </div>
            ) : (
                <div className={cartStyle.cartItems}>
                    {cart.map((item, index) => (
                        <CartItem key={index} item={item} />
                    ))}
                </div>
            )}
        </div>
    );
}

function CartItem({ item }) {
    const { adjustItemQuantity, removeFromCart } = useOutletContext();

    return (
        <div className={cartStyle.cartItem}>
            <div className={cartStyle.leftSide}>
                <img src={item.image}></img>
            </div>
            <div className={cartStyle.rightSide}>
                <h4>{item.name}</h4>
                <p>{item.price}$</p>
                <div className={cartStyle.add}>
                    <button className={cartStyle.minusButton} onClick={() => adjustItemQuantity(item.name, -1)}>-</button>
                    <p className={cartStyle.amount}>{item.amount}</p>
                    <button className={cartStyle.plusButton} onClick={() => adjustItemQuantity(item.name, 1)}>+</button>
                </div>
                <p>{Math.round(item.price * item.amount)}$</p>
                <button className={cartStyle.removeItem} onClick={() => removeFromCart(item.name)}>Remove</button>
            </div>
        </div>
    );
}

export default Cart;
