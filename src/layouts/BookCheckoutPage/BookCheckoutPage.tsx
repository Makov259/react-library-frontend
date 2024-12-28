import BookModel from "../../models/BookModel";
import {useEffect, useState} from "react";
import {SpinnerLoading} from "../Utils/SpinnerLoading";
import {StarsReview} from "../Utils/StarsReview"
import {CheckoutAndReviewBox} from "./CheckoutAndReviewBox";

export const BookCheckoutPage = () => {

//UseState Variables!
    const [book, setBook] = useState<BookModel>();
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    const bookId = (window.location.pathname).split('/')[2];


    useEffect(() => {
        const fetchBook = async () => {

            const baseUrl: string = `http://localhost:8080/api/books/${bookId}`;

            const response = await fetch(baseUrl);
            //This line makes the network request to fetch data from the API.
            //fetch is a native JavaScript function that allows you to make HTTP requests.
            //Since fetch is asynchronous, I am using the await keyword to wait for the request to complete and store the response.

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const responseJson = await response.json();
            //This line parses the raw response you got from the fetch call and converts it into a JavaScript object notation(JSON) that you can work with.
            //In this case, responseJson is the entire JSON object, including _embedded element.


            const loadedBook: BookModel = {
                id: responseJson.id,
                title: responseJson.title,
                author: responseJson.author,
                description: responseJson.description,
                copies: responseJson.copies,
                copiesAvailable: responseJson.copiesAvailable,
                category: responseJson.category,
                img: responseJson.img
            };
            //we create a BookModel array to store the fetched book array from the API

            setBook(loadedBook);
            setIsLoading(false);
        };
        fetchBook().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        })
    }, []);// this [] at the end is called the dependency array, which , if empty, means that the logic inside the useEffect will run only once after the component renders

    if (isLoading) {
        return (
            <SpinnerLoading/>
        )
    }

    if (httpError) {
        return (
            <div className="container m-5">
                <p>{httpError}</p>
            </div>
        )
    }

    return (
        <div>
            {/*View for PC*/}
            <div className="container d-none d-lg-block">
                <div className="row mt-5">
                    <div className="col-sm-2 col-md-2">
                        {book?.img ?
                            <img src={book?.img} width='226' height='349' alt='Book'/>
                            :
                            <img src={require('./../../Images/BooksImages/book-luv2code-1000.png')} width='226'
                                 height='349' alt='Book'/>
                        }
                    </div>
                    <div className="col-4 col-md-4 container">
                        <div className="ml-2">
                            <h2>{book?.title}</h2>
                            <h5 className="text-primary">{book?.author}</h5>
                            <p className="lead">{book?.description}</p>
                            <StarsReview rating={4} size={32}/>
                        </div>
                    </div>
                    <CheckoutAndReviewBox book={book} mobile={false}/>
                </div>
                <hr/>
            </div>
            {/*View for mobile*/}
            <div className="container d-lg-none mt-5">
                <div className="d-flex justify-content-center align-items-center">
                    {book?.img ?
                        <img src={book?.img} width='226' height='349' alt='Book'/>
                        :
                        <img src={require('./../../Images/BooksImages/book-luv2code-1000.png')} width='226'
                             height='349' alt='Book'/>
                    }
                </div>
                <div className="mt-4">
                    <div className="ml-2">
                        <h2>{book?.title}</h2>
                        <h5 className="text-primary">{book?.author}</h5>
                        <p className="lead">{book?.description}</p>
                        <StarsReview rating={4.5} size={32}/>
                    </div>
                </div>
                <CheckoutAndReviewBox book={book} mobile={true}/>
                <hr/>
            </div>
        </div>
    );
}