module.exports = {
  help: {
    name: 'embed',
    desc: 'Runs a JavaScript snippet',
    usage: '<message>',
    aliases: []
  },

  exec: (client, msg, params) => {
    let embed = {
      color: 3447003,
      author: {
        name: client.user.username,
        icon_url: client.user.avatarURL
      },
      title: 'This is an embed',
      url: 'http://google.com',
      timestamp: new Date(),
      fields: [
        {
          name: 'Field #1',
          value: 'Content of field #1'
        }
      ],
      footer: {
        text: '©vzwGrey'
      }
    };

    msg.channel.sendMessage('', { embed });
  }
};
