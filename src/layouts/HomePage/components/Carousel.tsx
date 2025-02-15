import { ReturnBook } from "./ReturnBook";
import { useEffect, useState } from "react";
import BookModel from "../../../models/BookModel";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";
import {Link} from "react-router-dom";

export const Carousel = () => {

    const[books, setBooks] = useState<BookModel[]>([]);
    const[isLoading, setIsLoading] = useState(true);
    const[httpError, setHttpError] = useState(null);

    useEffect(() =>{
        const fetchBooks = async () => {

            const baseUrl: string = "http://localhost:8080/api/books";
            const url: string = `${baseUrl}?page=0&size=9`; //Simply will return the first 9 books.

            const response = await fetch(url);
            //This line makes the network request to fetch data from the API.
            //fetch is a native JavaScript function that allows you to make HTTP requests.
            //Since fetch is asynchronous, you're using the await keyword to wait for the request to complete and store the response.

            if(!response.ok){
                throw new Error('Something went wrong!');
            }

            const responseJson = await response.json();
            //This line parses the raw response you got from the fetch call and converts it into a JavaScript object that you can work with.
            //In this case, responseJson is the entire JSON object, including _embedded.

            const responseData = responseJson._embedded.books;
            //This line extracts the books array from the json's _embedded wrapper

            const loadedBooks: BookModel[] = [];
            //we create a BookModel array to store the fetched book array from the API

            for(const key in responseData){
                loadedBooks.push({
                    id: responseData[key].id,
                    title: responseData[key].title,
                    author: responseData[key].author,
                    description: responseData[key].description,
                    copies: responseData[key].copies,
                    copiesAvailable: responseData[key].copiesAvailable,
                    category: responseData[key].category,
                    img: responseData[key].img
                })
            }//For each index (or book object), we're creating a new object that matches the structure of the BookModel class.
            //You're taking values like id, title, author, etc., from each book in responseData.
            setBooks(loadedBooks);
            setIsLoading(false);
        };
        fetchBooks().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        })
    }, []);// this [] at the end is called the dependency array, which , if empty, means
    // that the logic inside the useEffect will run only once after the component renders

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

    return(
       <div className="container mt-5" style={{height: 550}}>
        <div className="homepage-carousel-title">
            <h3>Find your next "I stayed up too late reading" book.</h3>
        </div> 
        <div className="carousel carousel-dark slide mt-5 d-none d-lg-block" id="carouselExampleControls" data-bs-interval="false">
            {/* Desktop */}
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <div className="row d-flex justify-content-center align-items-center">
                        {books.slice(0, 3).map(book => (
                            <ReturnBook book={book} key={book.id}/>
                        ))}
                    </div>
                </div>
                <div className="carousel-item">
                    <div className="row d-flex justify-content-center align-items-center">
                    {books.slice(3, 6).map(book => (
                            <ReturnBook book={book} key={book.id}/>
                        ))}
                    </div>
                </div>
                <div className="carousel-item">
                    <div className="row d-flex justify-content-center align-items-center">
                    {books.slice(6, 9).map(book => (
                            <ReturnBook book={book} key={book.id}/>
                        ))}
                    </div>
                </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
                {/* Mobile */}
                <div className="d-lg-none mt-3">
                    <div className="row d-flex justify-content-center align-items-center">
                        <ReturnBook book={books[7]} key={books[7].id}/>
                    </div>
                </div>
                <div className="homepage-carousel-title mt-3">
                    <Link className="btn btn-outline-secondary btn-lg" to='/search'>View More</Link>
                </div>
          </div>
    );
}