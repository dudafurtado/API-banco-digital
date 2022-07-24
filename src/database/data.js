module.exports = {
    bank: {
        name: 'Cubos Bank',
        number: '123',
        agency: '0001',
        password: 'Cubos123Bank'
    },
    accounts: [
        {
            number: 1,
            balance: 10000,
            user: {
                name: "Foo Bar",
                cpf: 00011122233,
                birth_date: "2021-03-15",
                phone: 71999998888,
                email: "foo@bar.com",
                password: "1234"
            }
        },
        {
            number: 2,
            balance: 700,
            user: {
                name: "Foo Bar 2",
                cpf: 00011122233,
                birth_date: "2021-03-15",
                phone: 71999998888,
                email: "foo2@bar.com",
                password: "12345"
            }
        },
    ],
    withdraws: [],
    deposits: [],
    transfers: []
}