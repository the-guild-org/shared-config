const ANSI_CODES = {
  red: '\x1b[31m',
  reset: '\x1b[0m',
};

throw new Error(
  `${ANSI_CODES.red}Config to extend must be 'guild/base' or 'guild/react'${ANSI_CODES.reset}`
);
