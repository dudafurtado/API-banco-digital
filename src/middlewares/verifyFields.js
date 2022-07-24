const { errorMessage } = require('../messages/error');

const isAllFieldsFull = (req, res, next) => {
    const { 
        name, 
        cpf, 
        birth_date, 
        phone, 
        email, 
        password 
    } = req.body;

    if (!name) return res.status(400).send(errorMessage.nameDoNotExists);
    if (!cpf) return res.status(400).send(errorMessage.cpfDoNotExists);
    if (!birth_date) return res.status(400).send(errorMessage.birthdayDoNotExists);
    if (!phone) return res.status(400).send(errorMessage.phoneDoNotExists);
    if (!email) return res.status(400).send(errorMessage.emailDoNotExists);
    if (!password) return res.status(400).send(errorMessage.passwordDoNotExists);

    next();
}

const isNumberAndDepositFilled = (req, res, next) => {
    const { account_number, value } = req.body;

    if (!account_number) return res.status(400).send(errorMessage.accountNumberDoNotExist);
    if (!value) return res.status(400).send(errorMessage.valueDoNotExists);

    next();
}

const isCompleteToWithdraw = (req, res, next) => {
    const { account_number, value, password } = req.body;

    if (!account_number) return res.status(400).send(errorMessage.accountNumberDoNotExist);
    if (!value) return res.status(400).send(errorMessage.valueDoNotExists);
    if (!password) return res.status(400).send(errorMessage.passwordDoNotExists);

    next();
}

const isAccountNumberAndPasswordFilled = (req, res, next) => {
    const { account_number, password } = req.query;

    if (!account_number) return res.status(400).send(errorMessage.accountNumberDoNotExist);
    if (!password) return res.status(400).send(errorMessage.passwordDoNotExists);

    next();
}

const isCompleteToTranfer = (req, res, next) => {
    const { origin_account_number, destiny_account_number, value, password } = req.body;

    if (!origin_account_number) return res.status(400).send(errorMessage.withoutAccountNumberOrigin);
    if (!destiny_account_number) return res.status(400).send(errorMessage.withoutAccountNumberDestiny);
    if (!value) return res.status(400).send(errorMessage.valueDoNotExists);
    if (!password) return res.status(400).send(errorMessage.passwordDoNotExists);

    next();
}

module.exports = { 
    isAllFieldsFull,
    isNumberAndDepositFilled,
    isCompleteToWithdraw,
    isAccountNumberAndPasswordFilled,
    isCompleteToTranfer,
}