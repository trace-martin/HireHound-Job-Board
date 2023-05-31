// var search = "software engineer"
// var url = "https://findwork.dev/api/jobs/?search=" + search + "&sort_by=relevance"
// var APIkey = "ad071e8f8657e5d2c2f7c81df115cb1de1eb4063"
// fetch (url, {
//     headers: {Authorization: "Token " + APIkey,"Access-Control-Allow-Origin":"*"}
// })
// . then (function (res){
//     return res.json()
// })
// . then (function (data){
//     console.log (data)
// })

const fetch = require('node-fetch');

const searchJobs = async (searchText) => {
    const baseUrl = 'https://findwork.dev/jobs';
    const queryParam = new URLSearchParams({q: searchText})//text to filter search by
});

const url = $(baseUrl)?$(queryParam);

try {
    const response = await fetch(url);
    if(response.ok){
        const data = await response.json();
        //process the data or perform further operations
        console.log(data);
    }else{
    console.error('Request failed with status:', response.status)
    }
}catch (error){
    console.error('A')

}

//Usage
searchJobs('web developer');