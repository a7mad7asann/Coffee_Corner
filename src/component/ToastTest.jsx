import React from "react";
import toast, { Toaster } from "react-hot-toast";

export default function ToastTest() {
  return (
    <div style={{ padding: "2rem" }}>
      <button
        onClick={() => toast.success("🎉 التوست شغال!")}
        style={{
          padding: "10px 20px",
          backgroundColor: "#f97316",
          color: "white",
          border: "none",
          borderRadius: "8px",
        }}
      >
        جرّب التوست
      </button>

      <Toaster position="top-right" />
    </div>
  );
}
