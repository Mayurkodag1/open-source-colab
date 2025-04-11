import "./Footer.css";
import fb from "../../assets/Images/fb.png";
import insta from "../../assets/Images/insta.png";
import pinterest from "../../assets/Images/pinterest.png";
import twitter from "../../assets/Images/twitter.png";
import ytb from "../../assets/Images/ytb.png";
import { Link } from "react-router-dom";



function Footer() {
    
  
  return (
    <>
      <div className="footerBG">
        <div className="footerComponents">
          <div className="footer_sec_one">
            <p>
              <span className="footer_blog_color">Open</span>{" "}
              <span className="footer_sphere_color">Source</span>
              <span className="footer_blog_color">Collab</span>{" "}
            </p>
            <div className="footerIcons">
              <a href="https://www.facebook.com/login/" target="_blank" rel="noopener noreferrer">
                <img className="IconSpacing" src={fb} alt="Facebook" />
              </a>
              <a href="https://x.com/i/flow/login?lang=en&mx=2" target="_blank" rel="noopener noreferrer">
                <img className="IconSpacing" src={twitter} alt="Twitter" />
              </a>
              <a href="https://www.instagram.com/accounts/emailsignup/" target="_blank" rel="noopener noreferrer">
                <img className="IconSpacing" src={insta} alt="Instagram" />
              </a>
              <a href="https://in.pinterest.com/login/" target="_blank" rel="noopener noreferrer">
                <img className="IconSpacing" src={pinterest} alt="Pinterest" />
              </a>
              <a href="https://www.youtube.com/account" target="_blank" rel="noopener noreferrer">
                <img className="IconSpacing" src={ytb} alt="YouTube" />
              </a>
            </div>
          </div>

          <div className="footer_sec_two">
            <p className="footer_QuickLinks">Quick Links</p>
            <ul>
              <li><Link className="footerList" to="/">Home</Link></li>
              <li><Link className="footerList" to="/about" >About</Link></li>
              <li><Link className="footerList" to="/contact">Contact</Link></li>

              
            </ul>
          </div>

          <div className="footer_sec_three">
            <p className="footer_terms_and_polices">Terms & Policies</p>
            <ul>
              <li ><Link className="footerList" to="/terms-of-conditions">Terms of Conditions</Link></li>
              <li ><Link className="footerList" to="/f&q">F&Q</Link></li>
              <li ><Link className="footerList" to="/privacy-policy">Privacy Policy</Link></li>
            </ul>
          </div>

          <div className="footer_sec_four">
            <p className="footer_get_in_touch">Get In Touch</p>
            <ul>
              <li className="footerList">0471-2525444</li>
              <li className="footerList">opensource@gmail.com</li>
            </ul>
          </div>
        </div>

        <hr className="footer_bottom_line"></hr>
        <p className="Footer_copyright">
          Copy right &copy; 2025.All rights received
        </p>
      </div>
    </>
  );
}

export default Footer;
