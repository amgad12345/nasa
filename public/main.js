const main = () => {
  getimg()
  gettingmission()
}

let imgdata
let missiondata
let i = -1

// garbs iamge from url 
const getimg = async () => {
  console.log('getting img')

  const Response1 = await fetch(
    'https://sdg-astro-api.herokuapp.com/api/Nasa/apod'
  )
  imgdata = await Response1.json()
  displayData(imgdata)
}
// displays image with copyright underneath
const displayData = imgdata => {
  console.log('in display data')
  const imagev = document.createElement('img')
  imagev.src = imgdata.url
  document.querySelector('.img1').appendChild(imagev)
  const copyright =
    'copyright:' + imgdata.copyright + ' | ' + ' title: ' + imgdata.title
  document.querySelector('.copyright').textContent = copyright
}
//grabs mission discription from url
const gettingmission = async () => {
  console.log('gettig mission')
  const Response2 = await fetch(
    'https://sdg-astro-api.herokuapp.com/api/SpaceX/launches/upcoming'
  )
  missiondata = await Response2.json()
  displayData2()
}
// displays mission data  and makes sure next mission it doesnt go over 20 t avoid blank clicks 
const displayData2 = () => {
  
if (i < 0 ) {

i = 0  
} else if  (i > missiondata.length - 1 ) {

i = missiondata.length - 1

}else {

  i++

}
 
//putting text on scream 
  let missionname = missiondata[i].mission_name
  let details = missiondata[i].details
  let launchdataunix = missiondata[i].launch_data_unix
  let launchsite = missiondata[i].launch_site.site_name_long
  console.log(details)
  document.querySelector('.mission-name').textContent = missionname
  document.querySelector('.mission-info').textContent = details
  document.querySelector('.launch-data_unix').textContent = launchdataunix
  document.querySelector('.launch-data_unix').textContent = launchsite

  if (details == null){
      
  document.querySelector('.mission-info').textContent ='No decription available yet'

   }


}


// displays previos mission makes sure index doesnt go below sero avoiding blank clicks
  const displaypreviosmission = () => {
  if (i < 0 ) {

    i = 0  
    } else if (i > missiondata.length - 1 ) {
    
    i = missiondata.length - 1
    
    }else{   
      i--
    } 

  console.log(i)
  let missionname = missiondata[i].mission_name
  let details = missiondata[i].details
  let launchdataunix = missiondata[i].launch_data_unix
  let launchsite = missiondata[i].launch_site.site_name_long
  

  document.querySelector('.mission-name').textContent = missionname
  document.querySelector('.mission-info').textContent = details
  document.querySelector('.launch-data_unix').textContent = launchdataunix
  document.querySelector('.launch-data_unix').textContent = launchsite
  if (details == null){
      
  document.querySelector('.mission-info').textContent ='no decription available yet'

   }

}

document.querySelector('.rightbutton').addEventListener('click', displayData2)
document
  .querySelector('.leftbutton')
  .addEventListener('click', displaypreviosmission)


// high lights li on click 

let ul = document.getElementById("list");
let listItems = ul.getElementsByTagName("li");

for(ul of  listItems){
  ul.addEventListener('click', function(){
    if(this.classList.contains('active')){
      this.classList.remove("active");
    } else {
      this.classList.add("active");
    }
  })
}
 

document.addEventListener('DOMContentLoaded', main)
