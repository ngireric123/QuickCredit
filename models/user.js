class user {
  constructor(id, firstname, lastname, email, password, address, status) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
    this.status = 'unverified';
  }
}

export default user;
