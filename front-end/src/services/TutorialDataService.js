import http from "../http-common";

class TutorialDataService {


  create(data) {
    return http.post("/topics/create", data);
  }

  updatelike(id,data){
    return http.put(`/topics/${id}`, data);
  }

  getAll() {
    return http.get("/topics/all");
  }

  getAllPublished(){
    return http.get(`/topics/published`);
  }

  get(id) {
    return http.get(`/topics/${id}`);
  }

  update(id, data) {
    return http.put(`/topics/${id}`, data);
  }

  delete(id) {
    return http.delete(`/topics/${id}`);
  }

  deleteAll() {
    return http.delete(`/topics/`);
  }

  findByTitle(title) {
    return http.get(`/topics/all?title=${title}`);
  }
}

export default new TutorialDataService();
