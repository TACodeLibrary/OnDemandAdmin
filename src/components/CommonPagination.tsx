import React from "react";
import ReactPaginate from "react-paginate";

// Define the types for the props
interface CommonPaginationProps {
  total: number;
  page_size: number;
  currentPage: number;
  hitAction: (newPage: { selected: number }) => void; // React Paginate passes an object with a `selected` property
}

const CommonPagination: React.FC<CommonPaginationProps> = (props) => {
  return (
    <div className='d-flex justify-content-end'>
      <ReactPaginate
        breakLabel="..."
        nextLabel="»"
        onPageChange={(data) => props.hitAction(data)} // Pass the `selected` property to hitAction
        pageCount={Math.ceil(props.total / props.page_size)}  // Ensure total pages are calculated correctly
        previousLabel="«"
        renderOnZeroPageCount={null}
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        forcePage={props.currentPage - 1}  // Fix: Zero-indexed page
      />
    </div>
  );
};

export default CommonPagination;
