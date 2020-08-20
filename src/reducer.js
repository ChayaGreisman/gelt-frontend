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
        case 'EDIT_CATEGORY':
            let editedCategory = action.payload.value
            let newCategoriesArray = [...prevState.currentUser.categories.map(category => {
                if (category.id === editedCategory.id){
                    return editedCategory
                }
                return category
            })] 
            
            return {...prevState, currentUser:{...prevState.currentUser, categories: newCategoriesArray}}

        case 'ADD_TRANSACTION':
            let newTransaction = action.payload.value
            
            let categoriesArrayNew = [...prevState.currentUser.categories.map(category => {
                if (category.id === newTransaction.category_id){
                    return {...category, transactions: [...category.transactions, newTransaction]}    
                }
                return category
            })] 

            let accountsArrayNew = [...prevState.currentUser.accounts.map(account => {
                if (account.id === newTransaction.account_id){
                    return {...account, transactions: [...account.transactions, newTransaction]}    
                }
                return account
            })] 

            return {...prevState, currentUser:{...prevState.currentUser, categories: categoriesArrayNew, accounts: accountsArrayNew}}
        
        case 'ADD_SAVED_CARD':
            return {...prevState, currentUser:{...prevState.currentUser, cards:[...prevState.currentUser.cards, action.payload.value]}} 
        case 'DELETE_SAVED_CARD':
            let cardId = action.payload.value
            let cardsArray = [...prevState.currentUser.cards.filter(card => card.id !== cardId)]    
            return {...prevState, currentUser:{...prevState.currentUser, cards: cardsArray}}
        case 'ADD_NOTE':
            return {...prevState, currentUser:{...prevState.currentUser, notes:[...prevState.currentUser.notes, action.payload.value]}} 
        case 'DELETE_NOTE':
            let noteId = action.payload.value
            let notesArray = [...prevState.currentUser.notes.filter(note => note.id !== noteId)]    
            return {...prevState, currentUser:{...prevState.currentUser, notes: notesArray}}
        
        default:
            return prevState
    }
 }
  
 export default reducer