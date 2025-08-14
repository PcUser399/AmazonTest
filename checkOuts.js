document.getElementById('items-checkout').innerText = `${itemsBuyed} Items`;
console.log(itemsBuyed)
allOrderedProducts.forEach(val =>{ document.getElementById('orders-container').innerHTML+= val});
document.getElementById('pricing-text-item-number').innerText = itemsBuyed ;
document.getElementById("ordered-items-pricing").innerText = '$'+(allOrderedProductsQuantity.reduce((acc,val,ind)=>acc+(val)*Number(allProductsInfo.price[ind]),0)).toFixed(2);
document.getElementById('ordered-items-shipping').innerText=  '$'+(shippingPrice.reduce((acc,val)=>acc+val,0)).toFixed(2);
document.getElementById('ordered-items-total-before-tax').innerText = '$'+(Number(document.getElementById("ordered-items-pricing").innerText.slice(1,100))+Number(document.getElementById('ordered-items-shipping').innerText.slice(1,100))).toFixed(2);
document.getElementById("ordered-items-total-tax").innerText = '$'+(Number(document.getElementById('ordered-items-total-before-tax').innerText.slice(1,100))/10).toFixed(2);
document.getElementById("ordered-items-total-price").innerText = '$'+(Number(document.getElementById('ordered-items-total-tax').innerText.slice(1,100))+Number(document.getElementById('ordered-items-total-before-tax').innerText.slice(1,100))).toFixed(2);
totalPrice[purchasesMade] = (Number(document.getElementById("ordered-items-total-price").innerText.slice(1,100)))
if (allOrderedProducts.length == 0){
      document.getElementById("no-buyed-items-container").classList.remove('hide');
      document.getElementById("button-container").classList.remove('hide');
    }
else {
  document.getElementById("no-buyed-items-container").classList.add('hide');
  document.getElementById("button-container").classList.add('hide');
}