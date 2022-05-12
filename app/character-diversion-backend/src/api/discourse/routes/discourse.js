'use strict';

/**
 * discourse router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::discourse.discourse');
