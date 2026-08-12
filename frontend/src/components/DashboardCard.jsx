function DashboardCard({ title, value }) {
  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "20px",
        margin: "10px",
        borderRadius: "12px",
        width: "220px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <p
        style={{
          margin: "0 0 10px 0",
          color: "#666",
          fontSize: "16px",
        }}
      >
        {title}
      </p>

      <h2
        style={{
          margin: 0,
          color: "black",
          fontSize: "28px",
        }}
      >
        {value}
      </h2>
    </div>
  );
}

export default DashboardCard;