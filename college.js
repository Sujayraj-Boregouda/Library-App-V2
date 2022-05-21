// ***ES6 CLASSES Way*** //

class Book {
    constructor(name, author, type) {
        this.name = name;
        this.author = author;
        this.type = type;
    }

    insertlocalstorage(book) {
        let bookObj;

        let bookstore = localStorage.getItem("bookstore");
        if (bookstore == null) {
            bookObj = [];
        }
        else {
            bookObj = JSON.parse(bookstore);
        }

        bookObj.push(book);
        localStorage.setItem("bookstore", JSON.stringify(bookObj));
    }
}

class Display {

    // Add Function
    add() {
        //
        let bookObj;

        let bookstore = localStorage.getItem("bookstore");
        if (bookstore == null) {
            bookObj = [];
        }
        else {
            bookObj = JSON.parse(bookstore);
        }

        //
        let html = "";

        bookObj.forEach(function (book,index) {
            html += `<tr>
            <td>${book.name}</td>
            <td>${book.author}</td>
            <td>${book.type}</td>
            <td><button  id="${index}" onclick="display.deleteBook(this.id)" class="btn btn-outline-danger my-2 my-sm-0" type="submit">Delete</button></td>

        </tr>`;
        });

        //

        let tableBody = document.getElementById('tableBody');

        if (bookObj.length != 0) {
            tableBody.innerHTML = html;
        }
        else {
            tableBody.innerHTML = `<b style="color:red">There is no book in the library</b>`;
        }
    }

    // Clear Function
    clear() {
        let libraryForm = document.getElementById("libraryForm");
        libraryForm.reset();
    }

    // Validate Function
    validate(book) {
        if (book.name.length < 2 || book.author.length < 2) {
            return false;
        } else {
            return true;
        }
    }

    // Delete Function
    deleteBook(index){
        
        let bookObj;

        let bookstore = localStorage.getItem("bookstore");
        if (bookstore == null) {
            bookObj = [];
        }
        else {
            bookObj = JSON.parse(bookstore);
        }
        bookObj.splice(index,1);
        localStorage.setItem("bookstore",JSON.stringify(bookObj));
        display.add();

    }

    // Show Function
    show(type, displayMessage) {
        let message = document.getElementById("message");
        let boldText;
        if (type === "success") {
            boldText = "Suceess!";
        } else {
            boldText = "Error!";
        }
        message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                                <strong>${boldText} :</strong> ${displayMessage}.
                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                            </div>`;
        setTimeout(() => {
            message.innerHTML = '';
        }, 3000);
    }
}


// Add Submit Event Listener to Library Form
let libraryForm = document.getElementById("libraryForm");
libraryForm.addEventListener("submit", libraryFormSubmit);

function libraryFormSubmit(e) {
    e.preventDefault();

    let name = document.getElementById("bookName").value;
    let author = document.getElementById("author").value;
    // let type = document.querySelector('input[name="type"]:checked').value; 
    // Found This in comment


    let type;
    let fiction = document.getElementById("fiction");
    let programming = document.getElementById("programming");
    let cooking = document.getElementById("cooking");

    if (fiction.checked) {
        type = fiction.value;
    } else if (programming.checked) {
        type = programming.value;
    } else if (cooking.checked) {
        type = cooking.value;
    }

    // Intitating Book
    let book = new Book(name, author, type);

    let display = new Display();

    // Displays Book
    if (display.validate(book)) {
        
        let bookitemlocalstorage = new Book();
        bookitemlocalstorage.insertlocalstorage(book);

        display.add();
        display.clear();
        display.show("success", "Your book has been added to the list");
        localStorage.setItem("Entries", JSON.stringify(book))
    } else {
        display.show("danger", "You won't be able to add an empty book");
    }
}


