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

var prefix = "!";
client.on("message", function(message) {
    let toBan = message.mentions.users.first();
    let toReason = message.content.split(" ").slice(2).join(" ");
    let toEmbed = new Discord.RichEmbed()
   if(message.content.startsWith(prefix + "ban")) {
       if(!message.member.hasPermission("BAN_MEMBERS")) return message.reply("**# - انت لا تملك الصلاحيات الكامله للباند!**");
       if(!toBan) return message.reply("**# - منشن شخص!**");
       if(toBan.id === ("447121312960479242")) return message.reply("**# You cannot ban me!**");
       if(toBan === message.member.guild.owner) return message.reply("**# You cannot ban the owner of the server!**");
       if(toBan.bannable) return message.reply("لايمكنني طرد شخص اعلى من رتبتي");
       if(!toReason) return message.reply("اكتب سبب الباند");
       if(toBan.id === message.author.id) return message.reply("**# You cannot ban yourself!**")
       if(!message.guild.member(toBan).bannable) return message.reply("**# - I cannot ban this person!**")
       let toEmbed;
       toEmbed = new Discord.RichEmbed()
       .setTitle("You have been banned from a server!")
       .setThumbnail(toBan.avatarURL)
       .addField("**# - Server:**",message.guild.name,true)
       .addField("**# - Reason:**",toReason,true)
       .addField("**# - Banned By:**",message.author,true)
       if(message.member.hasPermission("BAN_MEMBERS")) return (
           toBan.sendMessage({embed: toEmbed}).then(() => message.guild.member(toBan).ban({reason: toReason})).then(() => message.channel.send(`**# Done! I banned: ${toBan}**`))
       );
       
   }
});

client.on('guildMemberAdd', (member) => {
member.addRole(member.guild.roles.find('name', '· RZ · Member # ·'));
});

client.on("message", message => {
  if (message.author.bot) return;
  
  let command = message.content.split(" ")[0];
  
  if (command === "$mute") {
        if (!message.member.hasPermission('MANAGE_ROLES')) return message.reply("** لا يوجد لديك برمشن 'Manage Roles' **").catch(console.error);
  let user = message.mentions.users.first();
  let modlog = client.channels.find('name', 'log');
  let muteRole = client.guilds.get(message.guild.id).roles.find('name', 'Muted');
  if (!muteRole) return message.reply("** لا يوجد رتبة الميوت 'Muted' **").catch(console.error);
  if (message.mentions.users.size < 1) return message.reply('** يجب عليك منشنت شخص اولاً**').catch(console.error);
  
  const embed = new Discord.RichEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .addField('الأستعمال:', 'اسكت/احكي')
    .addField('تم ميوت:', `${user.username}#${user.discriminator} (${user.id})`)
    .addField('بواسطة:', `${message.author.username}#${message.author.discriminator}`)
   
   if (!message.guild.member(client.user).hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) return message.reply('** لا يوجد لدي برمشن Manage Roles **').catch(console.error);
 
  if (message.guild.member(user).roles.has(muteRole.id)) {
return message.reply("**:white_check_mark: .. تم اعطاء العضو ميوت**").catch(console.error);
} else {
    message.guild.member(user).addRole(muteRole).then(() => {
return message.reply("**:white_check_mark: .. تم اعطاء العضو ميوت كتابي**").catch(console.error);
});
  }

};

});

   client.on("message", message => {
  if (message.author.bot) return;
  
  let command = message.content.split(" ")[0];
  
  if (command === "$unmute") {
        if (!message.member.hasPermission('MANAGE_ROLES')) return message.reply("** لا يوجد لديك برمشن 'Manage Roles' **").catch(console.error);
  let user = message.mentions.users.first();
  let modlog = client.channels.find('name', 'log');
  let muteRole = client.guilds.get(message.guild.id).roles.find('name', 'Muted');
  if (!muteRole) return message.reply("** لا يوجد لديك رتبه الميوت 'Muted' **").catch(console.error);
  if (message.mentions.users.size < 1) return message.reply('** يجب عليك منشنت شخص اولاً**').catch(console.error);
  const embed = new Discord.RichEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .addField('الأستعمال:', 'اسكت/احكي')
    .addField('تم فك الميوت عن:', `${user.username}#${user.discriminator} (${user.id})`)
    .addField('بواسطة:', `${message.author.username}#${message.author.discriminator}`)

  if (!message.guild.member(client.user).hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) return message.reply('** لا يوجد لدي برمشن Manage Roles **').catch(console.error);

  if (message.guild.member(user).removeRole(muteRole.id)) {
return message.reply("**:white_check_mark: .. تم فك الميوت عن الشخص **").catch(console.error);
} else {
    message.guild.member(user).removeRole(muteRole).then(() => {
return message.reply("**:white_check_mark: .. تم فك الميوت عن الشخص **").catch(console.error);
});
  }

};

});

client.on("message", message => {
              var args = message.content.substring(prefix.length).split(" ");
              if (message.content.startsWith(prefix + "clear")) {
                  if(!message.channel.guild) return message.reply('**:x: اسف لكن هذا الامر للسيرفرات فقط **');         
     if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('**⚠  لا يوجد لديك صلاحية لمسح الشات**');
          var msg;
          msg = parseInt();
        
        message.channel.fetchMessages({limit: msg}).then(messages => message.channel.bulkDelete(messages)).catch(console.error);
        message.channel.sendMessage("", {embed: {
          title: "``تــم مسح الشات ``",
          color: 0x06DF00,
          footer: {
            
          }
        }}).then(msg => {msg.delete(10000)});
                            }
  
       
  });

client.on('guildMemberAdd', member => {
  member.guild.fetchInvites().then(guildInvites => {
    const ei = invites[member.guild.id];
    const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);
    const inviter = client.users.get(invite.inviter.id);
    const yumz = member.guild.channels.find("name", "welcome");
     yumz.send(`<@${member.user.id}> joined by <@${inviter.id}>`);
   //  yumz.send(`<@${member.user.id}> joined using invite code ${invite.code} from <@${inviter.id}>. Invite was used ${invite.uses} times since its creation.`);
  }); 
});

client.login(process.env.BOT_TOKEN);
