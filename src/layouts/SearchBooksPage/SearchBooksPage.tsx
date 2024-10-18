import { useEffect, useState } from "react";
import BookModel from "../../models/BookModel";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { SearchBook } from "./components/SearchBook";
import { Pagination } from "../Utils/Pagination";

export const SearchBooksPage = () => {
//1
//-------------------------------------------STATE-VARIABLES-------------------------------------------------------------------------//
    const[books, setBooks] = useState<BookModel[]>([]); //where we store the books from the db!
    const[isLoading, setIsLoading] = useState(true);
    const[httpError, setHttpError] = useState(null);
    const[currentPage, setcurrentPage] = useState(1);
    const[booksPerPage, setbooksPerPage] = useState(5);
    const[totalAmountOfBooks, setTotalAmountOfBooks] = useState(0);
    const[totalPages, setTotalPages] = useState(0);
    const[search, setSearch] = useState('');
    const[searchUrl, setSearchUrl] = useState('');
//-----------------------------------------------------------------------------------------------------------------------------------//

//-------------------------------------------------------USE-EFFECT-HOOK--------------------------------------------------------------------------//
    //2
    useEffect(() =>{
        const fetchBooks = async () => {

            //2a
            const baseUrl: string = "http://localhost:8080/api/books"; //my spring api
            let url: string = '';

            //2b
            if(searchUrl === ''){
                url = `${baseUrl}?page=${currentPage - 1}&size=${booksPerPage}`;
            }else{
                url = baseUrl + searchUrl;
            }
            //2c
            const response = await fetch(url);
            //This line makes the network request to fetch data from the API.
            //fetch is a native JavaScript function that allows you to make HTTP requests.
            //Since fetch is asynchronous, you're using the await keyword to wait for the request to complete and store the response.
            if(!response.ok){
                throw new Error('Something went wrong!');
            }
            const responseJson = await response.json();
            //This line parses the raw response you got from the fetch call and converts it into a JavaScript object Notation(json) that you can work with.
            //In this case, responseJson is the entire JSON object, including _embedded.

            const responseData = responseJson._embedded.books;
            //This line extracts the books array from the json's _embedded wrapper

            //2d
            setTotalAmountOfBooks(responseJson.page.totalElements);
            setTotalPages(responseJson.page.totalPages);

            //2e
            const loadedBooks: BookModel[] = [];
            //we create a BookModel array to store the fetched book array from the API

            for(const key in responseData){
                loadedBooks.push(
                    {
                    id: responseData[key].id,
                    title: responseData[key].title,
                    author: responseData[key].author,
                    description: responseData[key].description,
                    copies: responseData[key].copies,
                    copiesAvailable: responseData[key].copiesAvailable,
                    category: responseData[key].category,
                    img: responseData[key].img
                }
                )
            }//For each index (or book object), you're creating a new object that matches the structure of the BookModel class. 
            //You're taking values like id, title, author, etc., from each book in responseData.
            setBooks(loadedBooks);
            setIsLoading(false);
        };
        //2f
        fetchBooks().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        })
        window.scrollTo(0, 0);
    }, [currentPage, searchUrl]);
//-----------------------------------------------------------------------------------------------------------------------------------//

//3
//--------------------------------------------------------USEFUL-STUFF---------------------------------------------------------------//
    //3a
    if(isLoading){
        return(
            <SpinnerLoading/>
        )
    }
    if(httpError){
        return(
            <div className="container m-5">
                <p>{httpError}</p>
            </div>
        )
    }
    const searchHandleChange = () => {
        if(search === ''){
            setSearchUrl('');
        }else{
            setSearchUrl(`/search/findByTitleContaining?title=${search}&page=0&size=${booksPerPage}`);
        }
    }
//------------------------------------------------------------------------------------------------------------------------------------//

//4
//-------------------------------------------PAGINATION-LOGIC-------------------------------------------------------------------------//
    //4a
    const indexOfLastBook: number = currentPage * booksPerPage;
    const indexOfFirstBook: number = indexOfLastBook - booksPerPage;
    let lastItem = booksPerPage * currentPage <= totalAmountOfBooks ? booksPerPage * currentPage : totalAmountOfBooks;
    const paginate = (pageNumber: number) => setcurrentPage(pageNumber);
//-----------------------------------------------------------------------------------------------------------------------------------//


//---------------------------------------------JSX-SECTION-------------------------------------------------------------------------------------//
    return (
        <div>
          <div className="container">
            <div>
                <div className="row mt-5">
                    <div className="col-6">
                        <div className="d-flex">
                            <input type="search" className="form-control me-2"  placeholder='Search' aria-labelledby='Search' 
                            onChange={e => setSearch(e.target.value)}/>
                            <button className="btn btn-outline-success" onClick={() => searchHandleChange()}>Search</button>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="dropdown">
                            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">Category</button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                <li>
                                    <a href="#" className="dropdown-item">ALL</a>
                                </li>
                                <li>
                                    <a href="#" className="dropdown-item">Front End</a>
                                </li>
                                <li>
                                    <a href="#" className="dropdown-item"> Back End</a>
                                </li>
                                <li>
                                    <a href="#" className="dropdown-item">Data</a>
                                </li>
                                <li>
                                    <a href="#" className="dropdown-item">DevOps</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="mt-3">
                    <h5>Number of results:{totalAmountOfBooks}</h5>
                </div>
                <p>{indexOfFirstBook + 1} to {lastItem} of {totalAmountOfBooks} items:</p>
                {books.map(book => (
                    <SearchBook book={book} key={book.id}/>
                ))}
                {totalPages > 1 &&
                  <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate}/>
                }
            </div>
          </div>
        </div>
    )
}
//-----------------------------------------------------------------------------------------------------------------------------------//