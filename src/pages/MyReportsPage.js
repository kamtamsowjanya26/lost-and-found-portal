// src/pages/MyReportsPage.js
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useMyInterests } from '../hooks/useInterests';

export default function MyReportsPage() {
  const user = useAuth();
  const {
    data: interests,
    isPending,
    isError,
  } = useMyInterests(user?.id);

  if (isPending) {
    return (
      <div className="page">
        <h1 className="page-title">My Reports</h1>
        <p>Loading your interested items...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="page">
        <h1 className="page-title">My Reports</h1>
        <p className="error">Could not load your reports. Please try again.</p>
      </div>
    );
  }

  const safeInterests = interests || [];

  return (
    <div className="page">
      <h1 className="page-title">My Reports</h1>
      <p className="page-subtitle">
        Items you&apos;ve marked with &quot;I&apos;m interested&quot;.
      </p>

      {safeInterests.length === 0 ? (
        <p>You haven&apos;t marked interest in any items yet.</p>
      ) : (
        <div className="grid">
          {safeInterests.map((interest) => {
            const item = interest.item || {};
            const imageSrc =
              item.imageUrl ||
              'https://via.placeholder.com/600x350?text=Campus+Lost+%26+Found+Item';

            return (
              <div className="card" key={interest.id}>
                <div className="card-image-wrapper">
                  <img
                    src={imageSrc}
                    alt={item.title}
                    className="card-image"
                  />
                </div>

                <h2 className="card-title">
                  {item.title || `Item ${interest.itemId}`}
                </h2>

                <p className="card-meta">
                  {item.status && (
                    <span className={`badge badge-${item.status}`}>
                      {item.status}
                    </span>
                  )}
                  {item.category && (
                    <span className="category-pill">{item.category}</span>
                  )}
                  {item.location && (
                    <span className="card-location">@ {item.location}</span>
                  )}
                </p>

                <p className="card-description">
                  {item.description || 'No description available.'}
                </p>

                <p className="card-meta">
                  Interest status: <strong>{interest.status}</strong>
                </p>

                <Link
                  to={`/items/${interest.itemId}`}
                  className="btn btn-secondary"
                >
                  View item
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
