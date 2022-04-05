import http from "../http-common"

class TutorialDataService {

    getAll = () => http.get("/tutorials")

    get = (id) => http.get(`/tutorials/${id}`)

    add = (data) => http.post("/tutorials", data)

    update = (id, data) => http.put(`/tutorials/${id}`, data)

    delete = (id) => http.delete(`/tutorials/${id}`)

    deleteAll = () => http.delete(`/tutorials`)

    findByTitle = title => http.get(`/tutorials?title=${title}`)
}

export default new TutorialDataService()