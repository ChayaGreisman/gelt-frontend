const initialState = {
    users: [],
    currentUser: null,
 }
  
 const reducer = (prevState=initialState, action) => {
    switch(action.type) {
        case 'SET_USER':
            return {...prevState, currentUser: action.payload.value};
        case 'FETCH_USERS':
            return {...prevState, users: action.payload.value};
        case 'ADD_ACCOUNT':
            return {...prevState, currentUser:{...prevState.currentUser, accounts:[...prevState.currentUser.accounts, action.payload.value]}}    
        case 'ADD_CATEGORY':
            return {...prevState, currentUser:{...prevState.currentUser, categories:[...prevState.currentUser.categories, action.payload.value]}}    
        case 'DELETE_CATEGORY':
            let categoryId = action.payload.value
            let categoriesArray = [...prevState.currentUser.categories.filter(category => category.id !== categoryId)]    
            return {...prevState, currentUser:{...prevState.currentUser, categories: categoriesArray}}



        default:
            return prevState
    }
 }
  
 export default reducer