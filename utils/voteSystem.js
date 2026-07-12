const fs = require("fs");

const fichier = "./data/votes.json";


function chargerVotes(){

    if(!fs.existsSync(fichier)){
        fs.writeFileSync(fichier,"{}");
    }

    return JSON.parse(
        fs.readFileSync(fichier)
    );

}



function sauvegarderVotes(data){

    fs.writeFileSync(
        fichier,
        JSON.stringify(data,null,2)
    );

}



function creerVote(messageId){

    const votes = chargerVotes();


    votes[messageId] = {

        pour: [],
        contre: []

    };


    sauvegarderVotes(votes);

}



function voter(messageId,userId,type){


    const votes = chargerVotes();


    if(!votes[messageId]){
        return {
            erreur:"Vote introuvable"
        };
    }



    const vote = votes[messageId];


    if(
        vote.pour.includes(userId)
        ||
        vote.contre.includes(userId)
    ){

        return {
            erreur:"Tu as déjà voté"
        };

    }



    if(type==="pour"){

        vote.pour.push(userId);

    }


    if(type==="contre"){

        vote.contre.push(userId);

    }



    sauvegarderVotes(votes);



    return vote;

}



function resultat(messageId){

    const votes = chargerVotes();

    return votes[messageId];

}



module.exports={
    creerVote,
    voter,
    resultat
};
