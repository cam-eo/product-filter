import styles from '../styles/Header.module.css'
import Image from 'next/image'
import splash from '../public/images/splash.jpg'

const Header = () => {
    return (
        <div className={styles.container}>
            <div className={styles.innerContainer}>
                <div className={styles.leftContainer}>
                    <span>MIISTA</span>
                </div>
                {/* <div className={styles.middleContainer}>
                    <span>SHOP</span>
                    <span>E8 BY MIISA</span>
                    <span>STORES</span>
                    <span>ABOUT</span>
                    <span>JOURNAL</span>
                </div>
                <div className={styles.rightContainer}>
                    <span>SHOP</span>
                    <span>E8 BY MIISA</span>
                    <span>STORES</span>
                    <span>ABOUT</span>
                </div> */}
            </div>
            
            <div className={styles.imageContainer}>
                <Image src={splash} alt='splash' />
            </div>
        </div>
    )
}

export default Header