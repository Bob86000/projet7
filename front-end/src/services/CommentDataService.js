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

  updatefile(id, data) {
    return http.put(`/comments/file/${id}`, data, {
      headers : {
        'Content-Type' : 'multipart/form-data'
      }
  });
}
update(id, data) {
  return http.put(`/comments/${id}`, data);
}

  delete(commentId, auth) {
    return http.delete(`/comments/${commentId}`, {
      params : {
        commentId : commentId,
        userId : auth

      }
  })}

  deleteAll() {
    return http.delete(`/comments/`);
  }

  findByTitle(title) {
    return http.get(`/comments/all?title=${title}`);
  }
}

export default new CommentDataService();
