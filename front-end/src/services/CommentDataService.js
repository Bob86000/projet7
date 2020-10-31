import http from "../http-common";

class CommentDataService {


  create(data) {
    return http.post("/comments/create", data);
  }

  updatelike(id,data){
    return http.put(`/comments/${id}`, data);
  }

  getTopComment() {
    return http.get("/comments/all4");
  }

  getCountAndFindComment(id) {
    return http.get(`/comments/count/${id}`);
  }

  getAllPublished(){
    return http.get(`/comments/published`);
  }

  get(id) {
    return http.get(`/comments/${id}`);
  }

  update(id, data) {
    return http.put(`/comments/${id}`, data);
  }

  delete(id) {
    return http.delete(`/comments/${id}`);
  }

  deleteAll() {
    return http.delete(`/comments/`);
  }

  findByTitle(title) {
    return http.get(`/comments/all?title=${title}`);
  }
}

export default new CommentDataService();
