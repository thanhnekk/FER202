import React from "react";
import "../style/Banner.css";

const Banner = () => {
  return (
    <div className="banner-container">
      <img
        src="../assets/user/image/banner02.png"
        alt="banner02"
        style={{ width: "30%", height: "40vh", padding: "20px" }}
      />
      <img
        src="../assets/user/image/banner01.png"
        alt="banner01"
        style={{ width: "30%", height: "60vh" }}
      />
      <div className="banner-content">
        <h1 className="banner-text">𝐇𝐄𝐑 𝐒𝐘𝐌𝐏𝐇𝐎𝐍𝐘</h1>
        <hr
          style={{
            width: "50px",
            height: "1px",
            backgroundColor: "#000",
            border: "none",
            marginBottom: "20px",
          }}
        />
        <p className="banner-paragraph">
          Trong từng nếp gấp của vải ren, một câu chuyện huyền diệu được dệt
          nên, nơi mà sự dịu dàng và quyến rũ hòa quyện trong không gian lãng
          mạn của mùa Thu. 𝐇𝐄𝐑 𝐒𝐘𝐌𝐏𝐇𝐎𝐍𝐘 là bản hòa tấu của sự tinh tế, tôn vinh
          vẻ đẹp của người phụ nữ hiện đại nhưng vẫn giữ nguyên nét quyến rũ cổ
          điển.
        </p>
        <p className="banner-paragraph">
          Mỗi chiếc đầm ren không chỉ là một món trang phục, mà là một tác phẩm
          nghệ thuật, khắc họa nét duyên dáng và nữ tính của từng cô gái.
        </p>
        <p className="banner-paragraph">
          𝐇𝐄𝐑 𝐒𝐘𝐌𝐏𝐇𝐎𝐍𝐘 là món quà từ chúng tôi dành tặng đến những quý cô, là
          bức tranh tuyệt đẹp khắc họa cá tính và phong cách riêng biệt.
        </p>
        <p className="signature">EvaLove</p>
      </div>
    </div>
  );
};

export default Banner;
