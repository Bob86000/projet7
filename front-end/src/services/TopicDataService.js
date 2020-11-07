import http from "../http-common";

class TutorialDataService {


  create(formData) {
    console.log(formData);
    return http.post("/topics/create", formData, {
      headers : {
        'Content-Type' : 'multipart/form-data'
      }
  }
    );
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

  getTopTopic() {
    return http.get("/topics/alltop");
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
