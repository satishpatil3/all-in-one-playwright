/**
 * @fileoverview Environment configuration.
 * All credentials and environment-specific values live here.
 * In CI, override via environment variables.
 */

const environments = {
  qa: {
    PRACTICE: {
      USERNAME: process.env.PRACTICE_USERNAME || 'student',
      PASSWORD: process.env.PRACTICE_PASSWORD || 'Password123',
    },
    HEROKUAPP: {
      USERNAME: process.env.HEROKUAPP_USERNAME || 'tomsmith',
      PASSWORD: process.env.HEROKUAPP_PASSWORD || 'SuperSecretPassword!',
    },
    ORANGEHRM: {
      USERNAME: process.env.ORANGEHRM_USERNAME || 'Admin',
      PASSWORD: process.env.ORANGEHRM_PASSWORD || 'admin123',
    },
    SAUCEDEMO: {
      PASSWORD: process.env.SAUCEDEMO_PASSWORD || 'secret_sauce',
    },
    BOOKING_API: {
      USERNAME: process.env.BOOKING_API_USERNAME || 'admin',
      PASSWORD: process.env.BOOKING_API_PASSWORD || 'password123',
    },
  },
  dev: {
    PRACTICE: {
      USERNAME: process.env.PRACTICE_USERNAME || 'student_dev',
      PASSWORD: process.env.PRACTICE_PASSWORD || 'Password123_dev',
    },
    HEROKUAPP: {
      USERNAME: process.env.HEROKUAPP_USERNAME || 'tomsmith_dev',
      PASSWORD: process.env.HEROKUAPP_PASSWORD || 'SuperSecretPassword!_dev',
    },
    ORANGEHRM: {
      USERNAME: process.env.ORANGEHRM_USERNAME || 'Admin_dev',
      PASSWORD: process.env.ORANGEHRM_PASSWORD || 'admin123_dev',
    },
    SAUCEDEMO: {
      PASSWORD: process.env.SAUCEDEMO_PASSWORD || 'secret_sauce_dev',
    },
    BOOKING_API: {
      USERNAME: process.env.BOOKING_API_USERNAME || 'admin',
      PASSWORD: process.env.BOOKING_API_PASSWORD || 'password123',
    },
  },
  prod: {
    PRACTICE: {
      USERNAME: process.env.PRACTICE_USERNAME || 'student',
      PASSWORD: process.env.PRACTICE_PASSWORD || 'Password123',
    },
    HEROKUAPP: {
      USERNAME: process.env.HEROKUAPP_USERNAME || 'tomsmith',
      PASSWORD: process.env.HEROKUAPP_PASSWORD || 'SuperSecretPassword!',
    },
    ORANGEHRM: {
      USERNAME: process.env.ORANGEHRM_USERNAME || 'Admin',
      PASSWORD: process.env.ORANGEHRM_PASSWORD || 'admin123',
    },
    SAUCEDEMO: {
      PASSWORD: process.env.SAUCEDEMO_PASSWORD || 'secret_sauce',
    },
    BOOKING_API: {
      USERNAME: process.env.BOOKING_API_USERNAME || 'admin',
      PASSWORD: process.env.BOOKING_API_PASSWORD || 'password123',
    },
  },
};

const currentEnv = process.env.TEST_ENV || 'qa';
const ENV = environments[currentEnv.toLowerCase()] || environments.qa;

module.exports = { ENV, currentEnv };

