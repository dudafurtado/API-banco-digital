const { bank } = require('../database/data');

const { accountByAccountNumber, accountOrigin } = require('../validations/toFind');

const { errorMessage } = require('../messages/error');

const isBankPasswordRight = (req, res, next) => {
  const { bank_password } = req.query;

  if (!bank_password) return res.status(400).send(errorMessage.bankPasswordDoNotExists);
  if (bank_password !== bank.password) return res.status(403).send(errorMessage.wrongPassword);

  next();
}

const isAccountPasswordRight = (req, res, next) => {
  const { account_number, password } = req.body;

  const account = accountByAccountNumber(account_number);
  if (account.user.password !== password) return res.status(403).send(errorMessage.accountPasswordWrong);

  next();
}

const isAccountPasswordRightByQuery = (req, res, next) => {
  const { account_number, password } = req.query;

  const account = accountByAccountNumber(account_number);
  if (account.user.password !== password) return res.status(403).send(errorMessage.accountPasswordWrong);

  next();
}

const isPasswordToOriginAccountRight = (req, res, next) => {
  const { origin_account_number, password } = req.body;

  const account = accountOrigin(origin_account_number);
  if (account.user.password !== password) return res.status(403).send(errorMessage.accountPasswordWrong);

  next();
}

module.exports = {
  isBankPasswordRight,
  isAccountPasswordRight,
  isAccountPasswordRightByQuery,
  isPasswordToOriginAccountRight,
}