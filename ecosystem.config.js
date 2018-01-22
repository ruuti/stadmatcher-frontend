module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [
    {
      name      : 'Frontend',
      script    : 'production.js',
      env_production : {
        NODE_ENV: 'production'
      }
    }
  ]
};