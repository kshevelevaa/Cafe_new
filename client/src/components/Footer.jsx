import {NavLink} from "react-router-dom";

export const Footer = () => {
    return (
        <footer>
            <div className="scroll-top">
                <i className="fa fa-angle-up"></i>
            </div>
            <div className="footer-bottom">
                <p>&copy; <span>Coffeeffee</span> 2023, All Right Reserves | Design by <NavLink to="https://github.com/kshevelevaa">KSheveleva</NavLink></p>
            </div>
        </footer>
    );
};