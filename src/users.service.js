import users from "../data/users";
import companies from "../data/companies";
import orders from "../data/orders";

export class UsersService {
  constructor() {}

  getUserFullName(userId) {
    let a = users.find(obj => {
      return obj.id === userId;
    });
    const prefiks = a.gender === "Male" ? "Mr." : "Mrs.";
    return `${prefiks} ${a.first_name} ${a.last_name}`;
  }

  getUserInfo(orderId) {
    let order = orders.find(obj => {
      return obj.id === orderId;
    });

    let user = users.find(obj => {
      return obj.id === order.user_id;
    });

    let companieInfo = companies.find(obj => {
      return obj.id === user.company_id;
    });

    const output = {
      birthday: user.birthday,
      avatar: user.avatar,
      company: (companieInfo && companieInfo.title) || null,
      companie_url: (companieInfo && companieInfo.url) || null,
      industry: (companieInfo && companieInfo.industry) || null
    };

    return output;
  }
}
