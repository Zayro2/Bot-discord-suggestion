const {
SlashCommandBuilder,
ChannelType,
ActionRowBuilder,
ButtonBuilder,
ButtonStyle,
EmbedBuilder
}=require("discord.js");


module.exports={


data:
new SlashCommandBuilder()
.setName("suggestion")
.setDescription("Créer une proposition")
.addStringOption(option=>
option
.setName("titre")
.setDescription("Titre")
.setRequired(true)
)
.addStringOption(option=>
option
.setName("description")
.setDescription("Description")
.setRequired(true)
),



async execute(interaction){


const titre =
interaction.options.getString("titre");


const description =
interaction.options.getString("description");



const salon =
await interaction.guild.channels.create({

name:
`📜-proposition-${Date.now().toString().slice(-4)}`,

type:
ChannelType.GuildText

});



const embed =
new EmbedBuilder()

.setTitle("🏛️ Nouvelle proposition")

.setDescription(
`
👤 Auteur : ${interaction.user}

💡 **${titre}**

📝 ${description}


🗳️ Votez ci-dessous !
`
)

.setColor("Blue")

.addFields(

{
name:"🟢 Pour",
value:"0",
inline:true
},

{
name:"🔴 Contre",
value:"0",
inline:true
}

);



const boutons =
new ActionRowBuilder()
.addComponents(

new ButtonBuilder()
.setCustomId("pour")
.setLabel("🟢 Pour")
.setStyle(ButtonStyle.Success),


new ButtonBuilder()
.setCustomId("contre")
.setLabel("🔴 Contre")
.setStyle(ButtonStyle.Danger)

);



await salon.send({

content:"@everyone",

embeds:[embed],

components:[boutons]

});



await interaction.reply({

content:
`✅ Proposition créée : ${salon}`,

ephemeral:true

});


}


};
