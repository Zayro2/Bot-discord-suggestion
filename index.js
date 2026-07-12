require("dotenv").config();

const {
Client,
GatewayIntentBits,
REST,
Routes
} = require("discord.js");


const suggestion = require("./commands/suggestion");


const client = new Client({
    intents:[
        GatewayIntentBits.Guilds
    ]
});


client.once("ready", async()=>{

console.log(`🏛️ Connecté : ${client.user.tag}`);


const rest = new REST({version:"10"})
.setToken(process.env.TOKEN);


await rest.put(
Routes.applicationCommands(process.env.CLIENT_ID),
{
body:[
suggestion.data
]
});


console.log("✅ Commandes chargées");

});



client.on(
"interactionCreate",
async interaction=>{


if(
interaction.isChatInputCommand()
&& interaction.commandName==="suggestion"
){

suggestion.execute(interaction);

}



});


client.login(process.env.TOKEN);
