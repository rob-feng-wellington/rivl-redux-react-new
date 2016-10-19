import { v4 } from 'node-uuid';

const fakeDatabase = {
    players: [{
        id: v4(),
        first_name: 'Rob',
        last_name: 'Feng',
        gender: 'M',
        score: 1569
    },
    {
        id: v4(),
        first_name: 'Tedd',
        last_name: 'Spears',
        gender: 'M',
        score: 1499
    },
    {
        id: v4(),
        first_name: 'Liam',
        last_name: 'Townson',
        gender: 'M',
        score: 1676
    },
    {
        id: v4(),
        first_name: 'Jo',
        last_name: 'Alland',
        gender: 'F',
        score: 1605
    },
    {
        id: v4(),
        first_name: 'Emily',
        last_name: 'Feng',
        gender: 'F',
        score: 1448
    }]
};

const delay = (ms) =>
    new Promise(resolve => setTimeout(resolve, ms));

export const fetchPlayers = (filter) =>
    delay(500).then(() => {
        switch(filter){
            case 'all':
                return fakeDatabase.players;
            case 'male':
                return fakeDatabase.players.filter(p => p.gender === 'M');
            case 'female':
                return fakeDatabase.players.filter(p => p.gender === 'F');
            default:
                throw new Error('Unknown filter: ${filter}');
        }
    });

