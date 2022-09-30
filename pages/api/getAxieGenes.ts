import axios from "axios";

export default function handler(req: any, res: any){

  axios.post('https://graphql-gateway.axieinfinity.com/graphql', {
    operationName: 'GetAxieDetail',
    variables: req.body,
    query:
      'query GetAxieDetail($axieId: ID!) {\n  axie(axieId: $axieId) {newGenes\n}\n}',
  })
  .then((data)=>{
    res.status(200).json(data.data.data.axie.newGenes)
  })

}