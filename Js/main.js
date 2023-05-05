
//  SEPETE EKLE

const cart_btn = document.getElementsByClassName("add-btn");
const delete_btn = document.getElementsByClassName("delete");
const navbar = document.getElementById("nav");

eventListener();

function eventListener(){
  window.addEventListener("load",function(){
    let page = window.location.pathname;
    if (page ==`/cart.html`)
    FillSepetimTable();
    for (let i=0; i<cart_btn.length; i++) cart_btn[i].addEventListener("click",AddCart);
  })

}
// butona tıkladığımda çalışacak kod
function AddCart(e){
  let id=e.target.name;
  let price = parseInt(document.getElementById("u-price-"+id).innerText.split(" ")[0]);
  let count = parseInt(document.getElementById("p-count-"+id).value);
  let cart ={
    product_name:document.getElementById("u-name-"+id).innerText,
    product_price:price,
    prodcut_count:count,
    total_price:price*count
  }
  AddCartsToStorage(cart);
  ShowAlert("success","Ürün sepetinize eklendi...");
}

//  Local storage veri çekme

function GetCartsFromStorage(){
  let carts;
  if(localStorage.getItem("carts")===null)carts=[];
  else carts=JSON.parse(localStorage.getItem("carts"));

  return carts;
}

// Local storage veri ekleme

function AddCartsToStorage(data){
  let carts = GetCartsFromStorage();
  carts.push(data);
  localStorage.setItem("carts",JSON.stringify(carts));
}

// Local Storage veri silme

function DeleteCartsFromStorage(id){
  let carts = GetCartsFromStorage();
  carts.splice(id,1);
  localStorage.setItem("carts",JSON.stringify(carts));
  FillSepetimTable();
}

// Ürün eklendiğindeki bildirim

function ShowAlert(type,message){
let div = document.createElement("div");
div.className = "alert alert-"+type;
div.textContent = message;
let a = document.createElement("a");
a.className ="alert-link";
div.appendChild(a)
navbar.appendChild(div);
setTimeout(() => {
  div.remove()
}, 2000);
}


function FillSepetimTable(){
  let html = ``;
  let carts = GetCartsFromStorage();

  for (let i = 0; i<carts.length;i++){
    html+=`<tr>`+
    `<td>`+carts[i].product_name+`</td>`+
    `<td>`+carts[i].product_count+`</td>`+
    `<td>`+carts[i].product_price+`</td>`+
    `<td>`+carts[i].total_price+`</td>`+
    `<td> 
    <i class="fas fa-trash delete" onclick="DeleteCartsFromStorage(`+i+`)</i>
    </td>`+
    `</tr>`

  document.getElementById("get-Urun").innerHTML=html;
  }
}