import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";

import { getPurchasedProjects, createOrder } from "../api/orderApi";
import { downloadProject } from "../api/downloadApi";
import { createPayment } from "../api/paymentApi";
import { getAllProjects } from "../api/projectApi";

import axios from "../api/axiosConfig";

import { getRole } from "../utils/auth";

import "../styles/projects.css";

export default function Projects() {

  const [projects, setProjects] = useState([]);

  const [filteredProjects, setFilteredProjects] = useState([]);

  const [search, setSearch] = useState("");

  const [purchased, setPurchased] = useState([]);

  const [loading, setLoading] = useState(true);

  const [processingId, setProcessingId] = useState(null);

  const role = getRole();

  useEffect(() => {
    loadData();
  }, []);

  /* ===== SEARCH FILTER ===== */

  useEffect(() => {

    const filtered = projects.filter((p) =>
      p.title.toLowerCase()
        .includes(search.toLowerCase())
    );

    setFilteredProjects(filtered);

  }, [search, projects]);

  const loadData = async () => {

    try {

      const data = await getAllProjects();

      setProjects(data);

      setFilteredProjects(data);

      if (
        localStorage.getItem("token")
        && role === "USER"
      ) {

        const purchasedIds =
          await getPurchasedProjects();

        setPurchased(purchasedIds);
      }

    } catch (err) {

      console.error(
        "Project load failed",
        err
      );

    } finally {

      setLoading(false);
    }
  };

  const handleBuy = async (project) => {

    try {

      setProcessingId(project.projectId);

      const order =
        await createOrder(project.projectId);

      const payment =
        await createPayment(
          order.orderId,
          project.price
        );

      const rzp = new window.Razorpay({

        key: "rzp_test_SwMTMsVbQxARmd",

        amount: payment.amount * 100,

        currency: "INR",

        order_id: payment.razorpayOrderId,

        name: "Readx",

        description: project.title,

        handler: async function (response) {

          try {

            await axios.post(
              "/api/payments/verify",
              {
                razorpay_order_id:
                  response.razorpay_order_id,

                razorpay_payment_id:
                  response.razorpay_payment_id,

                razorpay_signature:
                  response.razorpay_signature,
              }
            );

            alert(
              "Payment Successful 🎉"
            );

            await loadData();

          } catch (err) {

            alert(
              "Payment verification failed"
            );
          }
        },

        theme: {
          color: "#2563eb",
        },
      });

      rzp.open();

    } catch (err) {

      alert(
        "Please login as USER to buy project"
      );

    } finally {

      setProcessingId(null);
    }
  };

  const handleDownload = async (id) => {

    try {

      const res =
        await downloadProject(id);

      const url =
        window.URL.createObjectURL(
          new Blob([res.data])
        );

      const link =
        document.createElement("a");

      link.href = url;

      link.setAttribute(
        "download",
        "project.zip"
      );

      document.body.appendChild(link);

      link.click();

    } catch (err) {

      alert(
        "Download failed or not purchased"
      );
    }
  };

  if (loading)
    return <h2>Loading projects...</h2>;

  return (

    <>
      {/* ===== NAVBAR ===== */}

      <Navbar
        search={search}
        setSearch={setSearch}
      />

      <div className="page-container">

        <h1>
          Available Projects
        </h1>

        <div className="project-grid">

          {filteredProjects.map((p) => (

            <div
              key={p.projectId}
              className="project-card"
            >

              <img
                src={`http://localhost:8082/api/projects/image/${p.projectId}`}

                className="project-img"

                alt="project"

                onError={(e) => {
                  e.target.src =
                    "/default.png";
                }}
              />

              <h3>{p.title}</h3>

              <p>{p.description}</p>

              <p className="price">
                ₹{p.price}
              </p>

              {role === "ADMIN" ? (

                <p
                  style={{
                    color: "yellow",
                  }}
                >
                  Admin cannot buy
                  or download
                </p>

              ) : purchased.includes(
                p.projectId
              ) ? (

                <button
                  className="download-btn"

                  onClick={() =>
                    handleDownload(
                      p.projectId
                    )
                  }
                >
                  Download
                </button>

              ) : (

                <button
                  className="buy-btn"

                  disabled={
                    processingId ===
                    p.projectId
                  }

                  onClick={() =>
                    handleBuy(p)
                  }
                >
                  {processingId ===
                  p.projectId
                    ? "Processing..."
                    : "Buy Now"}
                </button>

              )}

            </div>
          ))}

        </div>

      </div>
    </>
  );
}
