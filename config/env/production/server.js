module.exports = ({ env }) => ({
    url: env('https://eventscasablancabackend.herokuapp.com/'),
    keys: ['myKeyA', 'myKeyB'],
    app: {
        // keys: env.array('APP_KEYS'),
        keys: ['myKeyA', 'myKeyB'],
      },
  });
   