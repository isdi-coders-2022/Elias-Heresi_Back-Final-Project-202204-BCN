const mockUser = {
  userId: {
    name: "Champagne",
    surname: "Papi",
    username: "elayas",
  },
};

const alternativeToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibmV3dXNlciIsInN1cm5hbWUiOiJ0ZXN0IiwidXNlcm5hbWUiOiJ0ZXN0IiwiaWF0IjoxNjU0MzMxODI2fQ.E7Ny36rJbHF6olYZ749fSykCoYIbJHTYWeNUwFYqO6c";

const mockToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTWFydGEiLCJzdXJuYW1lIjoiQW1pZ2EiLCJ1c2VybmFtZSI6Im1hcnRhIiwiaWF0IjoxNjU0Mjg0NjUyfQ.mJSMLapcKXOUZVe6VlTwZFyMfv5e9UcVfoWrLLBZ980";

const mockDiary = {
  entries: [
    {
      username: "marta",
      vitality: 4,
      positiveEmotion: 10,
      engagement: 4,
      relationships: 7,
      meaning: 4,
      accomplishment: 6,
      wellBeing: 6,
      image:
        "https://thumbs.dreamstime.com/b/cierra-los-empresarios-d%C3%A1ndole-la-mano-durante-una-reuni%C3%B3n-empresa-de-negocios-transacciones-apret%C3%B3n-manos-165281340.jpg",
      commentary: "Had a good day at the office. Excited on what is coming",
    },
    {
      username: "marta",
      vitality: 9,
      positiveEmotion: 3,
      engagement: 8,
      relationships: 3,
      meaning: 2,
      accomplishment: 4,
      wellBeing: 4,
      image:
        "https://transcode-v2.app.engoo.com/image/fetch/f_auto,c_lfill,w_300,dpr_3/https://assets.app.engoo.com/images/QyDHB4YHkK2V6TA6QkDzSIMbQpg9IIUKO5tn8KuDcJ1.jpeg",
      commentary: "Rough weekend. My dog got sick",
    },
  ],
};

module.exports = { mockUser, mockDiary, mockToken, alternativeToken };
