const { errorMessage } = require('../messages/error');

const {
  toFindCpf,
  toFindEmail,
  accountByNumber,
  accountByAccountNumber,
  accountOrigin,
  accountDestiny
} = require('../validations/toFind')

const isCPFAndEmailUnique = (req, res, next) => {
  const { cpf, email } = req.body;

  const cpfExists = toFindCpf(cpf);
  if (cpfExists) return res.status(404).send(errorMessage.cpfAlreadyExists);

  const emailExists = toFindEmail(email);
  if (emailExists) return res.status(404).send(errorMessage.emailAlreadyExists);

  next();
}

const isAccountNumberWrong = (req, res, next) => {
  const { number } = req.params;

  const accountAlreadyExists = accountByNumber(number);
  if (!accountAlreadyExists) return res.status(404).send(errorMessage.accountNumberIsWrong);

  next();
}

const isAccountNumberInTheList = (req, res, next) => {
  const { account_number } = req.body;

  const accountNumberExists = accountByAccountNumber(account_number);
  if (!accountNumberExists) return res.status(404).send(errorMessage.accountNumberIsWrong);

  next();
}

const isOriginAndDestinySpecify = (req, res, next) => {
  const { origin_account_number, destiny_account_number } = req.body;

  const accountOriginExists = accountOrigin(origin_account_number);
  if (!accountOriginExists) return res.status(404).send(errorMessage.accountNumberIsWrong);

  const accountDestinyExists = accountDestiny(destiny_account_number);
  if (!accountDestinyExists) return res.status(404).send(errorMessage.accountNumberIsWrong);

  next();
}

const isAccountOnDatabaseByQuery = (req, res, next) => {
  const { account_number } = req.query;

  const accountExists = accountByAccountNumber(account_number);
  if (!accountExists) return res.status(404).send(errorMessage.accountNumberIsWrong);

  next();
}

module.exports = {
  isCPFAndEmailUnique,
  isAccountNumberWrong,
  isAccountNumberInTheList,
  isOriginAndDestinySpecify,
  isAccountOnDatabaseByQuery,
}