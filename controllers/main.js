// =========================== Scroll Top ===========================

const header = document.querySelector('.header');
window.addEventListener('scroll', (e) => {
    let scrollTop = window.scrollY;
    if (scrollTop > 250) {
        header.classList.add('sticky')
    } else {
        header.classList.remove('sticky')
    }
})
// ========================== Header Form ==========================

const headerMain = document.querySelector('.header__main');
const headerLogo = document.querySelector('.header__logo');
const headerNav = document.querySelector('.header__navbar');
const headerSearchCart = document.querySelector('.header__search-cart');
const headerForm = document.querySelector('.header__form-search');

const searchIcon = document.querySelector('.header__search');
const xIcon = document.querySelector('.header__form-search span:last-child');

// handle Icon Search Header
searchIcon.addEventListener('click', (e) => {
    headerLogo.classList.add('hide');
    headerNav.classList.add('hide');
    headerSearchCart.classList.add('hide');
    headerMain.style.justifyContent = 'center'
    headerForm.classList.remove('hide');
})

// handle Icon X Search Header
xIcon.addEventListener('click', (e) => {
    headerLogo.classList.remove('hide');
    headerNav.classList.remove('hide');
    headerSearchCart.classList.remove('hide');
    headerMain.style.justifyContent = 'space-between';
    headerForm.classList.add('hide')
})

// handle display Search Header
headerForm.children[1].addEventListener('input', (e) => {
    let stamp = e.target.value;
    getProducts(stamp);
})

// ========================== Header Cart ==========================

const showHideCart = document.querySelector('.cart');

document.querySelector('.header__cart ').addEventListener('click' , (e) => {
    showHideCart.classList.remove('hide');

    let elementType = e.target.getAttribute('data-close');
    if (elementType === 'close') {
        showHideCart.classList.add('hide');
    }
})
// ================================== FOOTER ===================================

const showFooter = document.querySelectorAll('.footer__col ul');

let stamp = document.querySelectorAll('.footer__col div');
for (let i = 0; i < stamp.length; i++) {
    stamp[i].addEventListener('click', (e) => {
        showFooter[i].classList.toggle('show');
    })
}

// ================================== STORE ===================================

const selectProvince = document.querySelector('.store__search span');
const listProvince = document.querySelector('.store__province');

const storeList = document.querySelector('.store__list');
const storeMore = document.querySelector('.store__more');

const totalStore = document.querySelector('.store__search b');

// handle show listProvince
selectProvince.addEventListener('click', () => {
    listProvince.style.display = 'block';
})

// handle button xem toa??n b???? store
storeMore.addEventListener('click', (e) => {
    storeList.style.height = 'auto';
    storeList.style.overFlow = 'visible';
    storeMore.style.display = 'none'
})

// handle b???? lo??c show ca??c store t????ng ti??nh tha??nh
listProvince.addEventListener('click', (e) => {
    // chuy????n HTMLnode v???? ma??ng = spread-operator
    let arrProvince = [...listProvince.children];
    // ti??m Li ng??????i du??ng cho??n fill l??n the?? Span
    let currentProvince = arrProvince.find(province => province === e.target);
    selectProvince.innerHTML = currentProvince.innerHTML
    // sau ??o?? ????n the?? ul
    listProvince.style.display = 'none';
    // l????y attribute cu??a province
    let codeProvince = e.target.getAttribute('data-province')
    // xo??a do??ng ch???? xem th??m
    storeMore.style.display = 'none';
    // hi????n thi?? full ?????? da??i list
    storeList.style.height = 'auto';
    storeList.style.overFlow = 'visible';
    // get data t???? API v????
    apiGetStore()
        .then(response => {
            // lo??c ca??c province co?? name tru??ng v????i attribute cu??a province
            let storeOfProvince = response.data.filter((province) => province.nameProvince === codeProvince);
            totalStore.innerHTML = `Co?? ${storeOfProvince.length} c????a ha??ng TopZone ta??i`;
            if (storeOfProvince.length == 1) {
                storeList.style.display = 'block';
                storeList.style.textAlign = 'center';
            } else {
                storeList.style.textAlign = 'left';
            }
            // hi????n thi?? ma??ng m????i ra ma??n hi??nh
            display(storeOfProvince)
        })
        .catch( error => console.log(error))
})

getStore()

