const tokenStore = {
    state: function() {
        return {
            token: localStorage.getItem('token'),
            userId: localStorage.getItem('userId')
        }

    },
    mutations: {
        connect(state,{connectionToken,userId})
        {
            state.token = connectionToken
            state.userId = userId
            localStorage.setItem('token', connectionToken)
            localStorage.setItem('userId', userId)
        },
        disconnect(state)
        {
            state.token = null
            state.userId = null
            localStorage.removeItem('token')
            localStorage.removeItem('userId')
        }
    },
    getters: {
        isConnected(state) {
            return state.token !== null
        }
    }
}

export default tokenStore
