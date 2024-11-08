import home from "../styles/Home.module.css";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className={home.home}>
            <h1>Welcome to this store!</h1>
            <p>What are you waitining for? Press the button below!</p>
            <Link to="/shop" className={home.shopNowLink}>
                SHOP NOW
            </Link>
        </div>
    );
};

export default Home;
