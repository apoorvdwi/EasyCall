const randomstring = require('randomstring');

export const generateWhiteBoardUrl = () => {
  const firstPart = randomstring.generate({
    length: 20,
    charset: 'hex',
    capitalization: 'lowercase',
  });

  const secondPart = randomstring.generate({
    length: 22,
    readable: true,
  });

  const url = `https://excalidraw.com/#room=${firstPart},${secondPart}`;
  return url;
};
