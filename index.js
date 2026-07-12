require("dotenv").config();

const {
    Client,
    GatewayIntentBits,
    REST,
    Routes,
    SlashCommandBuilder,
    ChannelType
} = require("discord.js");


const client = new Client({
    intents: [
        GatewayIntentBits.Guilds
    ]
});


// Commandes du bot
const commands = [
    new SlashCommandBuilder()
        .setName("suggestion")
        .setDescription("Créer une nouvelle proposition")
        .addStringOption(option =>
            option
                .setName("titre")
                .setDescription("Titre de la proposition")
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName("description")
                .setDescription("Description de la proposition")
                .setRequired(true)
        )
].map(command => command.toJSON());


// Installation des commandes
const rest = new REST({ version: "10" })
    .setToken(process.env.TOKEN);


client.once("ready", async () => {

    console.log(`🏛️ Architecte connecté : ${client.user.tag}`);


    await rest.put(
        Routes.applicationCommands(process.env.CLIENT_ID),
        {
            body: commands
        }
    );


    console.log("✅ Commande /suggestion activée");
});


// Création d'une suggestion
client.on("interactionCreate", async interaction => {

    if (!interaction.isChatInputCommand()) return;


    if (interaction.commandName === "suggestion") {


        const titre = interaction.options.getString("titre");
        const description = interaction.options.getString("description");


        const salon = await interaction.guild.channels.create({

            name: `📜-proposition-${Date.now().toString().slice(-4)}`,

            type: ChannelType.GuildText

        });


        await salon.send({

            content:
`🏛️ **Nouvelle proposition**

👤 Auteur : ${interaction.user}

💡 **Titre :**
${titre}

📝 **Description :**
${description}

🗳️ Les votes arriveront bientôt.`

        });


        await interaction.reply({

            content: `✅ Ta proposition a été créée : ${salon}`,

            ephemeral: true

        });

    }

});


client.login(process.env.TOKEN);
