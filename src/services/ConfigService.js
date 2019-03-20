import axios from 'axios';

class ConfigService {

    static create(data, onSuccess, onError) {
        axios.post('/api/config/create',
            data
        )
        .then(onSuccess)
        .catch(onError)
    }

    static getAll(onSuccess, onError) {
        axios.get('/api/config/getall'
        )
        .then(onSuccess)
        .catch(onError)
    }

    static getById(id, onSuccess, onError) {
        axios.get(`/api/config/${id}`
        )
        .then(onSuccess)
        .catch(onError)
    }

    static getByKey(key, onSuccess, onError) {
        axios.get(`/api/config/getbykey?key=${key}`
        )
        .then(onSuccess)
        .catch(onError)
    }

    static update(id, data, onSuccess, onError) {
        axios.put('/api/config/' + id,
            data
        )
        .then(onSuccess)
        .catch(onError)
    }

    static delete(id, onSuccess, onError) {
        axios.delete('/api/config/' + id
        )
        .then(onSuccess)
        .catch(onError)
    }
}

export default ConfigService;