// ha??m l????y d???? li??u Store t???? API
function getStore() {
    apiGetStore()
    .then(response => {
        // console.log(response.data)
        let stores = response.data.map((store) => {
            return store = new Stores(
                store.id,
                store.nameProvince,
                store.nameStore,
                store.addressStore,
            );
        })
        display(stores)
    })
    .catch(error => console.log(error))
}

// ha??m render HTML
function display(stores) {
    let content = '';
    stores.reduce((result, store) => {
        return content = result + 
        `<div class="col-lg-6 col-12">
            <p class="m-0 ">
                <a href="">
                    <span>
                        ${store.nameStore}
                        <span>
                            Xem chi?? ????????ng
                        </span>
                    </span>
                    <span>${store.addressStore}</span>
                    <button class="btn btn-primary d-none"
                    data-type="edit"
                    data-id="${store.id}"
                    >Edit</button>
                    <button class="btn btn-danger d-none"
                    data-type="del"
                    data-id="${store.id}"
                    >Delete</button>
                </a>
            </p>
        </div>
        `
    },'')
    storeList.children[0].innerHTML = content;
}

// =============================== PRODUCTS ===============================

// ta??o danh sa??ch sa??n ph????m = [] 
let productList = [];

// clone data = Axios v???? & l??u va??o danh sa??ch sa??n ph????m
apiGetProducts()
    .then((response) => productList = response.data) 
    .catch(error => console.log(error))
// setTimeout(() => {
//     console.log(productList) 
// }, 3000)

// hi????n thi?? option cho ng??????i du??ng cho??n
let filter = document.querySelectorAll('.product__filter .Container div div');

filter.forEach((boLoc) => boLoc.addEventListener('click', (e) => {
    let elementType = e.target.getAttribute('data-type');
    filter.forEach((filter) => filter.children[1].classList.add('hide'));
    if (elementType === 'price') {          
        e.target.children[1].classList.remove('hide');
    } else if (elementType === 'type') {          
        e.target.children[1].classList.remove('hide');
    } else if (elementType === 'screen') {          
        e.target.children[1].classList.remove('hide');
    } else if (elementType === 'cameraF') {          
        e.target.children[1].classList.remove('hide');
    } else if (elementType === 'cameraB') {        
        e.target.children[1].classList.remove('hide');
    } else if (elementType === 'special') {          
        e.target.children[1].classList.remove('hide');
    } else if (elementType === 'memory') {           
        e.target.children[1].classList.remove('hide');
    } else if (elementType === 'ram') {           
        e.target.children[1].classList.remove('hide');
    } 
}))

// lo??c theo l??a?? cho??n ng??????i du??ng
let choice = document.querySelectorAll('.product__filter .Container div div ul li');
console.log(choice)
choice.forEach((choice) => choice.addEventListener(('click'), (e) => {
    // lo??c theo option cho??n type
    let type = document.querySelector('.product__type span')
    let elementType = e.target.getAttribute('data-type-2');
    //chuy????n ??????i Type => l????a cho??n m????i
    type.innerHTML = elementType;
    if (elementType != null) {
        displayProducts(productList.filter((product)=> {
            return product.type === elementType;
        }))  
    }
}))

// l????y 1 sa??n ph????m t???? API = id 
function getProductID(id) {
    apiGetProductID()
        .then(response => console.log(response.data))
        .catch(error => console.log(error))
}

//  kh????i ta??o danh sa??ch gio?? ha??ng
let cartList = []

// gia??i ne??n & ga??n object t???? localStorage va??o cartList
cartList = JSON.parse(localStorage.getItem('cartList')) || [];

// hi????n thi?? danh sa??ch gio?? ha??ng ??a?? l??u ???? localStorage
displayProductToCart(cartList);

