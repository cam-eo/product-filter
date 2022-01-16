import { useState, useEffect, useReducer } from 'react'
import styles from '../styles/Filter.module.css'
import miista from '../pages/api/miista-export.json'

const initialState = { filters: { colors: [], priceRanges: [], categories: [] } }

function reducer(state, action) {
    switch (action.type) {
        case 'ADD_COLOR_FILTER':
            const newFilters = state.filters
            const newColorFilters = state.filters.colors

            newColorFilters.push(action.colorToAdd)
            newFilters.colors = newColorFilters

            return { ...state, filters: newFilters }
        case 'REMOVE_COLOR_FILTER': 
            const newFilterss = state.filters
            const newColorFilterss = state.filters.colors
            
            const colorFilterIndexx = newColorFilterss.findIndex(
                (color) => color === action.colorToRemove
            )

            newColorFilterss.splice(colorFilterIndexx, 1)
            newFilterss.colors = newColorFilters

            return { ...state, filters: newFilters }
        default:
            return state
    }
}



const Filter = () => {

    const [availableColors, setAvailableColors] = useState([])
    const [maxPrice, setMaxPrice] = useState(0)
    const [priceBins, setPriceBins] = useState([])
    const [availableCategories, setAvailableCategories] = useState([])
    const [state, dispatch] = useReducer(reducer, initialState)

    console.log("state: ", state)

    useEffect(() => {

        miista.data.allContentfulProductPage.edges.forEach((node) => {
            if(node.node.colorFamily){
                node.node.colorFamily.forEach(color => {
                    if(!availableColors.includes(color.name)){
                        setAvailableColors([...availableColors, color.name])
                    }
                })
            }

            if(node.node.categoryTags){
                node.node.categoryTags.forEach(category => {
                    if(!availableCategories.includes(category)){
                        setAvailableCategories([...availableCategories, category])
                    }
                }) 
            }

            if(node.node.shopifyProductEu.variants.edges[0].node.price && Number(node.node.shopifyProductEu.variants.edges[0].node.price) > maxPrice){
                setMaxPrice(parseInt(node.node.shopifyProductEu.variants.edges[0].node.price))
            }
        })

        const maxPriceFirstDigit = Number(maxPrice.toString().charAt(0))

        const binsTemp = Array.from(Array(maxPriceFirstDigit).keys())

        for(let j = 0; j < binsTemp.length; j++){
            let increment = (10**(maxPrice.toString().length-1))
            let tempNumber = j*increment
            binsTemp[j] = `${j === binsTemp.length-1 ? `${tempNumber+increment}+` : `${tempNumber} - ${tempNumber+increment}`}`
        }

        setPriceBins(binsTemp)
    }, [availableColors, maxPrice, availableCategories])

    function colorItemPress(pushColor){
        dispatch({
            type: 'ADD_COLOR_FILTER',
            colorToAdd: pushColor
        })
    }
    function removeColorFilter(pushColor){
        dispatch({
            type: 'REMOVE_COLOR_FILTER',
            colorToRemove: pushColor
        })
    }

    return (
        <div className={styles.container}>
            <span>X</span>
            <div>
                <span>COLORRS</span>
                {state.filters.colors.map((colorFilter, f)=> <div onClick={()=>removeColorFilter(colorFilter)} key={f}><span>{colorFilter}</span></div>)}
            </div>
            <span>CLEAR FILTER</span>
            <div>
                <span>COLOR: </span>
                <div className={styles.colourOptionsContainer}>
                    {availableColors?.map((color, i) => 
                    <span onClick={()=> colorItemPress(color)} style={{ backgroundColor: `${color.toLowerCase()}`, width: 20, height: 20, borderRadius: 10 }} key={i}></span>)}
                </div>
            </div>
            <div>
                <span>PRICE RANGE: </span>
                <div className={styles.colourOptionsContainer}>
                    {priceBins?.map((priceBin, k) => <span style={{ backgroundColor: 'lightgray'}} key={k}>{priceBin}</span>)}
                </div>
            </div>
            <div>
                <span>CATEGORY: </span>
                <div className={styles.colourOptionsContainer}>
                    {availableCategories?.map((availableCategorie, k) => <span style={{ backgroundColor: 'lightgray'}} key={k}>{availableCategorie}</span>)}
                </div>
            </div>
        </div>
    )
}

export default Filter