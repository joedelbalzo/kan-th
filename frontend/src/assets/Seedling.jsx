import React from "react";

const Seedling = ({ width, height }) => {
  return (
    <svg
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 24 24"
      role="img"
      aria-label="Image of tree seedling."
      xmlSpace="preserve"
      style={{
        display: "inline-block",
        verticalAlign: "middle",
        color: "none",
        width: width,
        height: height,
      }}
    >
      <path
        d="M5 7.42574C5.10323 8.88053 5.60831 10.2781 6.459 11.4627C6.73632 11.8142 7.069 12.1182 7.444 12.3627C7.82676 12.5813 8.24359 12.7337 8.677 12.8137C10.0658 12.9986 11.4781 12.7588 12.728 12.1257C12.6258 10.6697 12.121 9.27064 11.27 8.08474C10.9927 7.73328 10.66 7.4293 10.285 7.18474C9.90205 6.96728 9.48523 6.81583 9.052 6.73674C7.66275 6.55194 6.25009 6.79215 5 7.42574Z"
        stroke="#183333"
        strokeWidth="1.4"
        // fill="#e8ebf2"
        fill="none"
      ></path>{" "}
      <path
        d="M13.479 4.87579C13.479 4.46158 13.1432 4.12579 12.729 4.12579C12.3148 4.12579 11.979 4.46158 11.979 4.87579H13.479ZM11.979 8.95579C11.979 9.37001 12.3148 9.70579 12.729 9.70579C13.1432 9.70579 13.479 9.37001 13.479 8.95579H11.979ZM11.979 20.0138C11.979 20.428 12.3148 20.7638 12.729 20.7638C13.1432 20.7638 13.479 20.428 13.479 20.0138H11.979ZM13.479 8.95579C13.479 8.54158 13.1432 8.20579 12.729 8.20579C12.3148 8.20579 11.979 8.54158 11.979 8.95579H13.479ZM12.8226 9.91866C12.4116 9.86697 12.0366 10.1582 11.9849 10.5692C11.9332 10.9802 12.2244 11.3552 12.6354 11.4069L12.8226 9.91866ZM16.56 10.0138L16.8935 10.6856C16.9015 10.6816 16.9094 10.6775 16.9172 10.6733L16.56 10.0138ZM17.608 9.22779L18.1411 9.75538C18.1501 9.74622 18.1589 9.73684 18.1675 9.72723L17.608 9.22779ZM18.349 8.11379L19.0259 8.43678C19.0294 8.42953 19.0327 8.42223 19.0359 8.41488L18.349 8.11379ZM18.964 4.05179L19.7093 3.96754C19.6703 3.62328 19.4007 3.35047 19.0569 3.30757L18.964 4.05179ZM15.133 4.70479L14.7988 4.03336C14.7911 4.03722 14.7834 4.04121 14.7758 4.04533L15.133 4.70479ZM14.085 5.49079L13.5519 4.96321C13.5431 4.97219 13.5344 4.98139 13.526 4.99081L14.085 5.49079ZM13.344 6.60179L12.6676 6.27777L12.6641 6.28526L13.344 6.60179ZM11.9821 8.89989C11.9512 9.31296 12.261 9.67283 12.6741 9.70371C13.0872 9.73458 13.447 9.42476 13.4779 9.01169L11.9821 8.89989ZM11.979 4.87579V8.95579H13.479V4.87579H11.979ZM13.479 20.0138V8.95579H11.979V20.0138H13.479ZM12.6354 11.4069C14.0948 11.5905 15.5759 11.3396 16.8935 10.6856L16.2265 9.342C15.1733 9.86481 13.9893 10.0654 12.8226 9.91866L12.6354 11.4069ZM16.9172 10.6733C17.368 10.4291 17.7804 10.1198 18.1411 9.75538L17.0749 8.70021C16.8179 8.9599 16.524 9.1803 16.2028 9.35433L16.9172 10.6733ZM18.1675 9.72723C18.5133 9.33988 18.8023 8.90539 19.0259 8.43678L17.6721 7.79081C17.5097 8.13127 17.2997 8.44693 17.0485 8.72836L18.1675 9.72723ZM19.0359 8.41488C19.6483 7.01767 19.8806 5.48342 19.7093 3.96754L18.2188 4.13605C18.3604 5.38924 18.1684 6.65762 17.6621 7.81271L19.0359 8.41488ZM19.0569 3.30757C17.597 3.12538 16.1159 3.37785 14.7988 4.03336L15.4672 5.37623C16.5201 4.8522 17.7041 4.65038 18.8711 4.79602L19.0569 3.30757ZM14.7758 4.04533C14.325 4.28953 13.9126 4.59881 13.5519 4.96321L14.6181 6.01838C14.8751 5.75869 15.169 5.53828 15.4902 5.36426L14.7758 4.04533ZM13.526 4.99081C13.1805 5.3771 12.8915 5.8104 12.6676 6.27779L14.0204 6.9258C14.1831 6.58623 14.393 6.27143 14.644 5.99078L13.526 4.99081ZM12.6641 6.28526C12.2808 7.10851 12.0498 7.99434 11.9821 8.89989L13.4779 9.01169C13.5321 8.28667 13.7171 7.57745 14.0239 6.91832L12.6641 6.28526Z"
        fill="#183333"
      ></path>
    </svg>
  );
};

Seedling.defaultProps = {
  width: "200px",
  height: "200px",
};

export default Seedling;
// from https://www.svgrepo.com/collection/xnix-circular-interface-icons/