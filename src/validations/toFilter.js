let { accounts, deposits, withdraws, transfers } = require('../database/data');

const toDeleteAccountOfList = (number) => {
  const newList = accounts.filter(account => {
    return account.number !== Number(number);
  });

  return newList;
}

const accountDeposits = (account_number) => {
  const depositsOfAccount = deposits.filter(account => {
    return account.account_number !== Number(account_number);
  });

  return depositsOfAccount;
}

const accountWithdraws = (account_number) => {
  const withdrawsOfAccount = withdraws.filter(withdraw => {
    return withdraw.account_number !== Number(account_number);
  });

  return withdrawsOfAccount;
}

const accountSentTransfers = (account_number) => {
  const sentTransfersOfAccount = transfers.filter(transfer => {
    return transfer.destiny_account_number !== Number(account_number);
  });

  return sentTransfersOfAccount;
}

const accountReceivedTransfers = (account_number) => {
  const receivedTransfersOfAccount = transfers.filter(transfer => {
    return transfer.origin_account_number !== Number(account_number);
  });
  
  return receivedTransfersOfAccount;
}

module.exports = {
  toDeleteAccountOfList,
  accountDeposits,
  accountWithdraws,
  accountSentTransfers,
  accountReceivedTransfers,
}