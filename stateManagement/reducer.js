export const initialState = { 
    filters: { 
        colors: [], 
        priceRanges: [], 
        categories: [] 
    }
}


function reducer(state, action) {
    switch (action.type) {
        case 'ADD_COLOR_FILTER':
            const newFilters = state.filters
            const foundColor = newFilters.colors.find(color => color === action.colorToAdd)
            
            if(!foundColor){
                newFilters.colors.push(action.colorToAdd)
            }
            
            return { ...state, filters: newFilters }
        case 'REMOVE_COLOR_FILTER': 
            const newFilterss = state.filters

            const foundColorToRemove = newFilterss.colors.find(color => color === action.colorToRemove)

            if(foundColorToRemove){
                const colorFilterIndexx = state.filters.colors.findIndex(
                    (color) => color === action.colorToRemove
                )
                newFilterss.colors.splice(colorFilterIndexx, 1)
            }
            return { ...state, filters: newFilterss }

        case 'ADD_CATEGORY_FILTER':
            const newFilterssss = state.filters
            const foundCategoryToAdd = newFilterssss.categories.find(category => category === action.categoryToAdd)
            
            if(!foundCategoryToAdd){
                newFilterssss.categories.push(action.categoryToAdd)
            }
            
            return { ...state, filters: newFilterssss }
        case 'REMOVE_CATEGORY_FILTER': 
            const newFiltersss = state.filters

            const foundCategoryToRemove = newFiltersss.categories.find(color => color === action.categoryToRemove)

            if(foundCategoryToRemove){
                const colorFilterIndexx = state.filters.categories.findIndex(
                    (category) => category === action.categoryToRemove
                )
                newFiltersss.categories.splice(colorFilterIndexx, 1)
            }
            return { ...state, filters: newFiltersss }
        default:
            return state
    }
}

export default reducer