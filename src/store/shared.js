export default {
    state: {
        loading: false,
        alert: {
            text: '',
            color: '',
            visible: false
        }
    },
    mutations: {
        setAlert (state, payload) {
            state.alert.color = payload.color == undefined ? 'error' : payload.color
            state.alert.text = payload.text == undefined 
                            ? `<strong>Error.</strong> ${payload}` 
                            : payload.text
            state.alert.visible = true
        },
        clearAlert (state) {
            state.alert.visible = false
        }
    },
    actions: {
        setAlert ({commit}, payload) {
            commit('setAlert', payload)
        },
        clearAlert({commit}) {
            commit('clearAlert')
        },
    },
}