import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import api from "../api"; // ✅ Import directly

export default function Dashboard() {

  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(false);

  useEffect(() => {

    const fetchPortfolios = async () => {

      try {

        const res =
          await api.get("/portfolio/list");

        console.log(
          "API RESPONSE:",
          res.data
        );

        setData(res.data || []);

      } catch (err) {

        console.error(
          "FETCH ERROR:",
          err.response?.data || err.message
        );

        setError(true);

      } finally {

        setLoading(false);

      }

    };

    fetchPortfolios();

  }, []);

  if (error)

    return (

      <>
        <Navbar />

        <p className="text-center text-red-600 mt-10">
          Error loading portfolio
        </p>

      </>

    );

  if (loading)

    return (

      <>
        <Navbar />

        <p className="text-center text-gray-600 mt-10">
          Loading...
        </p>

      </>

    );

  return (

    <>

      <Navbar />

      <div className="max-w-5xl mx-auto p-6">

        <h2 className="text-3xl font-bold mb-6">
          Your Resumes
        </h2>

        {data.length === 0 ? (

          <p className="text-gray-500">
            No resumes created yet.
          </p>

        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {data.map((p) => (

              <div
                key={p._id}
                className="bg-white p-6 rounded-xl shadow-md border border-gray-200"
              >

                <h3 className="text-xl font-bold">
                  {p.name || "Untitled Resume"}
                </h3>

                <p className="text-gray-600 mt-2">

                  Created:{" "}

                  {p.createdAt

                    ? new Date(
                        p.createdAt
                      ).toLocaleDateString()

                    : "N/A"}

                </p>

              </div>

            ))}

          </div>

        )}

      </div>

    </>

  );

}