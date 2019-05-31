import moment from 'moment';
import { config } from 'dotenv';
import hashPassword from '../helpers/hashPassword';
import userData from './data/userData';

const dateTime = moment().format('YYYY-MM-DD h:m:s');


config();

const { registeredUsers } = userData;


class User {
  /**
   * class constructor
   *
   */
  constructor() {
    this.users = registeredUsers;
    this.numberOfUsers = registeredUsers.length;
  }

  /**
   * @param {object} queryData
   * @param {object} data
   * @returns {object} user object
   */
  create(queryData, data) {
    const newUser = {
      id: this.numberOfUsers + 1,
      email: data.email || '',
      firstname: data.firstname || '',
      lastname: data.lastname || '',
      password: hashPassword(data.password, 10) || '',
      address: {
        boxNumber: data.boxNumber || '',
        town: data.town || '',
        postalCode: data.postalCode || '',

      },
      createdDate: dateTime,
      modifiedDate: null,
      isAdmin: queryData.admin || false,
    };
    this.users.push(newUser);
    return newUser;
  }


  /**
   *
   * @param {string} email
   * @returns {object} user object
   */
  findOne(email) {
    return this.users.find(user => user.email === email);
  }

  /**
   * @returns {object} returns all users
   */
  findAll() {
    return this.users;
  }

  /**
   *
   * @param {string} email
   * @param {object} data
   */
  update(email, data) {
    const user = this.findOne(email);
    const index = this.users.indexOf(user);
    this.users[index].firstname = user.firstname;
    this.users[index].lastname = user.lastname;
    this.users[index].email = user.email;
    this.users[index].password = hashPassword(data.password, 10);
    this.users[index].isAdmin = user.isAdmin;
    this.users[index].address = {
      boxNumber: user.address.address,
      town: user.address.town,
      postalCode: user.address.postalCode,
    };
    this.users[index].modifiedDate = dateTime;
    return this.users[index];
  }
}


export default new User();
