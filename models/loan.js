class loans {
  constructor(
    id, firstName, lastName, email, status, tenor, amount,
    repaid, createdOn, paymentInstallment, balance, totalAmount,
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.status = status;
    this.tenor = tenor;
    this.amount = amount;
    this.repaid = repaid;
    this.createdOn = new Date(createdOn);
    this.paymentInstallment = paymentInstallment;
    this.balance = balance;
    this.totalAmount = totalAmount;
  }
}

export default loans;
