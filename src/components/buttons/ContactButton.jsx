import React from "react";

function ContactButton() {
  const handleClick = (e) => {
    e.preventDefault();
    window.location.href = "https://twitter.com/popuri23121932";
  };

  return (
    <div>
      <button onClick={handleClick} className="topButton">
        連絡
      </button>
    </div>
  );
}

export default ContactButton;
