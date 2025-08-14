const display = {
  returnPage(){
    if(purchasesMade){
      document.querySelector('.no-orders').classList.add('hide');
      document.getElementById('back-to-home-page').classList.add('hide');
      for(let i = 1 ; i<= purchasesMade ; i++){
        document.getElementById('buyed-orders-container').innerHTML += `
          <div class="orders-element" id="purchases-${i}">
            <div class="buyed-orders-details">
                    <div class="display-aside">
                      <div>
                        <span class="first-section-buyed-ordered-details">Order Placed:</span><br>${months[(new Date()).getMonth()] +': '+(new Date()).getDate()}
                      </div>
                      <div>
                        <span class="first-section-buyed-ordered-details">Total:</span><br>$${totalPrice[i-1]}
                      </div>
                    </div>
                    <div><span class="first-section-buyed-ordered-details">Order Id : </span><br>${generateRandomWord()}</div>
                  </div>
          </div>`
        document.getElementById('purchases-'+i).style.order = purchasesMade -i+1 ;
        allBuyedOrders[i].forEach((val)=>document.getElementById('purchases-'+i).innerHTML+=val);
        }}
  },
      allBody(rtd){
        setTimeout(()=>{
          document.body.classList.remove('hide')},rtd)
      },
      updateVotesOfItmes(){
        for(let i = 1 ; i<= numberOfProductInTheMoment ; i++){
          if (votes.sumOfVotes(i)){
          document.getElementById(`item-rating-container-${i}`).innerHTML = `<img src="images/rating-${votes.getGeneralRating(i)*10}.png" class="item-rating-image" id="item-1-image">
          <div class="items-number-of-votes"  id="item-1-number-of-votes">${votes.sumOfVotes(i)}</div>`}

        }
      },
      updateBuyedItmes(itm){
        if(itm && document.getElementById('display-number-of-buyed-itmes') ){document.getElementById('display-number-of-buyed-itmes').innerText = itm}
      },
      updateHeadIcons(){
      if(smallWidth) {document.getElementById('first-section').innerHTML = `<img src="images/small-logo.png" id="small-logo" onclick="clicks.homePage()">`;
        document.getElementById('right-section').innerHTML='<img src="images/menu.png" id="settings" onclick="clicks.openMenu()">';
      }
      else{
        document.getElementById('first-section').innerHTML = `<img src="images/logo.png" id="logo" onclick="clicks.homePage()">`;
        document.getElementById('right-section').innerHTML=`<button id="option1" onclick="clicks.returnsPage()">Returns<p id="tt">& Orders</p></button>
      <div class="container" onclick="clicks.checkOutsPage()"><img src="images/cart-icon.png" id="cart-icon"><div id="display-number-of-buyed-itmes">${itemsBuyed}</div><span id="cart-text">Cart</span></div>`;
        smallWidth = false;
      }
      window.addEventListener('resize',()=>{
        if(window.innerWidth < 574 && !smallWidth) {
          document.getElementById('first-section').innerHTML = `<img src="images/small-logo.png" id="small-logo" onclick="clicks.homePage()">`;
          document.getElementById('right-section').innerHTML='<img src="images/menu.png" id="settings" onclick="clicks.openMenu()">';
          smallWidth=true ;
        }
        else if (window.innerWidth >= 575 && smallWidth){
          document.getElementById('first-section').innerHTML = `<img src="images/logo.png" id="logo" onclick="clicks.homePage()">`;
          document.getElementById('right-section').innerHTML=`<button id="option1" onclick="clicks.returnsPage()">Returns<p id="tt">& Orders</p></button>
      <div class="container" onclick="clicks.checkOutsPage()"><img src="images/cart-icon.png" id="cart-icon"><div id="display-number-of-buyed-itmes">${itemsBuyed}</div><span id="cart-text">Cart</span></div>`;
        smallWidth = false;
        }
      })},
    }
