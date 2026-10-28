
export default function Logo({ size = 28, showName = true }) {
  return (
    <span className="brand-logo">
      <img
        className="brand-logo__image"
        src="/images/logo.png"
        alt=""
        width={size}
        height={size}
        draggable={false}
      />
      {showName && <span className="brand-logo__name">MAKIIA</span>}
    </span>
  );
}
