module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '341f18ff386a9e79209f3647d201e146'),
  },
  watchIgnoreFiles: [
    '**/config/sync/**',
  ],
});
