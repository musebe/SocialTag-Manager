// src/utils/generateTagColors.ts

const colors = [
    'bg-green-100 text-green-800',
    'bg-yellow-100 text-yellow-800',
    'bg-blue-100 text-blue-800',
    'bg-purple-100 text-purple-800',
    'bg-red-100 text-red-800',
    'bg-gray-100 text-gray-800',
];

export const generateTagColors = (tags: { Id: string; Tag: string }[]) => {
    const tagColors: { [key: string]: string } = {};

    tags.forEach((tag, index) => {
        tagColors[tag.Id] = colors[index % colors.length];
    });

    return tagColors;
};
