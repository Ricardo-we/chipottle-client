// UTILS
import { useState } from 'react'
// IMAGES
import evento from './../../img/evento.jpg'
import tacos from './../../img/tacos.jpg';
import tortas from './../../img/torta.jpg';
import gringas from './../../img/gringas.jpg';
import gringas2 from './../../img/gringa-2.png';
import pastel from './../../img/pastel-batman.jpg';
import combo from './../../img/homepage-4.jpg';
import chuchitos from './../../img/chuchitos.jpg';
// COMPONENTS AND STYLES
import '../../css/Homepage.css';
import NavBar from "./NavBar";
import { Link } from 'react-router-dom';
import Modal from '../../public-components/Modal';
import { AnimatePresence } from "framer-motion";
import Footer from './Footer';

const ImageModal = ({ handleClose, image }) => {
    return (
        <Modal handleClose={handleClose}  style={{padding: 0}}>
            <img src={image} style={{width: '100%', height: '100%', objectFit: 'cover'}}/>
        </Modal>
    )
}

function Homepage() {
    const [modalVisible, setModalVisible] = useState(false)
    const [modalImage, setModalImage] = useState('');
    
    const handleSelectedImage = (image) => {
        setModalVisible(true)
        setModalImage(image);
    }

    return ( 
        <>
        <AnimatePresence initial={false} exitBeforeEnter={true}>
            {modalVisible && 
                <ImageModal handleClose={() => setModalVisible(false)} image={modalImage}/>
            }
        </AnimatePresence>
        <NavBar/>
        <div className="background-container">
            <section className="main-wraper bg-black">
                <section className="homepage-section">
                    <div className="text-white text-center home-card-item bg-black">
                        <h1>Bienvenido a chipottle grill</h1>
                        <p>Tenemos variedad de productos  méxicanos</p>
                        <Link className="homepage-btn" to='/shop/1'>
                            Nuestros productos
                        </Link>
                    </div>
                    <img src={tacos} className="home-card-item home-card-img"/>
                </section>

                <section className="homepage-section">
                        <img src={evento} className="home-card-item home-card-img"/>
                    <div className="text-white text-center home-card-item bg-black">
                        <h1>Realizamos eventos con cualquier tipo de comida</h1>
                        <p>Eventos a tu medida</p>
                        <Link className="homepage-btn" to='/events'>
                            Nuestros eventos
                        </Link>
                    </div>
                </section>
            </section>

            <section className="gallery text-white" style={{marginTop: 120}}>
                <h1>Algunos de nuestros productos</h1>
                <div className="images-container">
                    <div className="gallery-img-container" onClick={() => handleSelectedImage(tortas)}>
                        <img src={tortas} alt="" className="gallery-img"/>
                        <div className="img-overlay">
                            <h2>Haz click</h2>
                            <span>para ver en detalle</span>
                        </div>
                    </div>
                    <div className="gallery-img-container" onClick={() => handleSelectedImage(gringas)}>
                        <img src={gringas} alt="" className="gallery-img"  />
                        <div className="img-overlay">
                            <h2>Haz click</h2>
                            <span>para ver en detalle</span>
                        </div>
                    </div>
                    <div className="gallery-img-container" onClick={() => handleSelectedImage(pastel)}>
                        <img src={pastel} alt="" className="gallery-img"  />
                        <div className="img-overlay">
                            <h2>Haz click</h2>
                            <span>para ver en detalle</span>
                        </div>
                    </div>
                    <div className="gallery-img-container" onClick={() => handleSelectedImage(combo)}>
                        <img src={combo} alt="" className="gallery-img"  />
                        <div className="img-overlay">
                            <h2>Haz click</h2>
                            <span>para ver en detalle</span>
                        </div>
                    </div>
                    <div className="gallery-img-container" onClick={() => handleSelectedImage(chuchitos)}>
                        <img src={chuchitos} alt="" className="gallery-img" />
                        <div className="img-overlay">
                            <h2>Haz click</h2>
                            <span>para ver en detalle</span>
                        </div>
                    </div>
                    <div className="gallery-img-container" onClick={() => handleSelectedImage(gringas2)}>
                        <img src={gringas2} alt="" className="gallery-img"/>
                        <div className="img-overlay">
                            <h2>Haz click</h2>
                            <span>para ver en detalle</span>
                        </div>
                    </div>
                </div>
            </section>

            <section className="about-us">
                <div className="about-us-inner">
                    <h2>Estamos para cumplir las nececidades de nuestros clientes</h2>
                    <p style={{fonSize: 45}}>
                        Nosotros estamos comprometidos a entregar la mejor calidad, y amor en nuestros productos
                    </p>
                </div>
            </section>
        </div>
        <Footer/>
        </>
    );
}

export default Homepage;