const votes ={
  initialize(){
    if(  !localStorage.getItem('votes')){
      const arr = []
      for(let i = 1 ; i<= numberOfAllProducts ; i++){
        arr.push({v10 :  randint(150,450) , v9 :  randint(80,100) , v8 :  randint(10,100) , v7 :  randint(10,100) ,v6 :  randint(10,100) ,v5 :  randint(10,100) ,v4 :  randint(10,100) ,v3 :  randint(10,100) ,v2 :  randint(10,100) ,v1 :  randint(10,100) ,v0 :  randint(10,100)});
      }
      arr[arr.length-1].v10 = 5000;
      localStorage.setItem('votes',JSON.stringify(arr));
      return arr ;}},
  sumOfVotes(item){
    let sum = 0
    for (let prop in allProductsInfo.vote[item-1] ){
      sum = sum + allProductsInfo.vote[item-1][prop]
    }
    return sum
  },
  getGeneralRating(item){
    let sum =0 ;
    for (let prop in allProductsInfo.vote[item-1] ){
      sum = sum + Number(prop.slice(1,prop.length))*allProductsInfo.vote[item-1][prop]
    }
    const res = ((sum)/votes.sumOfVotes(item))||0
    return (Math.round(res))/2
  }
}
const clicks = {
  buyAgain(item,element){
    timeOutMsgBuyId[element]=[];
    clearTimeout(timeOutMsgBuyId[element][item]);
    document.getElementById(`buy-again-item-${item}-element-${element}`).innerHTML = '✓ Added' ;
    timeOutMsgBuyId[element][item]= setTimeout(()=>{document.getElementById(`buy-again-item-${item}-element-${element}`).innerHTML='<img src="images/buy-again.png" class="buy-again-img"><span id="buy">Buy it again</span>'},1500);
    itemsBuyed++ ;
    allOrderedProductsQuantity[item-1]++;
    localStorage.setItem('buyedItemQuantity',JSON.stringify(allOrderedProductsQuantity));
    localStorage.setItem('buyedItem',itemsBuyed);
    display.updateBuyedItmes(itemsBuyed);
    clicks.addNewOrder(item);
  },
  openMenu(){
    if(!showedOptions){
      showedOptions = true ;
      document.querySelector('.options-small').classList.remove('hide-option');
      document.querySelector('.options-small').classList.remove('hide');
      document.querySelector('.options-small').classList.add('show-option');
      document.getElementById('buyedItems').innerText = itemsBuyed ;
    }
    else{document.querySelector('.options-small').classList.add('hide-option');
         document.querySelector('.options-small').classList.remove('show-option');
        showedOptions = false}
  },
    homePage(){
      window.location.href = 'index.html'
    },
    checkOutsPage(){
      window.location.href = 'checkOuts.html';
      
    },
    returnsPage(){
      window.location.href = 'returns.html';
    },
    trackingPage(item,text,delivery,quantity){
      localStorage.setItem('trackingData',JSON.stringify([item,text,delivery,quantity]))
      window.location.href = 'tracking.html';
    },
    addNewItemsToCart(item){
     clearTimeout(timeOutMsgAddId[item]);
      document.getElementById('added-message-item-'+item).classList.remove('noMsg');
        document.getElementById('checkmark-image-'+item).classList.remove('hide');
       timeOutMsgAddId[item] = setTimeout(()=>{
       document.getElementById('added-message-item-'+item).classList.add('noMsg');
       document.getElementById('checkmark-image-'+item).classList.add('hide');
      },2000)
      itemsBuyed += Number(document.getElementById('selector-items-'+item).value);
      allOrderedProductsQuantity[item-1] += Number(document.getElementById('selector-items-'+item).value);
      localStorage.setItem('buyedItemQuantity',JSON.stringify(allOrderedProductsQuantity));
      localStorage.setItem('buyedItem',itemsBuyed)
      //console.log(localStorage)
      display.updateBuyedItmes(itemsBuyed);
      clicks.addNewOrder(item);
      //console.log(allOrderedProductsId)
      // //console.log(itemsBuyed,allOrderedProducts,allBuyedOrders)
      
    },
  createNewItem(nTime){
    for(let d = numberOfProductInTheMoment ; d<nTime;d++){
      numberOfProductInTheMoment++
      document.getElementById('allItems').innerHTML += `
      <div class="item"><div class="item-image-container"><img src="${allProductsInfo.images[d]}" class="item-image"></div>
        <div class="item-text-container"><span class="item-text">${allProductsInfo.text[d]}</span></div>
        <div class="item-rating-container" id="item-rating-container-${numberOfProductInTheMoment}">

        </div>
        <div class="item-price" id="item-${numberOfProductInTheMoment}-price">
            $${allProductsInfo.price[d]}
        </div>
        <div class="select-number-of-tobuy-items">
          <select class="selector-items" id="selector-items-${numberOfProductInTheMoment}">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
            <option>9</option>
            <option>10</option>
          </select>
          </div>
          <div class="add-to-cart-message noMsg" id="added-message-item-${numberOfProductInTheMoment}"><img src="images/checkmark.png" class="checkmark hide" id="checkmark-image-${numberOfProductInTheMoment}">Added</div>
          <div class="add-to-cart-button-container">
            <button class="add-to-cart-button" id="add-to-cart-button-item-${numberOfProductInTheMoment}" onclick="clicks.addNewItemsToCart(${numberOfProductInTheMoment})">Add to Cart</button>
          </div>
        </div>`
   }
  },
  orderDeliveryOption(nb,item){
    document.getElementById(`input-option-${nb}-item-${item}`).checked  = true ;
    document.getElementById(`input-option-${(nb+1)%3}-item-${item}`).checked  = false ;
    document.getElementById(`input-option-${(nb+2)%3}-item-${item}`).checked  = false ;
    document.getElementById(`order-${item}-title-delivery-date`).innerText = 'Delivery date: '+document.getElementById(`delivery-time-option-${nb}-item-${item}`).innerText
    shippingPrice[item-1]=array[nb]
    document.getElementById('ordered-items-shipping').innerText= '$'+(shippingPrice.reduce((acc,val)=>acc+val,0)).toFixed(2)
    localStorage.setItem('shippingPrice',JSON.stringify(shippingPrice));
    document.getElementById('ordered-items-total-before-tax').innerText = '$'+(Number(document.getElementById("ordered-items-pricing").innerText.slice(1,100))+Number(document.getElementById('ordered-items-shipping').innerText.slice(1,100))).toFixed(2);
    document.getElementById("ordered-items-total-tax").innerText = '$'+(Number(document.getElementById('ordered-items-total-before-tax').innerText.slice(1,100))/10).toFixed(2);
    document.getElementById("ordered-items-total-price").innerText = '$'+(Number(document.getElementById('ordered-items-total-tax').innerText.slice(1,100))+Number(document.getElementById('ordered-items-total-before-tax').innerText.slice(1,100))).toFixed(2);
    totalPrice[purchasesMade]=(Number(document.getElementById("ordered-items-total-price").innerText.slice(1,100)));
    localStorage.setItem('totalPrice',JSON.stringify(totalPrice));
  },
  addNewOrder(item){
    if (allOrderedProductsId.indexOf(item)==-1){
        allOrderedProductsId.unshift(item);
        allOrderedProducts.unshift(`

              <div class="order" id="order-item-${item}">
                <div id="order-${item}-title-delivery-date" class="order-title-delivery-date">Delivery date: Friday, August 15</div>
                <div class="order-display">
                  <div class="right-section">
                    <div class="order-image-container"><img src="images/products/product${item}.jpg" class="order-image"></div>
                    <div class="order-text-price-quantity">
                        <div class="order-text">${allProductsInfo.text[item-1]}</div>
                        <div class="order-price">$${allProductsInfo.price[item-1]}</div>
                        <div id="order-${item}-added-Quantity">Quantity: ${allOrderedProductsQuantity[item-1]} <span class="update-delete" onclick="clicks.deleteOrder(${item})"> Delete</span></div>
                    </div>
                  </div>
                  <div class="all-orders-delivery-option-conatainer">

                    <div class="order-delivery-option-conatainer"  onclick="clicks.orderDeliveryOption(0,${item})">
                      <input type="radio" class="delivery-input-option inp0" id="input-option-0-item-${item}"  checked>
                      <div>
                        <div class="delivery-time-text" id="delivery-time-option-0-item-${item}">Friday, August 15</div>
                        <div class="shipping-price">FREE shipping</div>
                      </div>
                    </div>
                    
                    <div class="order-delivery-option-conatainer"  onclick="clicks.orderDeliveryOption(1,${item})">
                      <input type="radio" class="delivery-input-option inp1" id="input-option-1-item-${item}">
                      <div>
                        <div class="delivery-time-text" id="delivery-time-option-1-item-${item}">Monday, August 10</div>
                        <div class="shipping-price">$4.75 shipping</div>
                      </div>
                    </div>

                    <div class="order-delivery-option-conatainer"  onclick="clicks.orderDeliveryOption(2,${item})">
                      <input type="radio" class="delivery-input-option inp2" id="input-option-2-item-${item}">
                      <div>
                        <div class="delivery-time-text" id="delivery-time-option-2-item-${item}">friday, August 01</div>
                        <div class="shipping-price">$9.99 shipping</div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
     `
  )}
  else{
    allOrderedProducts.splice(allOrderedProductsId.indexOf(item),1);
    allOrderedProductsId.splice(allOrderedProductsId.indexOf(item),1);
    clicks.addNewOrder(item);
  }
  localStorage.setItem('allOrderedProducts',JSON.stringify(allOrderedProducts));
  localStorage.setItem('allOrderedProductsId',JSON.stringify(allOrderedProductsId)) ;
},
buyOrders(){
  if (totalPrice[purchasesMade]){
    purchasesMade++ ;
    localStorage.setItem('purchases',purchasesMade);
    allBuyedOrders[purchasesMade] = [];
    allOrderedProductsId.forEach((item)=>allBuyedOrders[purchasesMade].unshift(`
  

                  <div class="buyed-order">
                    <div class="image-text-container">
                    <div class="buyed-order-image-container"><img src="images/products/product${item}.jpg" class="buyed-order-image"></div>
                    <div class="buyed-order-text">
                      <div class="limit-text-2-lines">${allProductsInfo.text[item-1]}</div>
                      <div class="normal-text" id="item-${item}-delivery-element-${purchasesMade}">Arriving on: ${array2[array.indexOf(shippingPrice[item-1])]}</div>
                      <div class="normal-text"  id="item-${item}-quantity-element-${purchasesMade}">Quantity: ${allOrderedProductsQuantity[item-1]}</div>
                      <button class="buy-again" id="buy-again-item-${item}-element-${purchasesMade}" onclick="clicks.buyAgain(${item},${purchasesMade})"><img src="images/buy-again.png" class="buy-again-img"><span id="buy">Buy it again</span></button>
                      <button class="Track-Package small-size" onclick="clicks.trackingPage(${item},'${allProductsInfo.text[item-1]}','${`Arriving on: ${array2[array.indexOf(shippingPrice[item-1])]}`}','${`Quantity: ${allOrderedProductsQuantity[item-1]}`}')">Track Package</button>
                    </div>
                    </div>
                    <button class="Track-Package" onclick="clicks.trackingPage(${item},'${allProductsInfo.text[item-1]}','${`Arriving on: ${array2[array.indexOf(shippingPrice[item-1])]}`}','${`Quantity: ${allOrderedProductsQuantity[item-1]}`}')" >Track Package</button>
                  </div>
                  
              `))
    //console.log(allOrderedProductsId)
    totalPrice.push(Number(document.getElementById("ordered-items-total-price").innerText.slice(1,100)));
    while (allOrderedProductsId.length){
      clicks.deleteOrder(allOrderedProductsId[0]);
    }
    localStorage.setItem('buyedOrders',JSON.stringify(allBuyedOrders));

  }
  else{
    document.getElementById('place-order').setCustomValidity('Please order some items first')
    document.getElementById('place-order').reportValidity()
  }
},
  deleteOrder(item){
    itemsBuyed-=allOrderedProductsQuantity[item-1];
    allOrderedProductsQuantity[item-1]=0 ; 
    shippingPrice[item-1]=0 ;
    localStorage.setItem('shippingPrice',JSON.stringify(shippingPrice))
    localStorage.setItem('buyedItem',itemsBuyed);
    localStorage.setItem('buyedItemQuantity',JSON.stringify(allOrderedProductsQuantity));
    document.getElementById('ordered-items-shipping').innerText=  '$'+(shippingPrice.reduce((acc,val)=>acc+val,0)).toFixed(2);
    document.getElementById('items-checkout').innerText = `${itemsBuyed} Items`;
    document.getElementById('pricing-text-item-number').innerText = itemsBuyed ;
    document.getElementById("ordered-items-pricing").innerText = '$'+(allOrderedProductsQuantity.reduce((acc,val,ind)=>acc+(val)*Number(allProductsInfo.price[ind]),0)).toFixed(2);
    document.getElementById('ordered-items-total-before-tax').innerText = '$'+(Number(document.getElementById("ordered-items-pricing").innerText.slice(1,100))+Number(document.getElementById('ordered-items-shipping').innerText.slice(1,100))).toFixed(2);
    document.getElementById("ordered-items-total-tax").innerText = '$'+(Number(document.getElementById('ordered-items-total-before-tax').innerText.slice(1,100))/10).toFixed(2);
    document.getElementById("ordered-items-total-price").innerText = '$'+(Number(document.getElementById('ordered-items-total-tax').innerText.slice(1,100))+Number(document.getElementById('ordered-items-total-before-tax').innerText.slice(1,100))).toFixed(2);
    totalPrice[purchasesMade]=(Number(document.getElementById("ordered-items-total-price").innerText.slice(1,100)));
    localStorage.setItem('totalPrice',JSON.stringify(totalPrice))
    allOrderedProducts.splice(allOrderedProductsId.indexOf(item),1);
    localStorage.setItem('allOrderedProducts',JSON.stringify(allOrderedProducts));
    allOrderedProductsId.splice(allOrderedProductsId.indexOf(item),1);
    localStorage.setItem('allOrderedProductsId',JSON.stringify(allOrderedProductsId)) ;

    
    document.getElementById('orders-container').innerHTML=`<dev id="no-buyed-items-container"  class="hide">
          <p id="emty-cart-msg">Your cart is emty.</p>
          <div id="button-container"  class="hide">
            <button id="back-to-home-page" onclick="clicks.homePage()">View Products</button>
            <button id="back-to-return-page" onclick="clicks.returnsPage()">View Purchases</button>
          </div>
        </dev>`;
    allOrderedProducts.forEach(val => document.getElementById('orders-container').innerHTML+= val);
    shippingPrice.forEach((val,ind)=>{ document.getElementById(`input-option-${array.indexOf(val)}-item-${ind+1}`) && (document.getElementById(`input-option-${array.indexOf(val)}-item-${ind+1}`).checked = true)})
    if (allOrderedProducts.length == 0){
      document.getElementById("no-buyed-items-container").classList.remove('hide');
      document.getElementById("button-container").classList.remove('hide');
    }

  }
}
function createImgArray(nb){
  const arr = []
  for (let i = 1 ; i<=nb ; i++){
    arr.push(`images/products/product${i}.jpg`)
  }
  return arr
}
function randint(min,max){
  return Math.floor(Math.random()*(max-min+1)+min)
}
function generateRandomWord(length = 8) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    result += chars[randomIndex];
  }
  return result;
}
const months = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
let showedOptions = false ;
const array = [0,4.75,9.99];
const array2 = ['Friday, August 15','Monday, August 10','friday, August 01'];
let totalPrice = JSON.parse(localStorage.getItem('totalPrice')) || [] ;
let itemsBuyed = Number(localStorage.getItem('buyedItem')) || 0 ;
let numberOfAllProducts = 42 ;
let shippingPrice = JSON.parse(localStorage.getItem('shippingPrice')) || Array(numberOfAllProducts).fill(0);
let smallWidth = window.innerWidth <575 ? true:false ;
let numberOfProductInTheMoment = 0 ;
let allOrderedProductsQuantity = JSON.parse(localStorage.getItem('buyedItemQuantity')) ||  Array(numberOfAllProducts).fill(0);
let allOrderedProducts = JSON.parse(localStorage.getItem('allOrderedProducts'))||[] ;
let allOrderedProductsId = JSON.parse(localStorage.getItem('allOrderedProductsId'))||[] ;
let allBuyedOrders =  JSON.parse(localStorage.getItem('buyedOrders')) || [0] ;
let purchasesMade = Number(localStorage.getItem('purchases')) || 0 ;
let timeOutMsgAddId = [0];
let timeOutMsgBuyId = [0];
let allProductsInfo = {text : ['Black and Gray Athletic Cotton Socks - 6 Pairs','Intermediate Size Basketball','Adults Plain Cotton T-Shirt - 2 Pack','2 Slot Toaster - Black','6 Piece White Dinner Plate Set','6-Piece Nonstick, Carbon Steel Oven Bakeware Baking Set','Plain Hooded Fleece Sweatshirt','Luxury Towel Set - Graphite Gray','Liquid Laundry Detergent, 110 Loads, 82.5 Fl Oz','Waterproof Knit Athletic Sneakers - Gray','Women\'s Stretch Popover Hoodie','Round Black Sunglasses',"Women's Two Strap Buckle Sandals - Tan","Blackout Curtains Set 4-Pack - Beige","Men's Slim-Fit Summer Shorts","Electric Glass and Steel Hot Tea Water Kettle - 1.7-Liter","Ultra Soft Tissue 2-Ply - 18 Box","Straw Lifeguard Sun Hat","Sterling Silver Sky Flower Stud Earrings","Bathroom Bath Rug Mat 20 x 31 Inch - Grey","Women's Knit Ballet Flat","Men's Regular-Fit Quick-Dry Golf Polo Shirt","Trash Can with Foot Pedal - Brushed Stainless Steel","Duvet Cover Set with Zipper Closure","Women's Chunky Cable Beanie - Gray","Men's Classic-fit Pleated Chino Pants","Men's Athletic Sneaker","Men's Navigator Sunglasses Pilot","Non-Stick Cookware Set, Pots, Pans and Utensils - 15 Pieces","Vanity Mirror with Heavy Base - Chrome","Women's Fleece Jogger Sweatpant","Double Oval Twist French Wire Earrings - Gold","Round Airtight Food Storage Containers - 5 Piece","Coffeemaker with Glass Carafe and Reusable Filter - 25 Oz, Black","Blackout Curtains Set 42 x 84-Inch - Black, 2 Panels","100% Cotton Bath Towels - 2 Pack, Light Teal","Women Waterproof Knit Athletic Sneakers - Pink","Countertop Blender - 64oz, 1400 Watts","10-Piece Mixing Bowl Set with Lids - Floral","2-Ply Kitchen Paper Towels - 30 Pack","Men's Full-Zip Hooded Fleece Sweatshirt","Pro head phone and mic - best quality"] , 
  images : createImgArray(numberOfAllProducts) ,
  price:['10.90','20.95','7.99','18.99','20.67','34.99','24.00','35.99','28.99','33.90','13.74','15.60','24.99','45.99','16.99','30.75','23.75','22.00','17.99','12.50','26.40','15.99','83.00','23.99','12.50','22.90','38.90','16.90','67.99','16.49','24.00','24.00','28.99','22.50','30.99','21.10','33.90','107.50','38.99','57.99','24.50','150.00'],
  vote : JSON.parse(localStorage.getItem('votes')) || votes.initialize()}