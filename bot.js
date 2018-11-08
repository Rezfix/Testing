const Discord = require("discord.js");
const client = new Discord.Client();

client.on('ready', () => {
    client.user.setGame('Rezfix -help','https://www.twitch.tv/Rezfix');
    console.log('---------------');
    console.log(' Bot Is Online')
    console.log('---------------')
  });

client.on('message', message => {
    var prefix = '$'; // هنا تقدر تغير البرفكس
var command = message.content.split(" ")[0];
if(command == prefix + 'bc') { // الكوماند !bc
    var args = message.content.split(' ').slice(1).join(' ');
    if(message.author.bot) return;
    if(!args) return message.channel.send(`**➥ Useage:** ${prefix}bc كلامك`);
    
    let bcSure = new Discord.RichEmbed()
    .setTitle(`:mailbox_with_mail: **هل انت متأكد انك تريد ارسال رسالتك الى** ${message.guild.memberCount} **عضو**`)
    .setThumbnail(client.user.avatarURL)
    .setColor('RANDOM')
    .setDescription(`**\n:envelope: ➥ رسالتك**\n\n${args}`)
    .setTimestamp()
    .setFooter(message.author.tag, message.author.avatarURL)
    
    message.channel.send(bcSure).then(msg => {
        msg.react('✅').then(() => msg.react('❎'));
        message.delete();
        
        
        let yesEmoji = (reaction, user) => reaction.emoji.name === '✅'  && user.id === message.author.id;
        let noEmoji = (reaction, user) => reaction.emoji.name === '❎' && user.id === message.author.id;
        
        let sendBC = msg.createReactionCollector(yesEmoji);
        let dontSendBC = msg.createReactionCollector(noEmoji);
        
        sendBC.on('collect', r => {
            message.guild.members.forEach(member => {
                member.send(args.replace(`[user]`, member)).catch();
                if(message.attachments.first()){
                    member.sendFile(message.attachments.first().url).catch();
                }
            })
            message.channel.send(`:timer: **يتم الان الارسال الى** \`\`${message.guild.memberCount}\`\` **عضو**`).then(msg => msg.delete(5000));
            msg.delete();
        })
        dontSendBC.on('collect', r => {
            msg.delete();
            message.reply(':white_check_mark: **تم الغاء ارسال رسالتك بنجاح**').then(msg => msg.delete(5000));
        });
    })
}
});

clinet.on('message', ra3d => {
    var prefix = "#";
                            let args = ra3d.content.split(" ").slice(1).join(" ")
    if(ra3d.content.startsWith('#cc')) {
        if(!args) return ra3d.channel.send('`يرجي اختيار كم لون `');
                 if (!ra3d.member.hasPermission('MANAGE_ROLES')) return ra3d.channel.sendMessage('`**⚠ | `[MANAGE_ROLES]` لا يوجد لديك صلاحية**'); 
                  ra3d.channel.send(`**✅ |Created __${args}__ Colors**`);
                      setInterval(function(){})
                        let count = 0;
                        let ecount = 0;
              for(let x = 1; x < `${parseInt(args)+1}`; x++){
                ra3d.guild.createRole({name:x,
                  color: 'RANDOM'})
                  }
                }
           });

client.login(process.env.BOT_TOKEN);
