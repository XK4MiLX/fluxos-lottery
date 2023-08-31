const axios = require('axios');
const axiosConfig = {
  timeout: 13456,
};

function between(min, max) {
  return Math.floor(
    Math.random() * (max - min) + min
  )
}


async function getAppSpecifications() {
  try {
    const fluxnodeList = await axios.get('https://api.runonflux.io/apps/globalappsspecifications', axiosConfig);
    if (fluxnodeList.data.status === 'success') {

      return fluxnodeList.data.data || [];
    }
    return [];
  } catch (e) {
    return [];
  }
}

async function start(type , winners) {
  const filter = type;
  console.log('------------------------------------------------------------------------------------------------');
  console.log(`| Searching on FluxOS for [filter: ${filter}]`);
  console.log('------------------------------------------------------------------------------------------------');
  let zelid_array = [];
  let name_array = [];
  let winner_list = [];
  let instances = [];
  let appsDetails = await getAppSpecifications();
  for (const appSpecs of appsDetails) {
   if (filter.some((word) => appSpecs.name.startsWith(word))) {
    if ( zelid_array.indexOf(appSpecs.owner) !== -1 )  {
         zelid_array.push(`${appSpecs.owner}`);
         name_array.push(`${appSpecs.name}`);
         instances.push(`${appSpecs.instances}`);
    } else {
      instances[zelid_array.indexOf(appSpecs.owner)] = Number(instances[zelid_array.indexOf(appSpecs.owner)]) + Number(appSpecs.instances)
    }
   }
  }

var result = instances.indexOf(Math.max(...instances));
console.log(`| Winner =>  ${zelid_array[result]}, ${Math.max(...instances)}`);
exit
  
  for (var i = 0; i < winners; i++){
    let winnerNumber = between(0,zelid_array.length-1);
    let index = winner_list.indexOf(zelid_array[winnerNumber]);
    if (index == -1) {
      winner_list.push(zelid_array[winnerNumber]);
      console.log(`| Winner ${i+1} =>  ${zelid_array[winnerNumber]}, ${name_array[winnerNumber]}`);
    } else { i = i-1 }
  }
  console.log(`-------------------------------------------------------------------------------------[FOUND: ${zelid_array.length}]`);
}

start(process.argv.slice(3),process.argv[2]);
