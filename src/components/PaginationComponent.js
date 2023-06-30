import Pagination from "react-bootstrap/Pagination";
import { LinkContainer } from "react-router-bootstrap";

function PaginationComponent({
  categoryName,
  searchQuery,
  paginationLinksNumber,
  pageNum,
}) {
  const category = categoryName ? `category/${categoryName}/` : "";
  const search = searchQuery ? `search/${searchQuery}/` : "";
  const url = `/product.list/${category}/${search}`;

  return (
    <Pagination style={{ marginBottom: "70px" }}>
      <LinkContainer to={`${url}${pageNum - 1}`}>
        <Pagination.Prev disabled={pageNum === 1} />
      </LinkContainer>
      {[...Array(paginationLinksNumber).keys()].map((x) => (
        <LinkContainer key={x + 1} to={`${url}${x + 1}`}>
          <Pagination.Item active={page + 1 === pageNum}>
            {x + 1}
          </Pagination.Item>
        </LinkContainer>
      ))}
      <LinkContainer
        disabled={pageNum === paginationLinksNumber}
        to={`${url}${pageNum + 1}`}
      >
        <Pagination.Next />
      </LinkContainer>
    </Pagination>
  );
}

export default PaginationComponent;
