import miista from './miista-export.json'

export default function getProductsToDisplay(filters, productIndex, numberOfProductsPerPage) {

    let rowIndex = 0
    let rowData = []
    let outputProducts = []

    const miistaData = miista.data.allContentfulProductPage.edges.sort()
    const miistaDataFiltered = []

    let lastProductIndex = 0

    try{
        for(let p = 0; p < miistaData.length; p++){
            for(const filter in filters){
                let match = false

                //This filter is not quite correct, all conditions need to be checked together, not seperately. Need to refactor this
        
                if(filter === 'colors'){
                    try{
                        filters[filter].forEach((color) => {
                            const colorString = JSON.stringify(miistaData[p]).toLowerCase()
        
                            if(colorString.includes(color.toLowerCase())){
                                match = true
                                throw BreakException
                            }
                        })
                    }catch(e){
                        //end loop
                    }
                }
        
                if(filter === 'categories' && !match){   
                    try{
                        filters[filter].forEach((category) => {
                            const colorString = JSON.stringify(miistaData[p]).toLowerCase()
        
                            if(colorString.includes(category.toLowerCase())){
                                match = true
                                throw BreakException
                            }
                        })
                    }catch(e){
                        //end loop
                    }
                }
        
                if(match){
                    miistaDataFiltered.push(miistaData[p])
                }
            }
            match = false

            if(miistaDataFiltered.length >= numberOfProductsPerPage){
                lastProductIndex = p
                throw BreakException
            }
        }
    }catch(e){
        //end loop - I know this is not very elegant
    }

    if(miistaDataFiltered.length > 0){
        miistaDataFiltered[miistaDataFiltered.length-1].lastIndex = lastProductIndex
    }

    const tempProductsToDisplay = miistaDataFiltered.length > 0 ? miistaDataFiltered : miistaData.slice(productIndex, numberOfProductsPerPage + productIndex)

    //organizes data into rows
    for(let k = 0; k < tempProductsToDisplay.length ; k++){
        if(rowIndex < 3 ){
            rowIndex = rowIndex + 1
            rowData.push(tempProductsToDisplay[k])
        }
        if(rowIndex === 3 || k === tempProductsToDisplay.length-1){
            rowIndex = 0
            outputProducts.push(rowData)
            rowData = []
        }
    }
    return outputProducts
}