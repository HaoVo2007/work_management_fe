import api from './index'

export const BoardAPI = {
  async getMyBoards() {
    const res = await api.get('/boards/user')
    return res.data || []
  },

  async createBoard(payload) {
    const res = await api.post('/boards', payload)
    return res.data
  },
}
