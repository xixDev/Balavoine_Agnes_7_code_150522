const users = [
    {
        userId: 1,
        email: 'info@st-xix.com',
        password: 'mdp',
        pseudo: 'Moderateur',
        picture: './images/colors/bordeaux.png',
        admin: 1,

        // types: ['Plante', 'Poison'],
        created: new Date(),
    },
    {
        userId: 2,
        email: 'dagobert@test.com',
        password: 'mdp',
        pseudo: 'Dagobert Testeur',
        picture: './images/colors/kaki.png',
        admin: 0,
        created: new Date(),
    },
];

module.exports = users;
