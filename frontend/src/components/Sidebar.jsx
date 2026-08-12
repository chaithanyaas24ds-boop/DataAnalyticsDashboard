function Sidebar() {
  return (
    <div
      style={{
        width: "220px",
        height: "100vh",
        backgroundColor: "#1e293b",
        color: "white",
        padding: "20px",
      }}
    >
      <h2>Dashboard</h2>

      <p>🏠 Home</p>
      <p>📊 Analytics</p>
      <p>📁 Reports</p>
      <p>⚙ Settings</p>
    </div>
  );
}

export default Sidebar;