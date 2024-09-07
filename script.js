//image Api : https://pixabay.com/api/?key=40641193-622f771492d164f7e8da31b68&q=single+apple&image_type=photo&pretty=true
// fruts APi:https://www.fruityvice.com/api/fruit/all

//'https://pixabay.com/api/?key=40641193-622f771492d164f7e8da31b68&q=single+apple&image_type=photo'

let cartList=[]

let toggle_button=document.getElementById('toggle-button')
let toggle_button_2=document.getElementById('navbarSupportedContent')


function navivateLocation(loc){
    location = loc;
    collapsData=document.querySelectorAll('.nav-item')
    for(let local=0;local<collapsData.length;local++){
        collapsData[local].setAttribute("data-bs-toggle", "collapsed")
    }
   
}
function collapsMode(){
    collapsData=document.querySelectorAll('.nav-item')
    for(let local=0;local<collapsData.length;local++){
        collapsData[local].setAttribute("data-bs-toggle", "collapse")
    }
    
}
async function fetch_find_fruits(makecards){
    try{
      const response=await fetch('./fruts.json')
      const data= await response.json()
      makecards(data)
    //   console.log(data)
    }catch{
      console.log("faild to featch ")
    }
}
async function fetch_find_image(fruit ,op){
    // console.log(fruit)

    try{
      const response=await fetch(`https://pixabay.com/api/?key=40641193-622f771492d164f7e8da31b68&q=${op}${fruit}&image_type=photo`)
      let data= await response.json()
      data=data.hits
    //   makecards(data)
        // let img=data[Math.floor(Math.random()*data.length)]
        let img=data[0].webformatURL
    //   console.log(img)
      return img
    
    }catch{
      console.log("faild to featch")
      return "" 
    //   fetch_find_image(fruit,"a+fruit+")
    }
}
// fetch_find_fruits()
// fetch_find_image('passion+fruit')
async function randomCards(data){
    let best=document.querySelector('.bestProducts')
    // console.log('random')
    // console.log(data[0])
    // let randomItem=[]
    for(let i =0;i<3;i++){
        
        // randomItem.push( data[Math.floor(Math.random()*data.length)]);
        let itom =data[Math.floor(Math.random()*data.length)]
        // console.log(fetch_find_image(itom.name))
        let htmlCommand=`
        <div class="custome-cards shadow">
            <div>
            <div class="card-image">
                <img src=${await fetch_find_image(itom.name,'cut+')}>
            </div>
            <div class='card-content'>
                <h3>${itom.name}</h3>
                <ul>
        `
           
                for(it in itom.nutritions){
                    // console.log(it)
                    // console.log(itom.nutritions[it])
                    htmlCommand+=`<li><span>${it}</span><span>${itom.nutritions[it]}</span></li>`
                }
htmlCommand+= `</ul>
</div>
</div>
<div class='card-button'>
    <input  type="button" value="Add cart" onclick=addToCart('${itom.name}') />
   
</div>
</div>
        `
        // console.log(htmlCommand)
        best.insertAdjacentHTML("afterbegin",htmlCommand)
    }
    // console.log(randomItem)
}


// fetch_find_image('passion+fruit')
async function fetchAllCard(data){
    let best=document.querySelector('.all-cards')
    // console.log('random')
    // console.log(data[0])
    // let randomItem=[]
    for(let i =0;i<data.length;i++){
        
        // randomItem.push( data[Math.floor(Math.random()*data.length)]);
        let itom =data[i]
        // console.log(fetch_find_image(itom.name))
        let htmlCommand=`
        <div class="custome-cards shadow">
         <div>
            <div class="card-image">
                <img src=${await fetch_find_image(itom.name,'cut+')}>
            </div>
            <div class='card-content'>
                <h3>${itom.name}</h3>
                <ul>
        `
           
                for(it in itom.nutritions){
                    // console.log(it)
                    // console.log(itom.nutritions[it])
                    htmlCommand+=`<li><span>${it}</span><span>${itom.nutritions[it]}</span></li>`
                }
htmlCommand+= `</ul>
            </div>
        </div>
            <div class='card-button'>
                <input  type="button" value="Add cart" onclick=addToCart('${itom.name}') />
               
            </div>
        </div>

        `
        // console.log(htmlCommand)
        best.insertAdjacentHTML("afterbegin",htmlCommand)
    }
    // console.log(randomItem)
}
function addToCart(fname){
    let qty = prompt(`QTY OF ${fname}:`, 1);
    console.log(fname)
    console.log(qty)
    index=cartList.map((x)=>x.name).indexOf(fname)
    if (index==-1){
        let obj={
            quntaty:parseFloat(qty),
            name:fname
        }
        // console.log(obj)
        cartList.push(obj)
    }else{
        // let cureentQuntaty=parseFloat(cartList[index].quntaty)
        // let newQty=cureentQuntaty+parseFloat(qty)
        let newQty=cartList[index].quntaty+parseFloat(qty)
        if(newQty<0)
            newQty=0
        cartList[index].quntaty=newQty
    }
    
    
    console.log(cartList)
    
}
function search_flower() {
    
    location='#fruits' 
    let input = document.querySelector('.searchElement').value 
    input=input.toLowerCase(); 
    console.log(input)
    let x = document.getElementsByClassName('custome-cards'); 
      
    for (i = 0; i < x.length; i++) {  
        if (!x[i].innerHTML.toLowerCase().includes(input)) { 
            x[i].style.display="none"; 
        } 
        else { 
            x[i].style.display="list-item";                  
        } 
    } 
    document.querySelector('.searchElement').focus()
} 
function loadHomePage(){
   
    fetch_find_fruits(randomCards)
    fetch_find_fruits(fetchAllCard)
   
}
// fetch('https://www.fruityvice.com/api/fruit/all')
//   .then(response => response.json())
//   .then(data => console.log(data));