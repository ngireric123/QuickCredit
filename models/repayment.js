class repayment {
  constructor(id, loanId, createdOn, paidAmount, amount, balance, mothlyInstallment) {
    this.id = id;
    this.loanId = loanId;
    this.createdOn = new Date(createdOn);
    this.paidAmount = paidAmount;
    this.balance = balance;
    this.amount = amount;
    this.mothlyInstallment = mothlyInstallment;
  }
}

export default repayment;
