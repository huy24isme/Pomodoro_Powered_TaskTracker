const { getHealthStatus } = require('../services/health.service');

function healthCheck(req, res) {
  const payload = getHealthStatus();
  return res.status(200).json(payload);
}

module.exports = {
  healthCheck,
};
