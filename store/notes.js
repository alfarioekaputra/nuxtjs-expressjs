export const state = () => ({
    notes: [],
    errors: []
})

export const mutations = {
    SET_NOTES_DATA(state, payload) {
        state.notes = payload
    },
    SET_ERRORS(state, payload) {
        state.errors = payload
    }
}

export const actions = {
    //untuk mengambil data notes
    getAllNotes({ commit }) {
        return new Promise((resolve, reject) => {
            this.$axios.get('/api/notes').then((response) => {
                commit('SET_NOTES_DATA', response.data.notes)
                resolve()
            })
        })
    }
}