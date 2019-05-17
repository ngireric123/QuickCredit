const newUser = {
  firstName: 'mukamisha',
  lastName: 'alice',
  email: 'mukamisha@gmail.com',
  password: '12345678',
};

const UserRegistered = {
  firstName: 'mukamisha',
  lastName: 'alice',
  email: 'mukamisha@gmail.com',
  password: '$2a$10$jEbas2DUi/uP2gZ7j3QXn.o.3Txwawd./DVkgoOmJ27W.rl13EwWm',
};

const auth = {
  email: 'test@gmail.com',
  password: '12345678',
};

const falseNewUser = {
  firstName: 'mukamisha',
  lastName: 'alice',
  email: 'mukamishagmail.com',
  password: '12345678',
};

const falseNewUser2 = {
  firstName: 'mukamisha',
  lastName: 'alice',
  email: '',
  password: '12345678',
};

const newUserLogIn = {
  email: 'test@gmail.com',
  password: '12345678',
};

const falseUserLogIn = {
  email: '',
  password: newUser.password,
};

const falseEmailLogIn = {
  email: 'test@gmail.com',
  password: newUser.password,
};

const falsePasswdLogIn = {
  email: newUser.email,
  password: '123',
};

const newLoan = {
  id: 1,
  firstName: 'oeee',
  lastName: 'hjscr',
  email: 'erfn@gmail.com',
  status: 'pending',
  tenor: 12,
  amount: 5000,
  repaid: false,
  createdOn: 'April 30, 2019 9:00 AM',
  paymentInstallment: '437.500',
  balance: 4600,
  totalAmount: 5437.500,
};
const newRepayment = {
  paidAmount: 400,
};

export {
  newUser, newUserLogIn, falseEmailLogIn,
  falsePasswdLogIn, falseNewUser,
  falseNewUser2, falseUserLogIn, newLoan, UserRegistered, newRepayment,
};
