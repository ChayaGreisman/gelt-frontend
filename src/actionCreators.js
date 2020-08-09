let fetchUsers = (users) => ({type:'FETCH_USERS', payload: {value: users}})
let setUser = (user) => ({type:'SET_USER', payload:{value: user}})
let handleNewAccount = (newAccount) => ({type: 'ADD_ACCOUNT', payload:{value: newAccount}})

export {
    fetchUsers,
    setUser,
    handleNewAccount
}