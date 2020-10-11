var rp = require('request-promise');
let base_url = "https://solelinks.com/api/releases/"

function getrelease(url){
    rp(url)
    .then(function (htmlString) {
        let json = JSON.parse(htmlString);
        

        let title = json.data.title
        let release_date = json.data.release_date
        let title_image_url = json.data.title_image_url
        let style_code = json.data.style_code
        let price = json.data.price
        let color = json.data.color

        console.log("title: "+title)
        console.log("release_date: "+release_date)
        console.log("title_image_url: "+title_image_url)
        console.log("style_code: "+style_code)
        console.log("price: "+price)
        console.log("color: "+color)


        let x = 0;
        while(x<json.data.release_retailers.length){
            let retailer = json.data.release_retailers[x].retailer.name
            let retailer_url = json.data.release_retailers[x].retailer.link
            console.log(retailer+" : "+retailer_url)
            x++
        }
        
    })
    .catch(function (err) {
        console.log("error on "+ url)
    });     
}



function main(){
    let y = 0
    let max = 50
    while(y<max){
        getrelease(base_url+y)
        y++
    }

}

main()