// Handle x???? ly?? th??m item va??o cartList & hi????n thi?? ra ma??n hi??nh
document.querySelector('.product__main .row').addEventListener('click', (e) => {
    // b????t s???? ki????n click ???? nu??t ADD trong productLit, l????y id & type 
    let id = e.target.getAttribute('data-id');
    let elementType = e.target.getAttribute('data-type');

    // n????u type == Add thi?? l????y id sa??n ph????m v????a click
    if (elementType == 'add') {
        // duy????t qua List sa??n ph????m, tra?? v???? sa??n ph????m co?? id tru??ng v????i id l????y ??c
        let product = productList.filter(product => {
            return product.id === id; 
        });
        
        // ta??o ??????i t??????ng m????i bao g????m product v????a l????y ??c = id & kh????i l??????ng set = 1;
        let cartItem = {
            product : {...product},
            quantity : 1,
        };

        // duy????t qua List gio?? ha??ng, ki????m tra xem co?? sa??n ph????m na??o tru??ng id v????i id v????a l????y ??c
        let stamp = cartList.find((cartItem) => {
            return cartItem.product[0].id === id;
        })
        // console.log(stamp) 

        
        if (stamp === undefined) {  
            cartList.push(cartItem);    // n????u ko co?? thi?? undefined => push va??o gio?? ha??ng
        } else {    
            stamp.quantity++;   // n????u co?? tru??ng thi?? tra?? v???? object tru??ng => +1 s???? l??????ng SP trong gio?? l??n
        }
        // console.log(cartList)
        total();

        // l??u va??o local Storage m????i khi th??m sa??n ph????m
        window.localStorage.setItem('cartList', JSON.stringify(cartList));
        // hi????n thi?? gio?? ha??ng l??n giao di????n
        displayProductToCart(cartList);
    }
})

// handle x???? ly?? nu??t UP, DOWN, DELETE
document.querySelector('.cart__list').addEventListener('click', (e) => {
    // b????t s???? ki????n click ???? cartList, l????y id & type (up || down)
    let elementType = e.target.getAttribute('data-type');
    let id = e.target.getAttribute('data-id');

    // duy????t qua List gio?? ha??ng, ki????m tra xem co?? sa??n ph????m na??o tru??ng id v????i id v????a l????y ??c => tra?? v???? object ??o??
    let stamp = cartList.find((cartItem) => {
        return cartItem.product[0].id === id;
    })

    // duy????t qua List gio?? ha??ng, ki????m tra xem co?? sa??n ph????m na??o tru??ng id v????i id v????a l????y ??c => tra v???? index cu??a object ??o??
    let stampIndex = cartList.findIndex((cartItem) => {
        return cartItem.product[0].id === id;
    })

    // n????u type == DOWN thi?? gia??m quantity 1 ??vi??
    if (elementType === 'down') {
        stamp.quantity--;
        // n????u quantity = 0 thi?? xo??a chi??nh no??
        if (stamp.quantity === 0) {
            cartList.splice(stampIndex, 1);
        }
    // n????u type == UP thi?? t??ng quantity 1 ??vi??
    } else if (elementType === 'up') {
        stamp.quantity++;
    // n????u type == Delete thi?? xo??a chi??nh no??   
    } else if (elementType === 'delete') {
        if (stampIndex != -1) {
            cartList.splice(stampIndex, 1);
        }
    }
    total();
    // l??u va??o local Storage m????i khi th??m sa??n ph????m
    window.localStorage.setItem('cartList', JSON.stringify(cartList));
    // hi????n thi?? gio?? ha??ng l??n giao di????n
    displayProductToCart(cartList);
})

// handle x???? ly?? nu??t CLEAR-ALL, Purchase
document.querySelector('.cart__btn').addEventListener('click', (e) => {
    let elementType = e.target.getAttribute('data-type');
    
    if (elementType === 'clear' || elementType === 'purchase') {
        cartList.splice(0);
    }
    total();
    // l??u va??o local Storage m????i khi th??m sa??n ph????m
    window.localStorage.setItem('cartList', JSON.stringify(cartList));
    // hi????n thi?? gio?? ha??ng l??n giao di????n
    displayProductToCart(cartList);
})


// ha??m ti??nh t????ng ti????n & ti??nh t????ng s???? l??????ng sa??n ph????m trong cartList
function total() {
    let total = 0;
    let totalQuantity = 0;
    cartList.forEach((cartItem) => {
        let stamp = +cartItem.product[0].price * +cartItem.quantity;
        total += stamp;
        totalQuantity += +cartItem.quantity;
    })
    // t????ng s???? l??????ng sa??n ph????m trong cartList
    document.querySelector('.header__quantity').innerHTML = totalQuantity;
    // t????ng ti????n trong cartList
    document.querySelector('.cart__total span').innerHTML = total.toLocaleString();
}

getProducts(); 
total();
// ha??m l????y d???? li??u Products t???? API
function getProducts(searchName) {
    apiGetProducts(searchName)
        .then(response => {
            let products = response.data;
            products.map((product) => {
                return product = new Products(
                    product.id,
                    product.name,
                    product.price,
                    product.screen,
                    product.backCamera,
                    product.frontCamera,
                    product.image,
                    product.desc,
                    product.type,
                );
            })
            displayProducts(products)
        })
        .catch(error => console.log(error))
}

