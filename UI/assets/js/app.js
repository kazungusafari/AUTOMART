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
  
const getCarModels = () =>{
  const carMakeSelect = document.getElementById('car-make');
  const carModelSelect = document.getElementById('car-model');
  const carMakeSelectedValue = carMakeSelect.options[carMakeSelect.selectedIndex].value;

  if (carMakeSelectedValue == "Audi"){
      carModelSelect.options.length=0;
      carModelSelect.options[0] = new Option('Select Audi Model', '');
      carModelSelect.options[1] = new Option('A1', 'A1');
      carModelSelect.options[2] = new Option('A3', 'A3');
      carModelSelect.options[3] = new Option('A4', 'A4');
      carModelSelect.options[4] = new Option('A5', 'A5');
      carModelSelect.options[5] = new Option('A6', 'A6');
  }

  else if(carMakeSelectedValue == "Toyota"){
      carModelSelect.options.length=0;
      carModelSelect.options[0] = new Option('Select Toyota Model', '');
      carModelSelect.options[1] = new Option('1000', '1000');
      carModelSelect.options[2] = new Option('86', '86');
      carModelSelect.options[3] = new Option('Allex', 'Allex');
      carModelSelect.options[4] = new Option('Allion', 'Allion');
      carModelSelect.options[5] = new Option('Aqua', 'Aqua');
  }
  else if(carMakeSelectedValue == "Honda"){
      carModelSelect.options.length=0;
      carModelSelect.options[0] = new Option('Select Honda Model', '');
      carModelSelect.options[1] = new Option('1300', '1300');
      carModelSelect.options[2] = new Option('Accord', 'Accord');
      carModelSelect.options[3] = new Option('Acty', 'Acty');
      carModelSelect.options[4] = new Option('Airwave', 'Airwave');
      carModelSelect.options[5] = new Option('Grace', 'Grace');
  }

  else if (carMakeSelectedValue == "Suzuki"){
      carModelSelect.options.length=0;
      carModelSelect.options[0] = new Option('Select Suzuki Model', '');
      carModelSelect.options[1] = new Option('Alto', 'Alto');
      carModelSelect.options[2] = new Option('Baleno', 'Baleno');
      carModelSelect.options[3] = new Option('Carry', 'Carry');
      carModelSelect.options[4] = new Option('Kizashi', 'Kizashi');
      carModelSelect.options[5] = new Option('Ignis', 'Ignis');
  }
  else if(carMakeSelectedValue == "Ford"){
      carModelSelect.options.length=0;
      carModelSelect.options[0] = new Option('Select Ford Model', '');
      carModelSelect.options[1] = new Option('4600', '4600');
      carModelSelect.options[2] = new Option('4610', '4610');
      carModelSelect.options[3] = new Option('Focus', 'Focus');
      carModelSelect.options[4] = new Option('Explorer', 'Explorer');
      carModelSelect.options[5] = new Option('Mustang', 'Mustang');
  }

  else if (carMakeSelectedValue == "Land Rover"){
      carModelSelect.options.length=0;
      carModelSelect.options[0] = new Option('Select Land Rover Model', '');
      carModelSelect.options[1] = new Option('109', '109');
      carModelSelect.options[2] = new Option('Defender', 'Defender');
      carModelSelect.options[3] = new Option('Discovery', 'Discovery');
      carModelSelect.options[4] = new Option('Defender 120', 'Defender 120');
      carModelSelect.options[5] = new Option('Defender 130', 'Defender 130');
  }
  else if (carMakeSelectedValue == "BMW"){
      carModelSelect.options.length=0;
      carModelSelect.options[0] = new Option('Select BMW model', '');
      carModelSelect.options[1] = new Option('1 Series', '1 series');
      carModelSelect.options[2] = new Option('116i', '116i');
      carModelSelect.options[3] = new Option('118i', '118i');
      carModelSelect.options[4] = new Option('120i', '120i');
      carModelSelect.options[5] = new Option('2 series', '2 series');
  }
  else{
      carModelSelect.options.length=0;
      carModelSelect.options[0] = new Option('Select Car Make', '');

  }
}


