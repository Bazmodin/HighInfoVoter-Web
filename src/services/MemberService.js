import axios from 'axios';

class MemberService {

    static create(data, onSuccess, onError) {
        axios.post('/api/member/create', data)
            .then(onSuccess)
            .catch(onError)
    }

    static getAll(onSuccess, onError) {
        axios.get('/api/member/getall')
            .then(onSuccess)
            .catch(onError)
    }

    static getById(id, onSuccess, onError) {
        axios.get(`/api/member/${id}`)
            .then(onSuccess)
            .catch(onError)
    }

    static update(id, data, onSuccess, onError) {
        axios.put('/api/member/' + id, data)
            .then(onSuccess)
            .catch(onError)
    }

    static delete(id, onSuccess, onError) {
        axios.delete('/api/member/' + id)
            .then(onSuccess)
            .catch(onError)
    }
}

export default MemberService;