// ha??m render Products
function displayProducts(products) {
    let content = '';
    products.reduce((result, product) => {
        return content = result + 
        `<div class="col-xl-3 mb-xl-3 col-md-4 mb-md-3 col-6 mb-3">
        <div class="product__col">
            <div class="product__img">
                <img src="${product.img}" alt="">
            </div>
            <div class="product__content">
                <div class="product__name">
                    <h5>${product.name}</h5>
                </div>
                <div class="product__price">
                    <strong>${(+product.price).toLocaleString()}??</strong>
                </div>
            </div>
            <div class="product__discount">Gia??m 30%</div>
            <div class="product__status">
                <em>In Stock</em>
            </div>
            <div class="product__details">
                <p>${product.desc} </p> 
                <p>Ma??n hi??nh: ${product.screen} </p> 
                <p>Camera Sau:${product.backCamera} </p> 
                <p>Camera Tr??????c: ${product.frontCamera} </p> 
                <div class="product__cart">
                    <div>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                    </div>
                    <button class="btn btn-style" data-type="add" data-id="${product.id}">Add <i class="fa-solid fa-angle-right"></i></button>
                </div>
            </div>
        </div>
    </div>`
    },'')
    document.querySelector('.product__main .row').innerHTML = content;
}

// ha??m render CartList
function displayProductToCart(cartList) {
    let content = `
    <div>
        <img src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/assets/9bdd8040b334d31946f49e36beaf32db.png" style="width: 100px; margin-bottom: 20px;">
        <p>Ch??a co?? sa??n ph????m</p>
    </div>`;
    cartList.reduce((result, cartItem) => {
        return content = result + 
        `<div class="cart__item">
            <div class="cart__item-img">
                <img src="${cartItem.product[0].img}" alt="">
            </div>
            <div class="cart__item-name">
                <span>${cartItem.product[0].name}</span>
            </div>
            <div class="cart__item-quantity">
                <span>
                    <i class="fa-solid fa-angle-left" data-id="${cartItem.product[0].id}" data-type="down"></i>
                    ${cartItem.quantity}
                    <i class="fa-solid fa-angle-right" data-id="${cartItem.product[0].id}" data-type="up"></i>
                </span>
            </div>
            <div class="cart__item-price">
                <span>${(+cartItem.product[0].price).toLocaleString()}</span>
            </div>
            <div class="cart__item-delete">
                <span>
                    <i class="fa-solid fa-trash-can" data-id="${cartItem.product[0].id}" data-type="delete"></i>
                </span>
            </div>
        </div>`
    }, '')
    document.querySelector('.cart__list').innerHTML = content;
}
  
 // ============================= Code Edit Store =============================
// function updateStoreID(id) {
//     apiUpdateStoreID(id)
//         .then((response) => {
//             console.log(response.data)
//             document.querySelector('.id').value = response.data.id;
//             document.querySelector('.nameProvince').value = response.data.nameProvince;
//             document.querySelector('.nameStore').value = response.data.nameStore;
//             document.querySelector('.addressStore').value = response.data.addressStore;
//         })
//         .catch(error => console.log(error))
// }
// storeList.addEventListener('click', (e) => {
//     console.log(e.target)
//     let element = e.target.getAttribute('data-type')
//     let id = e.target.getAttribute('data-id')
//     if (element  === 'edit') {
//         updateStoreID(id);
//     } else if (element  === 'del') {
//         delStore(id)
//     }
// })
// function updateStore(id, store) {
//     apiUpdateStore(id, store)
//         .then(response => {
//             console.log(response.data.addrssStore);
//             response.data.addrssStore = '';
//             getStore();
//         })
//         .catch(error => console.log(error))
// }
// document.querySelector('.update').addEventListener('click', (e) => {
//     console.log(document.querySelector('.id').value)
//     let id = document.querySelector('.id').value;
//     let nameProvince = document.querySelector('.nameProvince').value;
//     let nameStore = document.querySelector('.nameStore').value;
//     let addressStore = document.querySelector('.addressStore').value;
    
//     let store = new Stores(id, nameProvince, nameStore, addressStore)
//     updateStore(id, store)
//     // addStore(store)
// })
// function addStore(store) {
//     apiAddStore(store)
//         .then(response => getStore())
//         .catch(error => console.log(error))
// }
// function delStore(id) {
//     apiDelStore(id)
//         .then(response => getStore())
//         .catch(error => console.log(error))
// }
// ============================================================================