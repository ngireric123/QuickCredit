import bcrypt from 'bcryptjs';

const users = [
  {
    id: 1,
    firstName: 'eric',
    lastName: 'NGIRABABYEYI',
    status: 'verified',
    email: 'ngireric123@gmail.com',
    password: bcrypt.hashSync('12345678', 10),
    isAdmin: 'true',
  },
  {
    id: 2,
    firstName: 'kagina',
    lastName: 'alfred',
    status: 'unverified',
    email: 'kagina@gmail.com',
    password: bcrypt.hashSync('12345678', 10),
    isAdmin: 'true',
  },
  {
    id: 3,
    firstName: 'ndayishimiye',
    lastName: 'claude',
    status: 'verified',
    email: 'claude@gmail.com',
    password: bcrypt.hashSync('12345678', 10),
    isAdmin: false,
  },
];
const loanRepayment = [
  {
    id: '1',
    loanId: '1',
    createdOn: new Date().toGMTString(),
    amount: 5000,
    mothlyInstallment: 437.500,
    paidAmount: 400,
    balance: 4600,
  },
  {
    id: '2',
    loanId: '3',
    createdOn: new Date().toGMTString(),
    amount: 5000,
    mothlyInstallment: 437.500,
    paidAmount: 500,
    balance: 4500,
  },

];

const loanDummy = [
  {
    id: 1,
    firstName: 'oeee',
    lastName: 'hjscr',
    email: 'erfn@gmail.com',
    status: 'pending',
    tenor: 12,
    amount: 5000,
    repaid: 'false',
    createdOn: 'April 30, 2019 9:00 AM',
    paymentInstallment: '437.500',
    balance: 4600,
    totalAmount: 5437.500,
  },
  {
    id: 2,
    firstName: 'mukamana',
    lastName: 'esther',
    email: 'mukamana@gmail.com',
    status: 'pending',
    tenor: 12,
    amount: 5000,
    repaid: 'false',
    createdOn: 'April 30, 2019 9:00 AM',
    paymentInstallment: '437.500',
    balance: 4500,
    totalAmount: 5437.500,
  },
  {
    id: 3,
    firstName: 'kamanzi',
    lastName: 'eric',
    email: 'kamanzi@gmail.com',
    status: 'approved',
    tenor: 12,
    amount: 5000,
    repaid: 'false',
    createdOn: 'April 30, 2019 9:00 AM',
    paymentInstallment: '437.500',
    balance: 5000,
    totalAmount: 5437.500,
  },
];
export default
{
  users,
  loanRepayment,
  loanDummy,
};
