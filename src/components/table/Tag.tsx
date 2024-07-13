interface TagProps {
  text: string;
}

const Tag: React.FC<TagProps> = ({ text }) => {
  const colors: { [key: string]: string } = {
    'Content Type: Video': 'bg-green-100 text-green-800',
    'Content Type: Webinar': 'bg-yellow-100 text-yellow-800',
    'Content Type: Podcast': 'bg-blue-100 text-blue-800',
    'Audience: Developer/Technical': 'bg-purple-100 text-purple-800',
    eCommerce: 'bg-red-100 text-red-800',
    // Add more tag-specific colors here
    default: 'bg-gray-100 text-gray-800',
  };

  const colorClass = colors[text] || colors['default'];

  return (
    <span
      className={`inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium ${colorClass}`}
    >
      {text}
    </span>
  );
};

export default Tag;
