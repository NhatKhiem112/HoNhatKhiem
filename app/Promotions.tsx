import React from 'react';

const Promotions: React.FC = () => {
  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold text-center mb-6">Khuyến Mãi Đặc Biệt</h2> {/* Title for promotions */}
      
      {/* Promotion items */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* First promotion */}
        <div className="bg-white shadow-md rounded-lg p-4 transition-transform transform hover:scale-105"> {/* Added hover effect */}
          <img src="https://via.placeholder.com/300x200" alt="Promotion 1" className="w-full h-48 object-cover rounded-md"/>
          <h3 className="text-lg font-semibold mt-4">Bữa Xế Đậm Đà</h3>
          <p className="text-gray-600 mt-2">1 Gà viên Popcorn (Lớn) + 1 Khoai tây múi cau (Vừa)</p>
          <div className="flex justify-between items-center mt-4">
            <span className="text-red-500 font-bold">69.000₫</span>
            <span className="text-gray-400 line-through">87.000₫</span>
          </div>
          <button className="bg-red-500 text-white w-full py-2 mt-4 rounded-full hover:bg-red-600 transition duration-200">Thêm</button>
        </div>

        {/* Second promotion */}
        <div className="bg-white shadow-md rounded-lg p-4 transition-transform transform hover:scale-105"> {/* Added hover effect */}
          <img src="https://via.placeholder.com/300x200" alt="Promotion 2" className="w-full h-48 object-cover rounded-md"/>
          <h3 className="text-lg font-semibold mt-4">Bữa Xế Ngọt Ngào</h3>
          <p className="text-gray-600 mt-2">4 Bánh trứng + 4 Phô mai viên + 2 trà Lipton (Lớn)</p>
          <div className="flex justify-between items-center mt-4">
            <span className="text-red-500 font-bold">99.000₫</span>
            <span className="text-gray-400 line-through">128.000₫</span>
          </div>
          <button className="bg-red-500 text-white w-full py-2 mt-4 rounded-full hover:bg-red-600 transition duration-200">Thêm</button>
        </div>
      </div>
    </div>
  );
};

export default Promotions;
