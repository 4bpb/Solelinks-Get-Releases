var rp = require('request-promise');
const fs = require('fs');
let base_url = "https://solelinks.com/api/releases/"

function getrelease(url){
    rp(url)
    .then(function (htmlString) {
        let json = JSON.parse(htmlString);
        
        let id = json.data.id
        let title = json.data.title
        let release_date = json.data.release_date
        let title_image_url = json.data.title_image_url
        let style_code = json.data.style_code
        let price = json.data.price
        let color = json.data.color

        //console.log("title: "+title)
        //console.log("release_date: "+release_date)
        //console.log("title_image_url: "+title_image_url)
        //console.log("style_code: "+style_code)
        //console.log("price: "+price)
        //console.log("color: "+color)


        let release_array2 = []


        let x = 0;
        while(x<json.data.release_retailers.length){
            let retailer = json.data.release_retailers[x].retailer.name
            let retailer_url = json.data.release_retailers[x].retailer.link
            //console.log(retailer+" : "+retailer_url)
            release_array2.push(retailer)
            release_array2.push(retailer_url)
            x++
        }



        let release_array = {
            "id": id,
            "title": title,
            "release_date": release_date,
            "title_image_url": title_image_url,
            "style_code": style_code,
            "price": price,
            "color": color,
            'retailers': release_array2
        }

        let datatofile = JSON.stringify(release_array);



        fs.appendFile('releases.json', datatofile, (err) => {
            if (err) throw err;
            console.log('New release ID added :'+ id);
        });




        //fs.appendFile('releases.json', datatofile);
        //console.log(release_array)
    })
    .catch(function (err) {
        console.log("No Releases found : "+ url)
    });     
}



function main(){
    let y = 0
    let max = 10000
    while(y<max){
        getrelease(base_url+y)
        y++
    }

}

main()