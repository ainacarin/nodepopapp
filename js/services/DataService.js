const url = "http://localhost:8000/api/posts";
// const url ="https://gist.githubusercontent.com/kasappeal/a8724e3f1c75ba515a8d9500f4b609e7/raw/4733ee642e4cf01e95ff4284d6e252d0706804b0/fweets.json"
export default {

    getAllAdvertisements: async () => {
        const response = await fetch(url);
        if(response.ok) {
            const data = response.json();
            return data;
        } else {
            return {};
        }
    }
}