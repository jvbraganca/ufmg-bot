require("dotenv").config();
const twit = require("twit");

const T = twit({
  consumer_key: process.env.API_KEY,
  consumer_secret: process.env.API_SECRET_KEY,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
});

console.log(`Bot iniciado - ${new Date()}`);

retweet = () => {
  let params = {
    q: "ufmg OR universidade federal de minas gerais",
    count: 100,
  };
  T.get("search/tweets", params, (err, data, response) => {
    if (!err) {
      try {
      
        for (let dat of data.statuses) {
            let retweetId = dat.id_str;
            T.post("statuses/retweet/:id", { id: retweetId }, (err) => {
              err
                ? console.log(`Algo de errado aconteceu! => ${err}`)
                : console.log(`Retuítado ${retweetId}`);
            });
        }
      } catch (error) {
        console.log("Erro após aquisição de dados: ");
        throw error;
      }
    } else {
      throw new Error(err);
    }
  });
};
// Every 1.66 minutes it will run the retweet function
//setInterval(retweet, 99600);
retweet()
