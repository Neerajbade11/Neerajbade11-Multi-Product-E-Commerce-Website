let categoriesListElement = document.getElementById('categories-list')

let categoriesList =[]

const fetchProductsList = (productsList) => {
    categoriesListElement.innerHTML = ''
    productsList.forEach(eachProduct => {
        const listElement = document.createElement('li')
        listElement.id = eachProduct.id
        

        const cardContainer = document.createElement('div')
        cardContainer.classList.add('card-container')

        const imgContainer = document.createElement('div')
        imgContainer.classList.add('img-container')
        cardContainer.appendChild(imgContainer)
       

        const imgElement = document.createElement('img')
        imgElement.src = eachProduct.image
        imgElement.classList.add('product-img')
        imgContainer.appendChild(imgElement)
         

        if (eachProduct.badge_text) {
            const badgeElement = document.createElement('span');
            badgeElement.textContent = eachProduct.badge_text;
            imgContainer.appendChild(badgeElement);
        }

        const titleContainer = document.createElement('ul')
        titleContainer.classList.add('title-container')
        cardContainer.appendChild(titleContainer)

        const titleElement = document.createElement('li')
        titleElement.textContent = eachProduct.title
        titleContainer.appendChild(titleElement)

        const vendorElement = document.createElement('li')
        vendorElement.textContent = eachProduct.vendor
        titleContainer.appendChild(vendorElement)

        const priceContainer = document.createElement('div')
        priceContainer.classList.add('price-container')
        cardContainer.appendChild(priceContainer)

        const priceElement = document.createElement('p')
        priceElement.textContent = `Rs ${eachProduct.price}.00`
        priceContainer.appendChild(priceElement)

        const comparePriceElement = document.createElement('p')
        comparePriceElement.textContent = `${eachProduct.compare_at_price}.00`
        priceContainer.appendChild(comparePriceElement)


        const discountPercentage = Math.round((1 - (eachProduct.price / eachProduct.compare_at_price)) * 100);;
        const discountElement = document.createElement('p')
        discountElement.textContent = `${discountPercentage}% Off`
        priceContainer.appendChild(discountElement)

        const buttonElement = document.createElement('button')
        buttonElement.classList.add('btn')
        buttonElement.textContent = 'Add to Cart'
        cardContainer.appendChild(buttonElement)


        listElement.appendChild(cardContainer)
        categoriesListElement.appendChild(listElement)
    });
}

const getProducts = (name) =>{ 
    const productsList =  categoriesList.find(eachItem => eachItem.category_name === name)
   
    const headersItemElement = document.querySelectorAll('.header-tab-list li')
   
    headersItemElement.forEach(item => {
        item.classList.remove('clicked');
    });

    const headerElement =  document.getElementById(name)
    headerElement.classList.add('clicked')
    fetchProductsList(productsList.category_products)
    
}


const fetchData = async () => {
    try{
        
        const response = await fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json')
        if(!response.ok){
            throw new Error('failed to fetch data')
        }
        const data = await response.json();
        categoriesList = data.categories
          
    }catch(error){
        console.log(`Error Fetching Data: ${error}`)
    }
}



const fetchApi = async () => {
    await fetchData()
    await getProducts('Men')
}

fetchApi()
