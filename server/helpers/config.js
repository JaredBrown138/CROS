let config = {};

/**
 * Localhost web server configurations
 */
config.web = {};
config.web.port = process.env.PORT || '3000';
config.web.secret = 'topsecret';

/**
 * Development database configurations
 *
 */
config.database = {};
config.database.username = 'mr_bob_himself';
config.database.password = 'bobiscool123';
config.database.port = '41043';
config.database.url = 'ds141043.mlab.com';
config.database.name = 'cros-bobs';

module.exports = config;
