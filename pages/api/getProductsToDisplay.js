import miista from './miista-export.json'

export default function getProductsToDisplay(filters, productIndex, numberOfProductsPerPage) {

    let rowIndex = 0
    let rowData = []
    let outputProducts = []

    const miistaData = miista.data.allContentfulProductPage.edges.sort()

    const miistaFiltered = miista.data.allContentfulProductPage.edges.filter(product => {
        for(let i = 0; i < filters.length ;i++){
            
        }
    })



    const tempProductsToDisplay = miistaData.slice(productIndex, numberOfProductsPerPage + productIndex)

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