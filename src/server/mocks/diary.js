const mockUser = {
  userId: {
    name: "Champagne",
    surname: "Papi",
    username: "elayas",
  },
};

const mockToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQ2hhbXBhZ25lIiwic3VybmFtZSI6IlBhcGkiLCJ1c2VybmFtZSI6ImVsYXlhcyIsImlhdCI6MTY1NDA4NDM1M30.jVRRrjo0Fc3a6fti4HXpOWS8_rW-5IdtJ3HdwugvLGc";

const mockDiary = {
  username: "elayas",
  diary: [
    {
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

module.exports = { mockUser, mockDiary, mockToken };
