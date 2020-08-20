let fetchUsers = (users) => ({type:'FETCH_USERS', payload: {value: users}})
let setUser = (user) => ({type:'SET_USER', payload:{value: user}})
let handleNewAccount = (newAccount) => ({type: 'ADD_ACCOUNT', payload:{value: newAccount}})
let handleNewCategory = (newCategory) => ({type: 'ADD_CATEGORY', payload:{value: newCategory}})
let handleDeleteCategory = (categoryId) => ({type: 'DELETE_CATEGORY', payload:{value: categoryId}})
let handleEditedCategory = (editedCategory) => ({type: 'EDIT_CATEGORY', payload:{value: editedCategory}})
let handleNewTransaction = (newTransaction) => ({type: 'ADD_TRANSACTION', payload:{value: newTransaction}})
let handleNewSavedCard = (newSavedCard) => ({type: 'ADD_SAVED_CARD', payload:{value: newSavedCard}})
let handleDeleteSavedCard = (cardId) => ({type: 'DELETE_SAVED_CARD', payload:{value: cardId}})
let handleNewNote = (newNote) => ({type: 'ADD_NOTE', payload:{value: newNote}})
let handleDeleteNote = (noteId) => ({type: 'DELETE_NOTE', payload:{value: noteId}})

export {
    fetchUsers,
    setUser,
    handleNewAccount,
    handleNewCategory,
    handleDeleteCategory,
    handleEditedCategory,
    handleNewTransaction,
    handleNewSavedCard,
    handleDeleteSavedCard,
    handleNewNote,
    handleDeleteNote
}