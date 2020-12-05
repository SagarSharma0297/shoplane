var mainProduct = document.getElementById('product');
let cartCount = 0;
let orderListArray = JSON.parse(window.localStorage.getItem('orderList'));
if(orderListArray!==null){
  for(let i=0;i<orderListArray.length;i++){
    cartCount += orderListArray[i].count; 
  }
}
$('#cart-count').text(cartCount);
/* var productData = {
    "id": "1",
    "name": "Men Navy Blue Solid Sweatshirt",
    "preview": "https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/7579188/2018/11/5/08a7b230-ee8f-46c0-a945-4e835a3c01c01541402833619-United-Colors-of-Benetton-Men-Sweatshirts-1271541402833444-1.jpg",
    "photos": [
      "https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/7579188/2018/11/5/08a7b230-ee8f-46c0-a945-4e835a3c01c01541402833619-United-Colors-of-Benetton-Men-Sweatshirts-1271541402833444-1.jpg",
      "https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/7579188/2018/11/5/efc3d5b9-1bb3-4427-af53-7acae7af98951541402833591-United-Colors-of-Benetton-Men-Sweatshirts-1271541402833444-2.jpg",
      "https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/7579188/2018/11/5/c7e58861-3431-4189-9903-9880f5eebd181541402833566-United-Colors-of-Benetton-Men-Sweatshirts-1271541402833444-3.jpg",
      "https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/7579188/2018/11/5/66490b64-32de-44b4-a6e4-fe36f1c040051541402833548-United-Colors-of-Benetton-Men-Sweatshirts-1271541402833444-4.jpg",
      "https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/7579188/2018/11/5/957be784-7c5d-4e90-ab9f-0928015b22891541402833645-United-Colors-of-Benetton-Men-Sweatshirts-1271541402833444-5.jpg"
    ],
    "description": "Navy solid sweatshirt with patchwork, has a round neck, long sleeves, straight hem",
    "size": [
      1,
      1,
      0,
      1,
      0
    ],
    "isAccessory": false,
    "brand": "United Colors of Benetton",
    "price": 2599
} */

function createProductPreview(productData){
    var leftColumn = document.createElement('div');
    leftColumn.className = 'left-column';
    var leftImgElement = document.createElement('img');
    leftImgElement.id = 'productImg';
    leftImgElement.src = productData.preview;
    leftImgElement.alt = 'Product Image';
    leftColumn.appendChild(leftImgElement);
        
    var rightColumn = document.createElement('div');
    rightColumn.className = 'right-column';
       
    var productDescription = document.createElement('div');
    productDescription.className = 'product-description';
    var addCartButtonDiv = document.createElement('div');
    addCartButtonDiv.className = 'btn';
    rightColumn.appendChild(productDescription);
    rightColumn.appendChild(addCartButtonDiv);
    var addCartButton = document.createElement('button');
    addCartButton.id = 'add-to-cart';
    addCartButton.innerHTML = 'Add to Cart';
    addCartButton.addEventListener('click',function () {
      cartCount += 1;
      let objToPush = {"id":productData.id,"count":1,"name":productData.name,"preview":productData.preview,"price":productData.price}
      if(window.localStorage.getItem('orderList') === null){
        window.localStorage.setItem('orderList',JSON.stringify([objToPush]))
      }else{
        let orderListArray = JSON.parse(window.localStorage.getItem('orderList'));
        for(let i=0;i<orderListArray.length;i++){
          if(productData.id === orderListArray[i].id){
            objToPush.count += orderListArray[i].count;
            objToPush.price += orderListArray[i].price;
            orderListArray.splice(i,1);
          }
        }
        
        orderListArray.push(objToPush)
        window.localStorage.setItem('orderList',JSON.stringify(orderListArray));
    }
    $('#cart-count').text(cartCount)
    });
    addCartButtonDiv.appendChild(addCartButton);

  
    var productNameElement = document.createElement('h1')
    productNameElement.id = 'name';
    productNameElement.innerHTML = productData.name;
    productDescription.appendChild(productNameElement);
    var productBrandElement = document.createElement('h4');
    productBrandElement.id = 'brand';
    productBrandElement.innerHTML = productData.brand;
    productDescription.appendChild(productBrandElement);
    var productPriceElement = document.createElement('h3');
    var productPriceElementTextNode = document.createTextNode('Price: Rs ');
    var productPriceElementSpan = document.createElement('span');
    productPriceElementSpan.id = 'price';
    productPriceElementSpan.innerHTML = productData.price;
    productPriceElement.appendChild(productPriceElementTextNode);
    productPriceElement.appendChild(productPriceElementSpan);
    productDescription.appendChild(productPriceElement);
 
    var description = document.createElement('div');
    description.className = 'description';
    productDescription.appendChild(description);
    var descHeading = document.createElement('h3');
    var descPara = document.createElement('p');
    descHeading.innerHTML ='Description';
    description.appendChild(descHeading);
    descPara.id = 'description';
    descPara.innerHTML = productData.description;
    description.appendChild(descPara);

    var previewElement = document.createElement('div');
    previewElement.className ='product-preview';
    productDescription.appendChild(previewElement);
    var productPreviewHeading = document.createElement('h3');
    productPreviewHeading.innerHTML = 'Product Preview';
    previewElement.appendChild(productPreviewHeading);
    var previewImgContainer = document.createElement('div');
    previewImgContainer.className = 'previewImg';
    previewElement.appendChild(previewImgContainer);

    function myFunc(data,a){
        var previewImg = document.createElement('img');
        previewImg.id = a;
        previewImg.className=""
        previewImg.src = data;
        previewImg.alt ="Small-Images";
        previewImgContainer.appendChild(previewImg);
        previewImg.onclick =function(e){
            leftImgElement.src = data;
          for(var b=0; b<productData.photos.length; b++){
            var ct = document.getElementById(b);
            if(b==e.target.id){
                ct.className='active';
            }else{
                ct.className = "";
            }
          }            
        }
    }


    for(var i=0;i<productData.photos.length;i++){
        myFunc(productData.photos[i],i)
       
       
    }

    mainProduct.appendChild(leftColumn);
    mainProduct.appendChild(rightColumn)
                        var str = document.getElementById("0");
      str.className = "active";

}

var product_id = window.location.search.split("=")[1]
$.get('https://5d76bf96515d1a0014085cf9.mockapi.io/product/'+product_id,function(response) {
    createProductPreview(response);
});


    
