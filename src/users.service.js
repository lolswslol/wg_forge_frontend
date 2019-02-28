import users from "../data/users";

export class UsersService {
  constructor() {}

  getUserFullName(userId) {
    let a = users.find(obj => {
      return obj.id === userId;
    });
    const prefiks = a.gender === "Male" ? "Mr." : "Mrs.";
    return `${prefiks} ${a.first_name} ${a.last_name}`;
  }
}
