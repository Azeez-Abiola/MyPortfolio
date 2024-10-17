   // src/components/Preloader.jsx
   import React from 'react';

   const Preloader = () => {
     return (
       <div className="fixed inset-0 flex items-center justify-center bg-[#111827] text-white z-50">
         <div className="relative flex items-center justify-center">
           <div className="absolute w-20 h-20 border-4 border-white rounded-full animate-pulse"></div>
           <div className="text-4xl font-bold">&lt;AA/&gt;</div>
         </div>
       </div>
     );
   };

   export default Preloader;