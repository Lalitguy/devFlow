import pino from "pino";

const isEdge = process.env.NEXT_ENV === "edge";
const isProduction = process.env.NEXT_ENV === "production";

const logger = pino({
  level: process.env.LOG_LEVEL || "info",
  transport:
    !isEdge && !isProduction
      ? {
          target: "pino-pretty",
          options: {
            colorize: true,
            timestamp: true,
            ignore: "pid,hostname",
            translateTime: "SYS:standard",
          },
        }
      : undefined,

  formatters: {
    level: (label) => ({
      level: label.toUpperCase(),
    }),
  },
  timestamp: pino.stdTimeFunctions.isoTime,
});

export default logger;
