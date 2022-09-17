import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import "./Footer.css";

function Footer() {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>Dowload Our App</h4>
        <p>Download App for Andriod and IOS mobile phone</p>
        <img src={playStore} alt="playStoreIcon" />
        <img src={appStore} alt="appSoreIcon" />
      </div>
      <div className="midFooter">
        <h1>ECOMMERECE.</h1>
        <p>High Quality is our first priority</p>
        <p>Copyrights 2022 &copy; RomanFarooq</p>
      </div>
      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="https://www.instagram.com/roman_farooq/">Instagram</a>
        <a href="https://www.youtube.com/channel/UCyuE8E-L4CPejm4IlO73fsw">Youtube</a>
        <a href="https://www.facebook.com/TheRomanFarooq">Facebook</a>
      </div>
    </footer>
  );
}

export default Footer;
