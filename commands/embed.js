module.exports = {
  help: {
    name: 'embed',
    desc: 'Displays an example for rich embeds',
    usage: '',
    aliases: []
  },

  exec: (client, msg, params) => {
    let embed = {
      color: 3447003,
      author: {
        name: msg.author.username,
        icon_url: msg.author.avatarURL // eslint-disable-line camelcase
      },
      description: '\nThis is a test embed to showcase what they look like and what they can do.\n[Code here](https://github.com/vzwGrey/discord-selfbot/blob/master/commands/embed.js)',
      fields: [
        {
          name: 'Fields',
          value: 'They can have different fields with small headlines.'
        },
        {
          name: 'Masked links',
          value: 'You can put [masked](https://github.com/vzwGrey/discord-selfbot/blob/master/commands/embed.js) links inside of rich embeds.'
        },
        {
          name: 'Markdown',
          value: 'You can put all the *usual* **__Markdown__** inside of them.'
        }
      ],
      timestamp: new Date(),
      footer: {
        icon_url: msg.author.avatarURL, // eslint-disable-line camelcase
        text: '©vzwGrey'
      }
    };

    msg.channel.sendMessage('', { embed });
  }
};
