const TableHeader: React.FC = () => (
  <thead className='bg-gray-50'>
    <tr>
      <th
        scope='col'
        className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 hidden md:table-cell'
      >
        Posted Date
      </th>
      <th
        scope='col'
        className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
      >
        Network
      </th>
      <th
        scope='col'
        className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
      >
        Message
      </th>
      <th
        scope='col'
        className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
      >
        Tags
      </th>
    </tr>
  </thead>
);

export default TableHeader;
