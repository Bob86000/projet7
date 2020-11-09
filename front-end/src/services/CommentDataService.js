import http from "../http-common";

class CommentDataService {


  create(formData) {
    console.log("le bonnn fichier");
    return http.post("/comments/create", formData, {
      headers : {
        'Content-Type' : 'multipart/form-data'
      }
  }
    );
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

  delete(id, data) {
    return http.delete(`/comments/${id}`, data);
  }

  deleteAll() {
    return http.delete(`/comments/`);
  }

  findByTitle(title) {
    return http.get(`/comments/all?title=${title}`);
  }
}

export default new CommentDataService();
