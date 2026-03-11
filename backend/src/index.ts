import app from "./app";
import { env, connectMongoDB, connectRedis } from "@config/index";

const startServer = async (): Promise<void> => {
  try {
    // Connect to databases
    await connectMongoDB();
    await connectRedis();

    // Start server
    app.listen(env.port, () => {
      console.log(`Server running in ${env.nodeEnv} mode on port ${env.port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on("unhandledRejection", (reason: unknown) => {
  console.error("Unhandled Rejection:", reason);
  process.exit(1);
});

// Handle uncaught exceptions
process.on("uncaughtException", (error: Error) => {
  console.error("Uncaught Exception:", error);
  process.exit(1);
});

startServer();
