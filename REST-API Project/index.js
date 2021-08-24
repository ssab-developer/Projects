const express = require('express');
const db = require('./databases/db');

const app = express();  // invoking data
const port = "8008";
app.use(express.json());


/**
 *  
 * ## All books
 * ## book based on book_id
 * ## Book based on Category
 * 
 * ## All authors
 * ## Author based on book_id
 * 
 * ## All publications
 * ## Author belonging to specific publications
 * 
 * ## Get book based on Author name
 * 
 */

/**
 * ## All books
 * 
 * @route : /books
 * @method : GET
 * @description : "API to fetch all books" 
 * @params : N/A
 * @return_type : Json Object
*/
app.get('/books', (req, res) => {
    const {
        book_id
    } = req.params;

    var result = db.books;

    // res.json(result);
    var resposeObj = {}

    if (result.length == 0) {
        resposeObj = {
            data: {},
            messege: `No book found with Book Id ${book_id}`,
            status: 404
        }
    }
    else {
        resposeObj = {
            data: result,
            messeeg: `found with the Book Id ${book_id}`,
            status: 200
        }
    }
    res.json(resposeObj);
});

app.post('/books', (req, res) => {

    console.log(req);

    const {
        book
    } = req.body

    if (db.books === undefined) db.books = [book];
    else db.books.push(book);

    res.json(db.books);
})

/**
 * ## Books based on book_id
 * 
 * @route : /books/:book_id
 * @method : GET
 * @description : "API to fetch all books by specific id" 
 * @params : id
 * @return_type : Json Object
*/
app.get('/books/:book_id', (req, res) => {
    // Deconstructiong an Object
    const {
        book_id
    } = req.params;

    // var all_books = db.books
    // var book = {}
    // for (let i = 0; i < all_books.length; i++) {
    //     const element = all_books[i];
    //     if (element.book_id === book_id) {
    //         book = element;
    //         break
    //     }
    // }

    var result = db.books.filter(book => book.book_id === book_id);
    console.log(result);

    var resposeObj = {}

    if (result.length == 0) {
        resposeObj = {
            data: {},
            messege: `No book found with Book Id ${book_id}`,
            status: 404
        }
    }
    else {
        var book = result[0];
        resposeObj = {
            data: book,
            messeeg: `${book.title} found with the Book Id ${book_id}`,
            status: 200
        }
    }
    res.json(resposeObj);

});

/**
 * ## Books based on category
 * 
 * @route : /books/:category
 * @method : GET
 * @description : "API to fetch all books by specific category" 
 * @params : category
 * @return_type : Json Object 
*/
app.get('/books/category/:category', (req, res) => {
    const {
        category
    } = req.params;

    var result = db.books.filter(book => book.category.includes(category));
    console.log(result);

    var resposeObj = {}

    if (result.length == 0) {
        resposeObj = {
            data: {},
            messege: `No book found with Book Id ${category}`,
            status: 404
        }
    }
    else {
        var book = result[0];
        resposeObj = {
            data: book,
            messeeg: `Found ${result.length} with the Book category ${category}`,
            status: 200
        }
    }
    res.json(resposeObj);
})

/**
 * ## All Authors
 * 
 * @route : /authors
 * @method : GET
 * @description : "API to fetch all authors " 
 * @params : NA
 * @return_type : Json Object 
*/

app.get('/authors', (req, res) => {
    var author = db.authors;

    var resposeObj = {}

    if (author.length == 0) {
        resposeObj = {
            data: {},
            messege: `No author found`,
            status: 404
        }
    }
    else {
        resposeObj = {
            data: author,
            messeeg: `Found with the Author name`,
            status: 200
        }
    }
    res.json(resposeObj);
});

/**
 * ## All Authors by author Id
 * 
 * @route : /authors/:author_id
 * @method : GET
 * @description : "API to fetch all authors with author Id " 
 * @params : author_id
 * @return_type : Json Object 
*/

app.get('/authors/:author_id', (req, res) => {
    const {
        author_id
    } = req.params;

    var result = db.authors.filter(author => author.id == author_id);
    var resposeObj = {};

    if (result.length == 0) {
        resposeObj = {
            data: {},
            messege: `No author found`,
            status: 404
        }
    }
    else {
        resposeObj = {
            data: result,
            messeeg: `Found Author with Author_Id ${author_id}`,
            status: 200
        }
    }
    res.json(resposeObj);
    // res.json(result);

})

/**
 * ## All Authors by book_id
 * 
 * @route : /authors/book/:book_id
 * @method : GET
 * @description : "API to fetch all authors specific to book_id" 
 * @params : book_id
 * @return_type : Json Object 
*/

app.get('/authors/book/:book_id', (req, res) => {
    const {
        book_id
    } = req.params;

    var result = db.authors.filter(author => author.books.includes(book_id))

    var resposeObj = {}

    if (result.length == 0) {
        resposeObj = {
            data: {},
            messege: `No author found`,
            status: 404
        }
    }
    else {
        resposeObj = {
            data: result,
            messeeg: `Found Author with Book Id ${book_id}`,
            status: 200
        }
    }
    res.json(resposeObj);
    // res.json(result);
})

/**
 * ## All Publications
 * 
 * @route : /publications
 * @method : GET
 * @description : "API to fetch all Publications" 
 * @params : NA
 * @return_type : Json Object
*/

app.get('/publications', (req, res) => {
    var result = db.publications;

    var resposeObj = {}

    if (result.length == 0) {
        resposeObj = {
            data: {},
            messege: `No author found`,
            status: 404
        }
    }
    else {
        resposeObj = {
            data: result,
            messeeg: `Found all Publication `,
            status: 200
        }
    }
    res.json(resposeObj);
    // res.json(result);
})

/**
 * ## All Publications based on author
 * 
 * @route : /publications/:author_name
 * @method : GET
 * @description : "API to fetch all Publications based on author" 
 * @params : author_name
 * @return_type : Json Object
*/

app.get('/publications/:publisher_name', (req, res) => {
    const {
        publisher_name
    } = req.params;

    var result = db.publications.filter(publisher => publisher.name === publisher_name);

    var resposeObj = {}

    if (result.length == 0) {
        resposeObj = {
            data: {},
            messege: `No author found`,
            status: 404
        }
    }
    else {
        resposeObj = {
            data: result,
            messeeg: `Found all Publication with name ${publisher_name}`,
            status: 200
        }
    }
    res.json(resposeObj);
    // res.json(result);
})

app.get('/authors/publications/:publisher_id', (req, res) => {
    const {
        publisher_id
    } = req.params;

    var publisher = db.publications.filter(publisher => publisher.id == publisher_id)[0],
        result = [];

    for (let i = 0; i < db.authors.length; i++) {
        const author = db.authors[i];
        console.log(author);
        if (author.books.some(item => publisher.books.includes(item)))
            result.push(author);
    }
    var responseObj = {};
    if (result.length == 0) {
        responseObj = {
            data: {},
            message: `No author found for publisher of ${publisher.name}`,
            status: 404
        }
    }
    else {
        responseObj = {
            data: result,
            message: `${result.length} authors found for publisher of ${publisher.name}`,
            status: 200
        }
    }
    res.json(responseObj)
})

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
});