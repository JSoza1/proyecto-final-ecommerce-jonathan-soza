fetch('https://dummyjson.com/products/category/sunglasses')
.then(res => res.json())
.then(console.log);