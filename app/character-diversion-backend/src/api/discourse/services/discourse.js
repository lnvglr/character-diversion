'use strict';

/**
 * discourse service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::discourse.discourse');
