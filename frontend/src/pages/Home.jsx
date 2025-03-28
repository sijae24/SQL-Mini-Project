import { BookOpenIcon, UsersIcon, CalendarIcon, GiftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const Home = ({ user }) => {
  return (
    <div className="container mx-auto px-4">
      {/* Hero Section */}
      <div className="hero min-h-[400px] bg-base-300 rounded-lg mb-8">
        <div className="hero-content text-center">
          <div className="px-4 sm:px-8">
            <h1 className="text-4xl sm:text-5xl font-bold text-primary">
              Welcome to Our Library{user ? `, ${user.name}` : ""}
            </h1>
            <p className="py-4 sm:py-6 max-w-full sm:max-w-md mx-auto">
              Discover our vast collection of books, attend amazing events, and join our community of readers.
            </p>
            <Link to="/browse" className="btn btn-primary btn-lg hover:bg-secondary ">
              Get Started
              <ArrowRightIcon className="h-5 w-5 ml-2" />
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Link to="/browse" className="card bg-base-200 shadow-xl transition-transform hover:transform hover:scale-105">
          <div className="card-body items-center text-center">
            <BookOpenIcon className="h-12 w-12 text-primary mb-4" />
            <h2 className="card-title">Find Items</h2>
            <p>Search our vast collection of books and resources</p>
            <button className="btn btn-primary hover:btn-secondary mt-4">Browse Books</button>
          </div>
        </Link>

        <Link to="/events" className="card bg-base-200 shadow-xl transition-transform hover:transform hover:scale-105">
          <div className="card-body items-center text-center">
            <CalendarIcon className="h-12 w-12 text-primary mb-4" />
            <h2 className="card-title">Join Events</h2>
            <p>Participate in workshops and community events</p>
            <button className="btn btn-primary hover:btn-secondary mt-4">View Events</button>
          </div>
        </Link>

        <Link to="/volunteer" className="card bg-base-200 shadow-xl transition-transform hover:transform hover:scale-105">
          <div className="card-body items-center text-center">
            <UsersIcon className="h-12 w-12 text-primary mb-4" />
            <h2 className="card-title">Volunteer</h2>
            <p>Join our team of volunteers</p>
            <button className="btn btn-primary hover:btn-secondary mt-4">Volunteer</button>
          </div>
        </Link>

        <Link to="/donate" className="card bg-base-200 shadow-xl transition-transform hover:transform hover:scale-105">
          <div className="card-body items-center text-center">
            <GiftIcon className="h-12 w-12 text-primary mb-4" />
            <h2 className="card-title">Donate</h2>
            <p>Contribute to our growing collection</p>
            <button className="btn btn-primary hover:btn-secondary mt-4">Donate Now</button>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Home;

