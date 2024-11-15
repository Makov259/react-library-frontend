import React from "react";

export const Pagination: React.FC<{currentPage: number, totalPages: number, paginate: any}> = (props) => {


    const pageNumbers = []; //pagination bar

    if(props.currentPage === 1){
        pageNumbers.push(props.currentPage);
        if(props.totalPages >= props.currentPage + 1){
            pageNumbers.push(props.currentPage + 1); // adds page 2 
        }
        if(props.totalPages >= props.currentPage + 2){
            pageNumbers.push(props.currentPage + 2) // adds page 3
        }
    }else if(props.currentPage > 1){
        if(props.currentPage >= 3){
            pageNumbers.push(props.currentPage - 2); // adds the second previous page from the currentPage
            pageNumbers.push(props.currentPage - 1); // adds the immediately previous page from the currentPage
        }else{
            pageNumbers.push(props.currentPage - 1); // if user is on page 2 adds the  previous page from the currentPage which is 1
        }

        pageNumbers.push(props.currentPage); // adds the currentPage to the paginationBar array

        if(props.totalPages >= props.currentPage + 1){
            pageNumbers.push(props.currentPage + 1); //adds the next page after the current one if it exists
        }
        if(props.totalPages >= props.currentPage + 2){
            pageNumbers.push(props.currentPage + 2) //adds the second next page after the current one if it exists
        }
    }

    return (
        <nav aria-label="...">
            <ul className="pagination">
                <li className="page-item" onClick={() => props.paginate(1)}>
                    <button className="page-link">
                        First Page
                    </button>
                </li>
                {pageNumbers.map(number => (
                    <li key={number} onClick={() => props.paginate(number)} className={'page-item ' + (props.currentPage === number ? 'active' : '')}>
                        <button className="page-link">
                            {number}
                        </button>
                    </li>
                ))}
                <li className="page-item" onClick={() => props.paginate(props.totalPages)}>
                    <button className="page-link">
                        Last Page
                    </button>
                </li>
            </ul>
        </nav>
    );
}