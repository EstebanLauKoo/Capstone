import {Outlet, Link} from "react-router-dom";
import "./navigation.styles.scss";
// useful if you don't want to render some specific like the case of parent div
import {Fragment} from "react";
import {ReactComponent as CrwnLogo} from "../../assets/crown.svg"

const Navigation = () => {

    return (
        <Fragment>
            <div className="navigation">
                <Link className="logo-container" to="/">
                    <CrwnLogo className="logo"/>
                </Link>
                <div className="nav-links-container">
                    <Link className="nav-link" to="/shop">
                        SHOP
                    </Link>
                    <Link className="nav-link" to="/auth">
                        SIGN IN
                    </Link>
                </div>
            </div>
            <Outlet/>
        </Fragment>
    )
}

export default Navigation;