let increment_btn = document.querySelectorAll('.increment')
let decrement_btn = document.querySelectorAll('.decrement')
let list_plat = document.querySelector('.list-plat')
let details = document.querySelectorAll('.details')
let content = document.querySelector('.content')
let panier = document.querySelector('.panier')
let cart = []
let confirmation = document.querySelector('.confirmation')
let confirmBtn = document.querySelector('.confirmBtn')
let desetConfirmed = document.querySelector('.deset-confirmed')
let cartquantity = document.querySelector('.cart-quantity')

// fonction pour afficher le panier 
function updateCart(item){

    // cacher le contenu par defaut 
    content.style.display='none'
    panier.style.display='flex'

    let li = document.createElement("li")
    li.classList.add('li-element')
    li.setAttribute('data-name', item.name)
    let div_right = document.createElement('div')
    div_right.classList.add('right')
    let desertName = document.createElement('h3')
    let desertD = document.createElement('div')
    div_right.append(desertName,desertD)

    desertName.innerText = item.name
    desertD.classList.add('cart-details')
    desertD.innerHTML = `<span class="quantityAdd">${item.quantity}x</span> <span>@$${item.price}</span> <span> $<span  class='price-item'>${item.price}</span></span>`
    
    let deleteBtn = document.createElement('div')
    deleteBtn.classList.add('delete-image')
    deleteBtn.addEventListener('click',()=>{
        li.remove()
        cart = cart.filter(e=>e.name !== item.name)
        calculOrder()
        // pour renitialiser la quantité 
        let desertItem = document.querySelector(`.desert-item[data-name="${item.name}"]`);
        if(desertItem){
            let DQ = desertItem.querySelector('.quantity')  //recuperer la quantité afin de le mettre a 0 apres suppression
            if(DQ){
                console.log(DQ.textContent)
                DQ.textContent = "0"
            }
        }
        // pour renitialiser le panier 
        console.log(cart.length)
        if(cart.length==0){
            content.style.display='flex'
            panier.style.display='none'
        }
        // console.log(cart)

    })
    // deleteBtn.style.backgroundImage = "url('./assets/images/icon-remove-item.svg')"
    li.append(div_right,deleteBtn)

    list_plat.append(li)
}
// pour l'ajout 
increment_btn.forEach((btn)=>{
    // let i =0
    btn.addEventListener('click',()=>{
        // i++
        const desert = btn.closest('.desert-item')
        let quantity = desert.querySelector('.quantity')
        const name = desert.dataset.name
        const price = desert.dataset.price 
        const img = desert.querySelector('img').src
        const n = parseInt(quantity.textContent) + 1 // la quantité
        quantity.textContent = n
        // ajout du style 
        let imgDesert = desert.querySelector('img')
        imgDesert.style.border="2px solid hsl(14, 65%, 35%)"
        // console.log(name,price,n)
        const itemDetails = {
            name:name,
            price:price,
            quantity:n,
            img:img
        }
        let trouve = false
        if(cart){
            //   e represente un element du panier 
            cart.forEach(e=>{
                if(e.name === name){
                    e.quantity++
                    trouve = true
                    // console.log(e)
                        let cartLi = document.querySelector(`li[data-name="${name}"]`)
                        let cartItemQauntity = cartLi.querySelector('.quantityAdd')
                        cartItemQauntity.textContent = `${e.quantity}x`
                        calculOrder()
                }
            })
        }
        console.log(trouve)
        if(trouve === false){
            cart.push(itemDetails)
            updateCart(itemDetails)
            calculOrder()
        }
        // console.log(cart.length)
    })

})
// pour le retarit 
if(cart){
    decrement_btn.forEach(btn=>{
        btn.addEventListener('click',()=>{
          let desert = btn.closest('.desert-item')  
        //   console.log(desert)
          const name = desert.dataset.name
          let quantity = desert.querySelector('.quantity') //la quantité
          if(parseInt(quantity.textContent)>0){
            const d = parseInt(quantity.textContent) - 1 //la decrementation 
            quantity.textContent=d
          }
            let imgDesert = desert.querySelector('img')
        
        //   e represente un element du panier 
        cart.forEach(e=>{
            if(e.name == name){
                let cartLi = document.querySelector(`li[data-name="${name}"]`)
                if(e.quantity <= 1){
                   cart = cart.filter(item=>item.name !== e.name)
                   calculOrder()
                    cartLi.remove()
                    imgDesert.style.border="0px solid hsl(14, 65%, 35%)"
                }else if(e.quantity>1){
                    e.quantity--
                    let cartItemQauntity = cartLi.querySelector('.quantityAdd')
                    cartItemQauntity.textContent = `${e.quantity}x`
                    calculOrder()
                }
            }
        })
        })
    })
}
// calcule du total 
let ordertotal =  document.querySelectorAll('.order-total')
function calculOrder(){
    let s = 0
    let TQ = 0 //total quantité
    cart.forEach(item=>{
        s = s + (item.quantity*item.price) //calcule de la somme
        TQ+=item.quantity
        // cartquantity.textContent=`Your cart(${cart.length})` //pour actualiser la quantité du panier
    })
    ordertotal.forEach(o=>{
        o.innerText = `$${s}`
    })
    cartquantity.textContent=`Your cart(${TQ})` //pour actualiser la quantité du panier
    // console.log(s)
}



// pour confirmer la commande 
function confirmaMenu(){
    const list_plat1 = document.querySelectorAll('.list-plat li')
    confirmation.style.display="flex"
    let desetConfirmed = document.querySelector('.deset-confirmed')
    cart.forEach(item => {
        let newLi = document.createElement('li')
        newLi.classList.add('li-confirmation')
    
        // Ajout de l'image dans la confirmation
        let imgDesert = document.createElement('img')
        imgDesert.src = item.img
        newLi.appendChild(imgDesert)
    
        newLi.innerHTML += `
            <div class="confirmation-details">
                <span>${item.name}</span>
                <div class="quantity-price">
                    <div class="quantityPriceTag"><span class="quantityAdd">${item.quantity}x</span> <span      class="price_tag">@${item.price}</span>
                    </div>
                    <span class='price-item'>${item.price}</span>
                </div> 
            </div>`
    
        desetConfirmed.appendChild(newLi)
    })
    
}

// button de confirmation 

confirmBtn.addEventListener('click',()=>{
    confirmation.style.display="flex"
    // console.log(list_plat)
    confirmaMenu()
})

// nouvelle commande 
function newCart(){
    if(confirmation){
        confirmation.display="none"
        let li = document.querySelectorAll('.list-plat li')
        li.forEach(liCart =>{
            liCart.remove()
        })
        content.style.display='flex'
        panier.style.display='none'
    }
    confirmation.style.display="none"
}
// nouvelle commande 
let newOrderBtn = document.querySelector('.newOrderBtn')
newOrderBtn.addEventListener('click',()=>{
    newCart()
    cart = []
    window.location.reload()  // rafrechir la page
})

// newCart()