const express = require('express');


const users = {
  1: {
      id: 1,
      name: 'Bryan',
      email: 'bkahler3@gmail.com',
      homes: [1],
      chores:[1]
    }
}

const homes = {
  1: {
      id: 1,
      name: 'Forst House',
      users: [1],
      chores: [1]
    }
}

const chores = {
  1: {
      id: 1,
      name: 'Sweep',
      status: 'incomplete',
      homeId: 1,
      userId: 1
  }
}

const buildRoutes = () => {

  const router = new express.Router();

  router.get('/users', (req,res) => {
    const response = [];
    Object.keys(users).forEach( (id) => {
      let user = users[id];
      const userHomes = user.homes.map( homeId => {
        const { users, chores, ...home } = homes[homeId]
        return home
      });
      const userChores = user.chores.map( choreId => {
        const {userId, homeId, ...chore} = chores[choreId]
        return chore
      });

      const userResp = {
        id: user.id,
        name: user.name,
        email: user.email,
        chores: userChores,
        homes: userHomes
      }
      response.push(userResp);
    });

    res.send(response)
  });

  router.get('/homes', (req,res) => {
    const response = []

    for(let home of homes) {
      const userHomes = users.filter(user => home.users.includes(user.id))

      const homeResp = {
        id: home.id,
        name: home.name,
        users:userHomes
      }
      response.push(homeResp);
    };

    res.send(response)
  });

  router.get('/homes/:id', (req,res) => {
    const home = homes.find(home => home.id == req.params.id);
    const homeUsers = [];
    const homeChores = [];

    for(let userId of home.users){
      const {homes, ...user} = users.find(user => user.id == userId)
      homeUsers.push(user);
    }

    for(let choreId of home.chores){
      const {homeId, ...chore} = chores.find(chore => chore.id == choreId)
      homeChores.push(chore);
    }

    const response = {
      id: home.id,
      name: home.name,
      chores: homeChores,
      users : homeUsers
    }

    res.send(response)
  });

  router.patch('/chore/:id', (req,res) => {
    const chore = chore.find(chore => chore.id == req.params.id);

    res.send(response)
  });

  return router;
};

module.exports = { buildRoutes };

