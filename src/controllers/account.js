const { toDeleteAccountOfList } = require('../validations/toFilter');
const { successMessage } = require('../messages/success');

let { accounts } = require('../database/data');

const listAccounts = (req, res) => {
  res.status(200).send(accounts);
}

const createAccount = (req, res) => {
  const { name, cpf, birth_date, phone, email, password } = req.body;
  
  const newAccount = {
    number: accounts.length + 1,
    balance: 0,
    user: {
      name,
      cpf,
      birth_date,
      phone,
      email,
      password
    }
  }

  accounts.push(newAccount);

  res.status(201).send(successMessage.accountCreated);
}

const deleteAccount = (req, res) => {
  const { number } = req.params;

  const newList = toDeleteAccountOfList(number);
  accounts = newList;

  res.status(200).send(successMessage.accountDeleted);
}

module.exports = {
  createAccount,
  listAccounts,
  deleteAccount
}