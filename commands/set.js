module.exports = {
  help: {
    name: 'set',
    desc: 'Sets the status, game or nickname to x',
    usage: '<status|game|nickname> <value>',
    aliases: []
  },

  exec: (client, msg, [mode, ...value]) => {
    if(mode == 'status') {
      if(!value) return;
      client.user.setStatus(value[0]).then(user => {
        return msg.edit(`\`SELF:\` Set status to ${user.presence.status}`);
      }).then(m => {
        m.delete(500);        
      }).catch(console.error);
    } else if(mode == 'game') {
      if(value.length == 0) {
        client.user.setGame(null).then(_ => {
          return msg.edit(`\`SELF:\` Reset game`);
        }).then(m => {
          m.delete(500);
        }).catch(console.error);
      } else {
        client.user.setGame(value.join(' ')).then(user => {
          return msg.edit(`\`SELF:\` Set game to ${user.presence.game.name}`);
        }).then(m => {
          m.delete(500);
        }).catch(console.error);
      }
    } else if(mode == 'nickname') {
      let client_member = msg.guild.member(client.user);
      
      if(value.length == 0) {
        client_member.setNickname('').then(_ => {
          return msg.edit(`\`SELF:\` Reset nickname`);
        }).then(m => {
          m.delete(500);
        }).catch(console.error);
      } else {
        client_member.setNickname(value.join(' ')).then(member => {
          return msg.edit(`\`SELF:\` Set nickname to ${member.nickname}`);
        }).then(m => {
          m.delete(500);
        }).catch(console.error);
      }
    }
  }
};