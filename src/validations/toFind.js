let { accounts } = require('../database/data');

const toFindCpf = (cpf) => {
  const account = accounts.find(eachAccount => {
    return eachAccount.user.cpf === Number(cpf);
  });

  return account;
}

const toFindEmail = (email) => {
  const account = accounts.find(eachAccount => {
    return eachAccount.user.email === email;
  });

  return account;
}

const accountByNumber = (number) => {
  const account = accounts.find(eachAccount => {
    return eachAccount.number === Number(number);
  });

  return account;
}

const accountByAccountNumber = (account_number) => {
  const account = accounts.find(eachAccount => {
    return eachAccount.number === Number(account_number);
  });

  return account;
}

const accountOrigin = (origin_account_number) => {
  const account = accounts.find(eachAccount => {
    return eachAccount.number === Number(origin_account_number);
  });

  return account;
}

const accountDestiny = (destiny_account_number) => {
  const account = accounts.find(eachAccount => {
    return eachAccount.number === Number(destiny_account_number);
  });

  return account;
}

module.exports = {
  toFindCpf,
  toFindEmail,
  accountByNumber,
  accountByAccountNumber,
  accountOrigin,
  accountDestiny,
}