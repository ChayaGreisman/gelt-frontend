let fetchUsers = (users) => ({type:'FETCH_USERS', payload: {value: users}})
let setUser = (user) => ({type:'SET_USER', payload:{value: user}})
let handleNewAccount = (newAccount) => ({type: 'ADD_ACCOUNT', payload:{value: newAccount}})
let handleNewCategory = (newCategory) => ({type: 'ADD_CATEGORY', payload:{value: newCategory}})
let handleDeleteCategory = (categoryId) => ({type: 'DELETE_CATEGORY', payload:{value: categoryId}})
let handleEditedCategory = (editedCategory) => ({type: 'EDIT_CATEGORY', payload:{value: editedCategory}})
let handleNewTransaction = (newTransaction) => ({type: 'ADD_TRANSACTION', payload:{value: newTransaction}})

export {
    fetchUsers,
    setUser,
    handleNewAccount,
    handleNewCategory,
    handleDeleteCategory,
    handleEditedCategory,
    handleNewTransaction
}