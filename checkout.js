orderListData = JSON.parse(window.localStorage.getItem('orderList'));
let totalPrice = 0;
let cartCount = 0;
let orderListArray = JSON.parse(window.localStorage.getItem('orderList'));
if(orderListArray!==null){
  for(let i=0;i<orderListArray.length;i++){
    cartCount += orderListArray[i].count; 
  }
}
$('#cart-count').text(cartCount);
/*<div class="checkout-card">
    <div>
        <img class="checkout-product-img" src="https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/10122083/2019/6/24/e533a691-3908-41b0-8307-1928a37d4ec41561362162650-Samsung-Galaxy-Fit-4801561362161527-1.jpg">
    </div>
    <div>
    <h4>Unisex Black Galaxy Fit Fitness Band</h4>
        <p>x1</p>
        <p><span>Amount: Rs </span><span>9990</span></p>
    </div>
</div> */
function createOrderProductList (data) {
    var checkoutCard = $('<div>');
    checkoutCard.addClass('checkout-card');
    var innerDiv1 = $('<div>');
    var thumbnail = $('<img>');
    thumbnail.addClass('checkout-product-img');
    thumbnail.attr('src', data.preview);
    innerDiv1.append(thumbnail);
    var innerDiv2 = $('<div>');
    innerDiv2.append($('<h4>').text(data.name));
    innerDiv2.append($('<p>').text('x'+data.count));
    innerDiv2.append($('<p>').html('<span>Amount : Rs </span><span>'+data.price+'</span>'));
    checkoutCard.append(innerDiv1,innerDiv2);
    $('#card-list').append(checkoutCard);   
}
if(orderListData !== null){
    for(let i=0;i<orderListData.length;i++){
    createOrderProductList(orderListData[i]);
    totalPrice += orderListData[i].price;
}
}

var cardList = document.getElementById('card-list');
$('#item-count').text(cardList.childElementCount-1);
$('#total-amount').text(totalPrice);
$('#btn-place-order').click(function(){
    window.localStorage.clear();
});

