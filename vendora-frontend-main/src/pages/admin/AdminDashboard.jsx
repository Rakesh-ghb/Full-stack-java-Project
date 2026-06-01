import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,

  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

import "../../styles/AdminDashboard.css";

export default function AdminDashboard() {

  /* ===== PIE CHART DATA ===== */

  const pieData = [

    { name: "Users", value: 35 },

    { name: "Projects", value: 21 },

    { name: "Orders", value: 73 },

    { name: "Payments", value: 63 },
  ];

  const COLORS = [
    "#38bdf8",
    "#3b82f6",
    "#22c55e",
    "#facc15",
  ];

  /* ===== LINE CHART DATA ===== */

  const lineData = [

    { month: "Jan", sales: 10 },

    { month: "Feb", sales: 25 },

    { month: "Mar", sales: 18 },

    { month: "Apr", sales: 40 },

    { month: "May", sales: 55 },

    { month: "Jun", sales: 70 },
  ];

  return (

    <div className="admin-dashboard">

      <h1>Admin Dashboard</h1>

      {/* ===== STATS ===== */}

      <div className="stats-grid">

        <div className="stat-card">
          <h3>Total Users</h3>
          <h2 className="green">35</h2>
        </div>

        <div className="stat-card">
          <h3>Total Projects</h3>
          <h2 className="blue">21</h2>
        </div>

        <div className="stat-card">
          <h3>Total Orders</h3>
          <h2 className="yellow">73</h2>
        </div>

        <div className="stat-card">
          <h3>Total Payments</h3>
          <h2 className="red">63</h2>
        </div>

      </div>

      {/* ===== CHARTS ===== */}

      <div className="charts-grid">

        {/* PIE CHART */}

        <div className="chart-card">

          <h2>Platform Overview</h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >

            <PieChart>

              <Pie
                data={pieData}

                dataKey="value"

                cx="50%"
                cy="50%"

                outerRadius={100}

                label
              >

                {pieData.map((entry, index) => (

                  <Cell
                    key={index}
                    fill={
                      COLORS[index % COLORS.length]
                    }
                  />

                ))}

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>

        {/* LINE CHART */}

        <div className="chart-card">

          <h2>Monthly Sales</h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >

            <LineChart data={lineData}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip />

              <Legend />

              <Line
                type="monotone"

                dataKey="sales"

                stroke="#38bdf8"

                strokeWidth={3}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>
  );
}