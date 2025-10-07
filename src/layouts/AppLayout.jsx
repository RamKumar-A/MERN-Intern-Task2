import { Outlet, useLocation } from 'react-router-dom';
import FilterBar from '../components/FilterBar';
import Header from '../components/Header';

function AppLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 ">
      <div className="lg:max-w-[85%] mx-auto">
        <div className="mt-4 sm:px-1">
          <Header />
        </div>
        <div className="w-full bg-gray-600 h-[1px] mt-4"></div>
        {/* hides the filter bar on movie detail pages (assuming IMDb IDs contain
        "tt") */}
        <div className={location.pathname.includes('tt') ? 'hidden' : ''}>
          <FilterBar />
        </div>
        <main className="">
          {/* placeholder where nested route components render */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
