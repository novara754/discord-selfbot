module.exports = {
  help: {
    name: 'embed',
    desc: 'Displays an example for rich embeds',
    usage: '<message>',
    aliases: []
  },

  exec: (client, msg, params) => {
    let embed = {
      color: 3447003,
      author: {
        name: client.user.username,
        icon_url: client.user.avatarURL // eslint-disable-line camelcase
      },
      title: 'THIS IS A TITLE',
      url: 'http://example.com', // The url for the title.
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
        },
        {
          name: 'Inline fields',
          value: 'You can also have fields inline with eachother using the `inline` property',
          inline: true
        },
        {
          name: 'Images & thumbnails',
          value: 'You can also embed images, and use little thumbnails!',
          inline: true
        }
      ],
      /* thumbnail: {
        url: 'http://i.imgur.com/uaUxZtz.jpg'
      } */
      image: {
        url: 'http://i.imgur.com/uaUxZtz.jpg'
      },
      timestamp: new Date(),
      footer: {
        icon_url: client.user.avatarURL, // eslint-disable-line camelcase
        text: '©vzwGrey'
      }
    };

    msg.channel.sendMessage('', { embed });
  }
};
