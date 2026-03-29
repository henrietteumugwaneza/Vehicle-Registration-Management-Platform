export default function Table({ data }) {
  return (
    <table className="w-full border mt-4">
      <thead>
        <tr>
          <th>ID</th>
          <th>Model</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((v) => (
          <tr key={v.id}>
            <td>{v.id}</td>
            <td>{v.model}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}