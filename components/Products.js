import { useState, useEffect } from 'react'
import styles from '../styles/Products.module.css'
import ProductCard from './ProductCard'
import miista from '../pages/api/miista-export.json'
import getProductsToDisplay from '../pages/api/getProductsToDisplay'
import { useStateValue } from '../stateManagement/StateProvider';

const Products = () => {

    const [pages, setPages] = useState([])
    const [activePageIndex, setActivePageIndex] = useState(0)
    const [productsToDisplay, setProductsToDisplay] = useState([])
    const numberOfProductsPerPage = 12
    const [state, dispatch] = useStateValue()

    useEffect(() => {
        const tempProductsToDisplay  = getProductsToDisplay(state.filters, 0, numberOfProductsPerPage)
        setProductsToDisplay(tempProductsToDisplay)

        const numberOfProducts = miista.data.allContentfulProductPage.edges.length
        setPages([1, 2, 3, 4, 5, parseInt(numberOfProducts/numberOfProductsPerPage)])

    }, [state])

    function handlePagePress(page, pageIndex){

        const productIndex = (page*numberOfProductsPerPage)-numberOfProductsPerPage
        const tempProductsToDisplay = getProductsToDisplay(state.filters, productIndex, numberOfProductsPerPage)

        setActivePageIndex(pageIndex)
        setProductsToDisplay(tempProductsToDisplay)
    }

    return (
        <div className={styles.container}>
            <div className={styles.innerContainer}>
                {productsToDisplay?.map((rowData, i) => (
                <div 
                    className={styles.row}
                    key={i}>
                    {rowData.map((product, j) => 
                    <ProductCard 
                            key={j}
                            productDescription={product.node.name}
                            productPrice={product.node.shopifyProductEu.variants.edges[0].node.price}
                            imageUrl={product.node.thumbnailImage.file.url} />
                            )}
                </div>)
                )}
                <div className={styles.pagesContainer}>
                    <div className={styles.pagesArrowContainer}><span>{"<"}</span>
                    </div>
                    {pages.map((page, m) => m < pages.length-1 ? 
                        <div onClick={()=> handlePagePress(page, m)} key={m} style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            backgroundColor: `${activePageIndex === m ? 'lightgray' : 'white'}`, 
                            height: 30, 
                            width: 30,}}>
                                <span >{page}</span>
                        </div> : 
                        <div key={m} style={{
                            display: 'flex',}}><span style={{
                                marginLeft: 10,
                                marginRight: 10,}}>...</span>
                            <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: `${activePageIndex === m ? 'lightgray' : 'white'}`, 
                            height: 30, 
                            width: 30,}}><span>{page}</span></div>
                        </div>)}
                    <div className={styles.pagesArrowContainer}><span>{">"}</span></div>
                </div>
            </div>
            
        </div>
    )
}

export default Products