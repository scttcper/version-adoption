import Link from 'next/link';
import { Spinner } from '../../../components/Spinner';

// The worst loading state
export default function Layout() {
  return (
    <div>
      <div className="mb-8 mt-8">
        <Link href="/" className="text-gray-700 font-semibold">
          Home
        </Link>
      </div>

      <p className="leading-7 text-lg">
        <span className="">Package:</span> Loading...
      </p>
      <p className="mb-10 leading-7 text-lg">
        <span className="">Downloads last 7 days:</span> Loading...
      </p>
      <h4 className="text-xl leading-10 mb-3">Major</h4>
      <Spinner />
      <h4 className="text-xl leading-10 mb-3">Minor</h4>
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
