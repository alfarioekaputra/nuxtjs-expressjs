export const state = () => ({
    notes: [],
    errors: [],
    loadingTable: true,
    headerTable: [
        { text: 'Title', value: 'title' },
        { text: 'Body', value: 'body' },
        { text: 'Created At', value: 'created_at' },
        { text: 'Actions', value: 'actions', sortable: false }
    ],
})

export const mutations = {
    SET_NOTES_DATA(state, payload) {
        state.notes = payload
        state.loadingTable = false
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