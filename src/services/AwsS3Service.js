import axios from 'axios';

class AwsS3Service {
    static selectByKey(key, onSuccess, onError) {
        axios
            .get(`/api/fileupload/select?key=${key}`, { withCredentials: true})
            .then(onSuccess)
            .catch(onError)
    }
}

export default AwsS3Service;