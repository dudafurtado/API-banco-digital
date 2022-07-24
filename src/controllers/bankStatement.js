const { format } = require('date-fns');

const { 
  accountByAccountNumber,
  accountOrigin,
  accountDestiny 
} = require('../validations/toFind');
const { 
  accountDeposits,
  accountWithdraws,
  accountSentTransfers,
  accountReceivedTransfers
} = require('../validations/toFilter');

const { errorMessage } = require('../messages/error');
const { successMessage } = require('../messages/success');

let { deposits, withdraws, transfers } = require('../database/data');

const depositOnAccount = (req, res) => {
  const { account_number, value } = req.body;

  if(value === 0) return res.status(400).send(errorMessage.negativeValue);

  const accountToDeposit = accountByAccountNumber(account_number);
  accountToDeposit.balance += value;

  const toDeposit = {
    date: format(new Date(), 'yyyy-MM-dd hh:mm:ss'),
    account_number,
    value
  }
  deposits.push(toDeposit);

  res.status(201).send(successMessage.depositMade);
}

const withdrawOnAccount = (req, res) => {
  const { account_number, value, password } = req.body;

  if(value === 0) return res.status(400).send(errorMessage.negativeValue);

  const accountToWithdraw = accountByAccountNumber(account_number);
  if (accountToWithdraw.balance < value) return res.status(403).send(errorMessage.withdrawNotPossible);

  const newBalance = accountToWithdraw.balance - value;
  accountToWithdraw.balance = newBalance;

  const toWithdraw = {
    date: format(new Date(), 'yyyy-MM-dd hh:mm:ss'),
    account_number,
    value
  }
  withdraws.push(toWithdraw);

  res.status(201).send(successMessage.withdrawMade);
}

const transferToAccount = (req, res) => {
  const { origin_account_number, destiny_account_number, value } = req.body;

  const accountToSendTransfer = accountOrigin(origin_account_number);
  if (accountToSendTransfer.balance < value) return res.status(403).send(errorMessage.transferNotPossible);
  accountToSendTransfer.balance -= value;

  const accountToReceiveTransfer = accountDestiny(destiny_account_number);
  accountToReceiveTransfer.balance += value

  const toTransfer = {
    date: format(new Date(), 'yyyy-MM-dd hh:mm:ss'),
    origin_account_number, 
    destiny_account_number, 
    value
  }
  transfers.push(toTransfer);

  res.status(201).send(successMessage.transferMade);
}

const balanceOfAccount = (req, res) => {
  const { account_number } = req.query;

  const account = accountByAccountNumber(account_number);

  return res.status(200).send({
    balance: account.balance
  });
}

const bankStatement = (req, res) => {
  const { account_number } = req.query;

  const depositsOfAccount = accountDeposits(account_number);
  const withdrawsOfAccount = accountWithdraws(account_number);
  const sentTransfersOfAccount = accountSentTransfers(account_number);
  const receivedTransfersOfAccount = accountReceivedTransfers(account_number);

  return res.status(200).send({
    deposits: depositsOfAccount,
    withdraw: withdrawsOfAccount,
    sentTransfers: sentTransfersOfAccount,
    receivedTransfers: receivedTransfersOfAccount
  });
}


module.exports = {
  depositOnAccount,
  withdrawOnAccount,
  transferToAccount,
  balanceOfAccount,
  bankStatement
}