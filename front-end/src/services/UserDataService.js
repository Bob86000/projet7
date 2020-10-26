import http from "../http-common";

class UserDataService {
  create(user) {
    console.log(user.email+''+'uUser')
    return http.post("users/signup", user);
  }

  connect(user) {
    console.log(user.email+'testmethode')
    return http.post("users/login", user);
  }
}

export default new UserDataService();
