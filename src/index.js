require('dotenv').config()
const {Configuration, OpenAIApi} = require('openai');

const config = new Configuration({
    apiKey: process.env.OPENAIAPIKEY,
    organization: process.env.OPENAI_ORGANIZATION
})

const openai = new OpenAIApi(config);

const generateDescription = async (productName) => {
    const prompt = `Gerar uma descrição de venda simples para o produto ${productName}`

    try{
        const completion = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: prompt,
            max_tokens: 2048
        })
        return completion.data.choices[0].text.trim()
    }catch(err){
        console.log(err);
    }
};

(async () => {
    const nomeProduto = "Monitor AOC Hero 27' 144hz"
    const descricao = await generateDescription(nomeProduto)
    console.log(`Nome do produto: ${nomeProduto}`)
    console.log(`Descrição: ${descricao}`)
})();