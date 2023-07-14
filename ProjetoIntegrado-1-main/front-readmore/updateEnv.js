const fs = require('fs');
const os = require('os');

// Obtém o IP local
const getLocalIP = () => {
  const interfaces = os.networkInterfaces();
  for (const interfaceName in interfaces) {
    const addresses = interfaces[interfaceName];
    for (const address of addresses) {
      if (address.family === 'IPv4' && !address.internal) {
        return address.address;
      }
    }
  }
  return '';
};

const localIP = getLocalIP();

if (!localIP) {
  console.error('Failed to get local IP');
  return;
}

// Remove o /24 da submascara se presente
const ipWithoutCIDR = localIP.split('/')[0];

// Atualiza o arquivo .env com o IP local
fs.writeFileSync('.env', `API_URL=http://${ipWithoutCIDR}:8000`);

console.log('.env file updated successfully!');
