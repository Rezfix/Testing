const Discord = require("discord.js");
const client = new Discord.Client();

client.on('ready', () => {
    client.user.setGame('Rezfix -help','https://www.twitch.tv/Rezfix');
    console.log('---------------');
    console.log(' Bot Is Online')
    console.log('---------------')
  });

clinet.on('message', message => {
    if (message.content.startsWith("رابط")) {

        message.channel.createInvite({
        thing: true,
        maxUses: 5,
         maxAge: 86400
    }).then(invite =>
      message.author.sendMessage(invite.url)
    )
    const embed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setDescription("تم الارسال على الخاص | 🔗")
      message.channel.sendEmbed(embed).then(message => {message.delete(10000)})
              const Embed11 = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setDescription("This link will stay with you 1 hours 🔗")
      message.author.sendEmbed(Embed11)
    }
}); 

client.login(process.env.BOT_TOKEN);
