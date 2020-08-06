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
            
        default:
            return prevState
    }
 }
  
 //make sure to export the reducer
 export default reducer