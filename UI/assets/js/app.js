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

    audiModels = ['a1','a2','a3','a4','a5'];
    bmwModels = ['1 Series','116i','118i','120i','2 series']
    toyotaModels = ['1000','86','Allex','Allion','Aqua'];
    hondaModels = ['Accord','Acty','Airwave','Grace','1300']
    suzukiModels = ['Alto','Baleno','Carry','Kizashi','Ignis']
    landRoverModels = ['Defender','Discovery','Defender 120','Defender 130','109']
    fordModels = ['4600','4610','Focus','Explorer','Mustang']
    const carMakeSelect = document.getElementById('car-make');
    const carModelSelect = document.getElementById('car-model');
    const carMakeSelectedValue = carMakeSelect.options[carMakeSelect.selectedIndex].value;
     
    const makeOptions = (models) =>{
        models.forEach((model,index) => {
            carModelSelect.options[index + 1] = new Option(model, model);
        });
    }
    
    const carModelsOptions = (make,models) =>{
        carModelSelect.options.length=0;
        carModelSelect.options[0] = new Option(`Select ${make} Model`, '');
        makeOptions(models);
    }

    if (carMakeSelectedValue == "Audi"){
        carModelsOptions('Audi',audiModels);
        
    }
  
    else if(carMakeSelectedValue == "Toyota"){
        carModelsOptions('Toyota',toyotaModels);
        
    }
    else if(carMakeSelectedValue == "Honda"){
        carModelsOptions("Honda",hondaModels);
        
    }
  
    else if (carMakeSelectedValue == "Suzuki"){
        carModelsOptions("Suzuki",suzukiModels);
        
    }
    else if(carMakeSelectedValue == "Ford"){
        carModelsOptions("Ford",fordModels);
        
    }
  
    else if (carMakeSelectedValue == "Land Rover"){
        carModelsOptions("Land Rover",landRoverModels);
        
    }
    else if (carMakeSelectedValue == "BMW"){
        carModelsOptions("BMW",bmwModels);
        
    }
    else{
        carModelSelect.options.length=0;
        carModelSelect.options[0] = new Option('Select Car Make', '');
    
    }

   
  }
  


  


