import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [brandDetails, setbrandDetails] = useState({});
  const [result, setResult] = useState();
  const [loading, setLoading] = useState(false);

  async function onSubmit(event) {
    setLoading(true);
    event.preventDefault();
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(brandDetails),
    });
    const data = await response.json();
    setResult(data.result);
    setLoading(false);
  }

  async function onReset() {
    setbrandDetails({});
    setResult(null);
  }

  return (
    <div>
      <Head>
        <title>Brand Tag Line Maker</title>
        <link rel="icon" href="/logo.png" />
      </Head>

      <main className={styles.main}>
        <img src="/logo.png" className={styles.icon} />
        <h1>Brand Tag Line Finder</h1>
        <div style={{ display: "flex" }}>
          <form onSubmit={onSubmit}>
            <h3>Brand Details: </h3>
            <label for="brandName">Brand Name</label>
            <input
              type="text"
              id="brandName"
              name="brandName"
              placeholder="Brand Name"
              value={brandDetails?.brandName || ""}
              onChange={(e) =>
                setbrandDetails({ ...brandDetails, brandName: e.target.value })
              }
            />
            <label for="brandAdjective">Brand Adjective</label>
            <input
              type="text"
              id="brandAdjective"
              name="brandAdjective"
              placeholder="Word to prefix the brand name like new brand, emerging brand etc."
              value={brandDetails?.brandAdjective || ""}
              onChange={(e) =>
                setbrandDetails({
                  ...brandDetails,
                  brandAdjective: e.target.value,
                })
              }
            />
            <label for="brandAttributes">Brand Attributes</label>
            <input
              type="text"
              id="brandAttributes"
              name="brandAttributes"
              placeholder="CSV values for attributes like inovative, reliable, etc."
              value={brandDetails?.brandAttributes || ""}
              onChange={(e) =>
                setbrandDetails({
                  ...brandDetails,
                  brandAttributes: e.target.value.split(","),
                })
              }
            />
            {result ? (
              <button
                className={styles.formbtn}
                type="button"
                onClick={onSubmit}
              >
                Regenerate tagline
              </button>
            ) : (
              <button
                className={styles.formbtn}
                type="button"
                onClick={onSubmit}
              >
                Generate tagline
              </button>
            )}
            <button className={styles.formbtn} type="button" onClick={onReset}>
              Reset
            </button>
          </form>
          <div style={{ marginLeft: "32px" }}>
            <h3>Results: </h3>
            {loading ? (
              <img src="/loading.jpeg" className={styles.icon} />
            ) : (
              result &&
              result
                .split("\n")
                .filter((line) => line)
                .map((line) => <div className={styles.result}>{line}</div>)
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
