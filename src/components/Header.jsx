import header from "../styles/Header.module.css";
import { Link } from "react-router-dom";

function Header({ cart }) {
    const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);
    return (
        <div className={header.header}>
            <div className={header.leftSide}>
                <Link to="/" className={header.storeName}>Store Name</Link>
            </div>
            <div className={header.rightSide}>
                <Link to="/" className={header.link}>
                    About
                </Link>
                <Link to="shop" className={header.link}>
                    Shop
                </Link>
                <Link to="cart" className={header.link}>
                    Cart ({cartItemCount})
                </Link>
            </div>
        </div>
    );
}

export default Header;
