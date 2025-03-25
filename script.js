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
        // console.log(cart)

    })
    // deleteBtn.style.backgroundImage = "url('./assets/images/icon-remove-item.svg')"
    li.append(div_right,deleteBtn)

    list_plat.append(li)
    let liclone = li.cloneNode(true)
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
        const n = parseInt(quantity.textContent) + 1 // la quantité
        quantity.textContent = n
        // console.log(name,price,n)
        const itemDetails = {
            name:name,
            price:price,
            quantity:n
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
        //   e represente un element du panier 
        cart.forEach(e=>{
            if(e.name == name){
                let cartLi = document.querySelector(`li[data-name="${name}"]`)
                if(e.quantity <= 1){
                   cart = cart.filter(item=>item.name !== e.name)
                   calculOrder()
                    cartLi.remove()
                }else if(e.quantity>1){
                    e.quantity--
                    let cartItemQauntity = cartLi.querySelector('.quantityAdd')
                    cartItemQauntity.textContent = `${e.quantity}x`
                    calculOrder()
                }
            }
        })
        console.log(cart)
        //   console.log(name)
        })
    })
}
// calcule du total 
let ordertotal =  document.querySelector('.order-total')
function calculOrder(){
    let s = 0
    cart.forEach(item=>{
        s = s + (item.quantity*item.price) //calcule de la somme
    })
    ordertotal.innerText = `$${s}`
    console.log(s)
}




function confirmaMenu(){
    const list_plat1 = document.querySelectorAll('.list-plat li')
    confirmation.style.display="flex"
    let desetConfirmed = document.querySelector('.deset-confirmed')
    list_plat1.forEach(li=>{
      let newLi = document.createElement('li')
        newLi.classList.add('li-confirmation')
      let imgDesert = document.createElement('img')
      imgDesert.src = "./assets/images/image-macaron-thumbnail.jpg"

      newLi.append(imgDesert)

      let desertName = li.querySelector('h3').textContent
      let quantity = li.querySelector('.quantityAdd').textContent
      let price = li.querySelector('.price-item').textContent

      newLi.innerHTML +=`<span>${desertName}</span> - <span>${quantity}</span>  <span>${price}</span>`

      desetConfirmed.append(newLi)
    })
}

// button de confirmation 

confirmBtn.addEventListener('click',()=>{
    confirmation.style.display="flex"
    console.log(list_plat)
    confirmaMenu()
})