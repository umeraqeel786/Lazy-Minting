require('dotenv').config();
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
const { API_URL, PRIVATE_KEY } = process.env;
module.exports = {
   solidity: "0.8.4",
   defaultNetwork: "rinkeby",
   networks: {
      hardhat: {},	
      rinkeby: {
         url: API_URL,
         accounts: [`0x${PRIVATE_KEY}`],
         gasPrice:auto,
         gasMultiplier: 1,
         timeout: 20000,
         saveDeployments: true,
         chainId: 4,
      }
   },
}

 
 /**
 * @type import('hardhat/config').HardhatUserConfig
 */
 require('@nomiclabs/hardhat-waffle');
require('@nomiclabs/hardhat-ethers');
module.exports = {
  solidity: "0.8.3",
};
