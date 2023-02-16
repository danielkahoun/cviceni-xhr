class Product {
    constructor(title, description, price, brand, category) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.brand = brand;
        this.category = category;
    }
}

let products = [];

const req = new XMLHttpRequest();
req.addEventListener("progress", updateProgress);
req.addEventListener("load", transferComplete);
req.addEventListener("error", transferFailed);
req.addEventListener("abort", transferCanceled);
req.open("GET", "https://dummyjson.com/products");

req.send();

function updateProgress(event) {
    if (event.lengthComputable) {
        document.querySelector("#progress").style.display = "block";
        document.querySelector("#progress").value = (event.loaded / event.total) * 100;
        console.log((event.loaded / event.total) * 100);
    } else {
        // Unable to compute progress information since the total size is unknown
        console.log(event.lengthComputable);
    }
}

function transferComplete(evt) {
    let res = JSON.parse(this.responseText);
    for (p of res.products) {
        products.push(new Product(p.title, p.description, p.price, p.brand, p.category));
    }
    console.log(products);
    document.querySelector("#progress").style.display = "none";
    save();
    render();
}

function transferFailed(evt) {
    document.querySelector("#progress").style.display = "none";
    console.log("An error occurred while transferring the file.");
}

function transferCanceled(evt) {
    document.querySelector("#progress").style.display = "none";
    console.log("The transfer has been canceled by the user.");
}

function save() {
    localStorage.setItem('data', JSON.stringify(products));
}

function load() {
    products = [];
    products = JSON.parse(localStorage.getItem('data'));
}

function render() {
    document.querySelector("tbody").innerHTML = "";

    for (p of products) {
        const tr = document.createElement("tr");

        const title = document.createElement("td");
        title.appendChild(document.createTextNode(p.title));
        tr.appendChild(title);

        const description = document.createElement("td");
        description.appendChild(document.createTextNode(p.description));
        tr.appendChild(description);

        const price = document.createElement("td");
        price.appendChild(document.createTextNode(p.price));
        tr.appendChild(price);

        const brand = document.createElement("td");
        brand.appendChild(document.createTextNode(p.brand));
        tr.appendChild(brand);

        const category = document.createElement("td");
        category.appendChild(document.createTextNode(p.category));
        tr.appendChild(category);

        document.querySelector("tbody").appendChild(tr);
    }

}