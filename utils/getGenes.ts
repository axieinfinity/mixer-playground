import axios from "axios"

export const getGenes = async (axieId: number) =>{
        const data = await axios.post('/api/getAxieGenes',{ axieId : axieId })
        return data.data as string
}