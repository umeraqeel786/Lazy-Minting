const { ethers }  = require('hardhat');

async function attach(name, address) {
  const contractFactory = await ethers.getContractFactory(name);
  return contractFactory.attach(address);
}

async function main() {
  const [admin, minter, relayer] = await ethers.getSigners();
  console.log(`Sign authorization:`);
  
  const registry    = (await attach('ERC721LazyMintWith712', process.env.ADDRESS)).connect(admin);
  const { chainId } = await ethers.provider.getNetwork();
  const tokenId     = process.env.TOKENID || 1;
  const account     = process.env.ACCOUNT || '0x8c8e240C723F5F850c6fdfD04a1B08598DaF6B53';
  const uri = "ipfs://bafybeibnsoufr2renqzsh347nrx54wcubt5lgkeivez63xvivplfwhtpym/metadata.json";


   // 'https://gateway.pinata.cloud/ipfs/QmT2MusjAx9W2KMFnWaqrGb4MDPxAE1RFZ9mpziq3XKvne';
//'https://ipfs.io/ipfs/bafkreiemrdnm26x3mpzjkhpewirwrzubjvuje2rbj2lgqexesbqq72utey';  
// 'ipfs://bafkreiemrdnm26x3mpzjkhpewirwrzubjvuje2rbj2lgqexesbqq72utey';
//'https://gateway.pinata.cloud/ipfs/QmT2MusjAx9W2KMFnWaqrGb4MDPxAE1RFZ9mpziq3XKvne';
 
  const voucher = { tokenId, uri, account }
       console.log(voucher);
       const domain = {
       name: 'Name',
       version: '1',
       verifyingContract: registry.address,
       chainId: '4'
      }

     const types = {
      NFTVoucher: [
        {name: "tokenId", type: "uint256"},
        {name: "uri", type: "string"},  
        {name: "account", type: "address"},
      ]
    }
 
  
  const signature   = await admin._signTypedData(domain,types,voucher);
  console.log({ registry: registry.address, tokenId, account,uri, signature });
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
