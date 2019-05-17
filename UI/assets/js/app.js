const closeAcceptOrderBtn = () =>{
    document.getElementById("accept-order-modal").style.display = "none";
}
const closeRejectOrderBtn = () => {
    document.getElementById("reject-order-modal").style.display = "none";
}
const  rejectOrder = () => {
    document.getElementById("reject-order-modal").style.display = "block";
}
const acceptOrder = () => {
    document.getElementById("accept-order-modal").style.display = "block";
} 
const  updatePrice = () => {
    document.getElementById("update-price-modal").style.display = "block";
}
const closeUpdatePriceModal = () => {
  document.getElementById("update-price-modal").style.display = "none";
}
const  markAsSold = () =>{
  document.getElementById("mark-ad-as-sold-modal").style.display = "block";
}
const  markAsFraudulent = () =>{
    document.getElementById("mark-ad-as-fraudelent-modal").style.display = "block";
  }
 const  closeMarkAsFraudulent = () =>{
    document.getElementById("mark-ad-as-fraudelent-modal").style.display = "none";
 }
const closeBuyCarModal = () => {
    document.getElementById("buy-car-modal").style.display = "none";
  }
const  buyCar = () =>{
    document.getElementById("buy-car-modal").style.display = "block";
}
const closeMarkAsSold = () =>{
  document.getElementById("mark-ad-as-sold-modal").style.display = "none";
}
const openFiltersMenu = () => {
    document.getElementById("filters").style.display = "block";
}
  
const  closeFiltersMenu = () =>{
    document.getElementById("filters").style.display = "none";
}
  


