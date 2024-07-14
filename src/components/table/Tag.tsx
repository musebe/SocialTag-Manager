interface TagProps {
  text: string;
  colorClass: string;
}

const Tag: React.FC<TagProps> = ({ text, colorClass }) => {
  return (
    <span
      className={`inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium ${colorClass}`}
    >
      {text}
    </span>
  );
};

export default Tag;
