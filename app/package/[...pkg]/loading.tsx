import Link from 'next/link';
import { Spinner } from '../../../components/Spinner';
import { IndexForm } from '../../form';

// The worst loading state
export default function Layout() {
  return (
    <div>
      <div className="mb-12 mt-8">
        <Link href="/" className="text-gray-700 font-semibold">
          Home
        </Link>
        <IndexForm />
      </div>

      <p className="leading-8 text-xl font-bold">Loading...</p>
      <p className="mb-10 leading-7">
        <span className="">Downloads last 7 days:</span> Loading...
      </p>
      <h4 className="text-lg leading-10 mb-3">Major</h4>
      <Spinner />
      <h4 className="text-lg leading-10 mb-3">Minor</h4>
      <Spinner />

      <p>
        <small>
          Downloads are from the last 7 days. Versions with less than 1% total downloads are not
          listed.
        </small>
      </p>
    </div>
  );
}
