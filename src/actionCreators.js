let fetchUsers = (users) => ({type:'FETCH_USERS', payload: {value: users}})
let setUser = (user) => ({type:'SET_USER', payload:{value: user}})


export {
    fetchUsers,
    setUser
}