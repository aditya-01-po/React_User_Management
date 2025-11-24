import axios from 'axios';

/**
 * URLs and other api constants
 */
const constants = {
    api: {
        baseURL: 'https://apimreact.azure-api.net/learnfuncapp',
    },
};

/**
 * Create an Axios Client with defaults
 */
export default axios.create({
    baseURL: constants.api.baseURL,
    headers: {'Ocp-Apim-Subscription-Key': '36a29e9638e24019bb843d3bd3e9b009' }
});