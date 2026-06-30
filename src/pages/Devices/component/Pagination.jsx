export default function PaginationControl({ page, count, onChange, pageSize }) {
  return (
    <Pagination
      count={count}
      page={page}
      onChange={(e, v) => onChange(v)}
      color="primary"
      shape="rounded"
      siblingCount={1}
      boundaryCount={1}
    />
  );
}
