import React from 'react'
import ReactPaginate from 'react-paginate';
import './Css/Pagination.css'
export default function Pagination({currentPage,getPaginatedUsers,limit,pageCount}) {
    const handlePageClick = (e) => {
        currentPage.current = e.selected + 1;
        getPaginatedUsers(currentPage, limit);
        };
       
  return (
    <div id="react-paginate" className="center-pagination">
            <ReactPaginate
              breakLabel="..."
              nextLabel=">>"
              onPageChange={handlePageClick}
              pageRangeDisplayed={8}
              pageCount={pageCount}
              previousLabel="<<"
              renderOnZeroPageCount={null}
              marginPagesDisplayed={8}
              containerClassName={"pagination"}
              pageClassName="pageitem"
              pageLinkClassName="pagelink"
              previousClassName="pageitem"
              nextClassName="pageitem"
              breakClassName="pageitem"
              nextLinkClassName="pagelink"
              previousLinkClassName="pagelink"
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
  )
}
