const Anchor = ({ href, children }: any) => {
  return (
    <a
      href={href}
      className="anchor-link"
      style={{ textDecoration: "underline", fontWeight: "bold" }}
    >
      {children}
    </a>
  );
};

export default Anchor;
