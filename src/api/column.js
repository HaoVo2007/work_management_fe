import api from './index'

export const ColumnAPI = {
    async getColumns(boardId) {
        const res = await api.get(`boards/${boardId}`)
        return res.data
    },

    async createColumn(payload) {
        const res = await api.post(`columns`, payload)
        return res.data
    },
}