import { registerAs } from "@nestjs/config";

export default registerAs('database', () => ({
  url: process.env.DB_HOST || 'mysql://myca_xdb:ud8UuUIpLJdS9Q!R@localhost:3306/myca_xdb',
  synchronize: process.env.DB_SYNC === 'true' || false,
}));
