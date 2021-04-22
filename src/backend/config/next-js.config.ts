import { registerAs } from "@nestjs/config";

export default registerAs('next-js', () => {
  const configuration = require('../../../next.config').env;
  return configuration;
});
