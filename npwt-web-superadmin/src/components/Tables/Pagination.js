import React from 'react'
import ReactPaginate from 'react-paginate';
import './Pagination.css'
export default function Pagination({getPaginated,currentPage,role, searchTerm,limit,pageCount}) {
    const handlePageClick = (e) => {
        currentPage.current = e.selected + 1;
        getPaginated(currentPage, limit,searchTerm, role);
    };
       
  return (
    <div>
      <div id="react-paginate">
            <ReactPaginate
              breakLabel="..."
              nextLabel=">"
              onPageChange={handlePageClick}
              pageRangeDisplayed={8}
              pageCount={pageCount}
              previousLabel="<"
              renderOnZeroPageCount={null}
              marginPagesDisplayed={8}
              containerClassName={"pagination"}
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              nextClassName="page-item"
              breakClassName="page-item"
              nextLinkClassName="page-link"
              previousLinkClassName="page-link"
              activeClassName="active"
              forcePage={currentPage.current - 1}
              style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "10px",
            }}
            />
      </div>
    </div>
  )
}
