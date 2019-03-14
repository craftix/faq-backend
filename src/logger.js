import { createLogger, transports, format } from 'winston';

const loggerFormat = format.printf(({ level, message, timestamp }) => {
    let pad = level.length;
    pad = pad > 10 ? (15 - pad) : 5 - pad;
    pad = ' '.repeat(pad);

    return `${timestamp} ${pad}${level}: ${message}`;
});

const fullFormat = format.combine(
    format.timestamp({ format: 'HH:mm:ss.SSS' }),
    format.prettyPrint(),
    loggerFormat
);

const logger = createLogger({
    level: 'debug',
    format: fullFormat,
    transports: [
        new transports.Console({ format: format.combine(format.colorize(), fullFormat) }),
        new transports.File({ filename: 'app.log' })
    ]
});

export default logger;
