
import logo from "../../assets/makiia-logo.png";

export default function Logo({ size = 28, showName = true }) {
  return (
    <span className="brand-logo">
      <img
        className="brand-logo__image"
        src={logo}
        alt=""
        width={size}
        height={size}
        draggable={false}
      />
      {showName && <span className="brand-logo__name">MAKIIA</span>}
    </span>
  );
}
