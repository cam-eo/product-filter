import styles from '../styles/ProductCard.module.css'
import Image from 'next/image'

const ProductCard = ({ imageUrl, productDescription, productPrice }) => {
    return (
        <div className={styles.container}>            
            <div className={styles.imageContainer}>
                <Image 
                    width={300}
                    height={300}
                    src={`https:${imageUrl}`} 
                    alt='Product Image' />
            </div>
            <div className={styles.detailContainer}>
                <span className={styles.description}>{productDescription}</span>
                <span className={styles.price}>{productPrice}</span>
            </div>
        </div>
    )
}

export default ProductCard