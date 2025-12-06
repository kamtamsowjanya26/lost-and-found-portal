// src/pages/ItemDetailsPage.js
import { useParams, useNavigate } from 'react-router-dom';
import { useItem } from '../hooks/useItems';
import { useAuth } from '../hooks/useAuth';
import { useInterestMutation } from '../hooks/useInterests';
import { useClaimItem } from '../hooks/useClaimItem';

const DEFAULT_IMAGE_URL =
  'https://via.placeholder.com/600x350?text=Campus+Lost+%26+Found+Item';

export default function ItemDetailsPage() {
  const { id } = useParams();
  const { data: item, isPending, isError } = useItem(id);
  const user = useAuth();
  const navigate = useNavigate();

  const interestMutation = useInterestMutation(user?.id);
  const claimMutation = useClaimItem();

  if (isPending) {
    return (
      <div className="page">
        <h1 className="page-title">Item Details</h1>
        <p>Loading item...</p>
      </div>
    );
  }

  if (isError || !item) {
    return (
      <div className="page">
        <h1 className="page-title">Item Details</h1>
        <p className="error">Item not found.</p>
      </div>
    );
  }

  const handleInterestedClick = () => {
    if (!user) {
      navigate('/signin');
      return;
    }
    interestMutation.mutate(item.id);
  };

  const handleMarkClaimedClick = () => {
    if (!user) {
      navigate('/signin');
      return;
    }
    if (item.claimed) return;
    claimMutation.mutate(item.id);
  };

  const imageSrc = item.imageUrl || DEFAULT_IMAGE_URL;

  return (
    <div className="page">
      <h1 className="page-title">Item Details</h1>

      <div className="card">
        <img
          src={imageSrc}
          alt={item.title}
          className="details-image"
        />

        <h2 className="card-title">{item.title}</h2>

        <p className="card-meta">
          {item.status && (
            <span className={`badge badge-${item.status}`}>
              {item.status}
            </span>
          )}
          {item.location && (
            <span className="card-location">@ {item.location}</span>
          )}
        </p>

        <p className="card-description">
          {item.description || 'No description available.'}
        </p>

        <p className="card-meta">
          Claimed:{' '}
          <strong>
            {item.claimed ? 'Yes (returned)' : 'No (still pending)'}
          </strong>
        </p>

        <button
          onClick={handleInterestedClick}
          disabled={interestMutation.isPending}
          className="btn btn-primary"
        >
          {interestMutation.isPending ? 'Sending...' : "I'm interested"}
        </button>

        {interestMutation.isError && (
          <p className="error">
            Could not send your interest. Please try again.
          </p>
        )}

        {interestMutation.isSuccess && (
          <p className="success">We recorded your interest in this item.</p>
        )}

        <hr style={{ margin: '1rem 0' }} />

        <button
          onClick={handleMarkClaimedClick}
          disabled={claimMutation.isPending || item.claimed}
          className="btn btn-secondary"
        >
          {item.claimed
            ? 'Already claimed'
            : claimMutation.isPending
            ? 'Marking...'
            : 'Mark as claimed'}
        </button>

        {claimMutation.isError && (
          <p className="error">
            Could not mark as claimed. Please try again.
          </p>
        )}

        {claimMutation.isSuccess && (
          <p className="success">Item marked as claimed.</p>
        )}
      </div>
    </div>
  );
}
