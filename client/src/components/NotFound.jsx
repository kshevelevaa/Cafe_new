import {Header} from "./Header";
import {Footer} from "./Footer";
import error from "../assets/images/error-img.jpg"

export const NotFound = () => {
    return (
        <div>
            <Header/>
            <section className="error">
                <div className="error-top">
                    <img src={error} alt=""/>
                </div>
                <h3>This Page Is Not Be Found</h3>
                <p>
                    Completely redefine competitive products after state of the art growth the theme are strategies.
                    Credibly whiteboard prospective manufactured products for economically sound and platforms.
                    Professionally initiate cooperative systems vis-a-vis optimal mindshare.
                </p>
            </section>
            <Footer/>
        </div>
    );
};