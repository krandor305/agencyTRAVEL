module.exports = {
  rest: {
    defaultLimit: 25,
    maxLimit: 100,
    withCount: true,
  },
  settings: {
    cors: {
      enabled: true, 
      // headers: '*', 
      origin: ["*"],
    },
  },
};
