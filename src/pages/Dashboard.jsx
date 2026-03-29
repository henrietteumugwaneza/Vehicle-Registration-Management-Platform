import Navbar from "../components/Navbar";

export default function Dashboard() {
  return (
    <>
      <Navbar />
      <div className="p-4">
        <h1>Dashboard</h1>
        <p>Protected content</p>
      </div>
    </>
  );
}