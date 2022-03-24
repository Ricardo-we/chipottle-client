import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebook, faWhatsapp } from '@fortawesome/free-brands-svg-icons';

function Footer() {
    return ( 
        <footer 
            className="w-100 d-flex flex-row flex-wrap align-items-center justify-content-around" 
            style={{ padding: 30, backgroundColor: 'black'}}
        >
            <a target="_blank" style={{textDecoration: 'none', color: '#eeb204', padding: 20}} href="https://www.instagram.com/chipottlegrillguate/">
                <FontAwesomeIcon icon={faInstagram} size="lg" color="#eeb204"/>
            </a>
            <a target="_blank" style={{textDecoration: 'none', color: '#eeb204', padding: 20}} href="https://www.facebook.com/chipottlegrillguate/photos">
                <FontAwesomeIcon icon={faFacebook} size="lg" color="#eeb204"/>
            </a>
            <a target="_blank" style={{textDecoration: 'none', color: '#eeb204', padding: 20}} href="https://wa.link/wnszjw">
                <FontAwesomeIcon icon={faWhatsapp} size="lg" color="#eeb204"/>

            </a>
        </footer>
    );
}

export default Footer;