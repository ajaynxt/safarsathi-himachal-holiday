import app from './app';
import { config } from './config/environment';

const server = app.listen(config.port, () => {
  console.log(`====================================================`);
  console.log(` AJAYNXT Social Analytics Backend API`);
  console.log(` Port: ${config.port}`);
  console.log(` Region: ${config.gcpRegion} (Mumbai)`);
  console.log(` Environment: ${config.nodeEnv}`);
  console.log(` Meta API Target: ${config.meta.apiVersion}`);
  console.log(`====================================================`);
});

// Graceful shutdown handling for Cloud Run scale-to-zero
const handleShutdown = () => {
  console.log('Received termination signal. Closing HTTP server gracefully...');
  server.close(() => {
    console.log('HTTP server closed. Exiting process.');
    process.exit(0);
  });
};

process.on('SIGTERM', handleShutdown);
process.on('SIGINT', handleShutdown);
