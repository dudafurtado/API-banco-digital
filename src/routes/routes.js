const express = require('express');
const routes = express();

const account = require('../controllers/account');
const user = require('../controllers/user');
const bankStatement = require('../controllers/bankStatement');

const {
  isBankPasswordRight,
  isAccountPasswordRight,
  isAccountPasswordRightByQuery,
  isPasswordToOriginAccountRight,
} = require('../middlewares/verifyPassword');
const { 
  isAllFieldsFull, 
  isNumberAndDepositFilled,
  isCompleteToWithdraw,
  isAccountNumberAndPasswordFilled,
  isCompleteToTranfer,
} = require('../middlewares/verifyFields');
const { 
  isCPFAndEmailUnique, 
  isAccountNumberWrong,
  isAccountNumberInTheList,
  isAccountOnDatabaseByQuery,
  isOriginAndDestinySpecify
} = require('../middlewares/verifyUniqueData');

routes.get('/accounts', isBankPasswordRight, account.listAccounts);
routes.post('/account', isAllFieldsFull, isCPFAndEmailUnique, account.createAccount);
routes.delete('/account/:number', isAccountNumberWrong, account.deleteAccount);

routes.put('/account/user/:number', isAllFieldsFull, isCPFAndEmailUnique, isAccountNumberWrong, user.updateUser);

routes.post('/transactions/deposit', isNumberAndDepositFilled, isAccountNumberInTheList, bankStatement.depositOnAccount);
routes.post('/transactions/withdraw', isCompleteToWithdraw, isAccountNumberInTheList, isAccountPasswordRight, bankStatement.withdrawOnAccount);
routes.post('/transactions/transfer', isCompleteToTranfer, isOriginAndDestinySpecify, isPasswordToOriginAccountRight, bankStatement.transferToAccount);

routes.get('/accounts/balance', isAccountNumberAndPasswordFilled, isAccountOnDatabaseByQuery, isAccountPasswordRightByQuery, bankStatement.balanceOfAccount);
routes.get('/accounts/bank_statement', isAccountNumberAndPasswordFilled, isAccountOnDatabaseByQuery, isAccountPasswordRightByQuery, bankStatement.bankStatement);

module.exports = routes