const { accountByNumber } = require('../validations/toFind');

const { successMessage } = require('../messages/success');

const updateUser = (req, res) => {
    const { number } = req.params;
    const { 
      name, 
      cpf, 
      birth_date, 
      phone, 
      email, 
      password 
    } = req.body;

    const accountToUpdate = accountByNumber(number);

    accountToUpdate.user = {
        name,
        cpf,
        birth_date,
        phone,
        email,
        password
    }

    res.status(200).send(successMessage.userUpdated);
}

module.exports = { 
    updateUser
}