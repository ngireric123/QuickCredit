class user {
  constructor(id, firstname, lastname, email, password, status, isAdmin) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
    this.status = 'unverified';
    this.isAdmin = isAdmin;
  }
}

export default user;
