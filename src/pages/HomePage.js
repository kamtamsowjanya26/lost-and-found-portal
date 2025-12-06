// src/pages/HomePage.js
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useItems } from '../hooks/useItems';

const DEFAULT_IMAGE_URL =
  'https://via.placeholder.com/600x350?text=Campus+Lost+%26+Found+Item';

export default function HomePage() {
  const { data: items, isPending, isError } = useItems();
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const safeItems = items || [];

  const filteredItems = safeItems.filter((item) => {
    const q = query.toLowerCase().trim();

    const matchesQuery =
      !q ||
      item.title.toLowerCase().includes(q) ||
      (item.location && item.location.toLowerCase().includes(q));

    const matchesStatus =
      statusFilter === 'all' || item.status === statusFilter;

    return matchesQuery && matchesStatus;
  });

  if (isPending) {
    return (
      <div className="page">
        <h1 className="page-title">Campus Lost &amp; Found</h1>
        <p>Loading items...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="page">
        <h1 className="page-title">Campus Lost &amp; Found</h1>
        <p className="error">Failed to load items. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="page">
      <h1 className="page-title">Campus Lost &amp; Found</h1>
      <p className="page-subtitle">
        Browse and filter lost and found items reported across the campus.
      </p>

      {/* Search + filter toolbar */}
      <div className="toolbar">
        <div className="toolbar-group">
          <span className="toolbar-label">Search</span>
          <input
            className="search-input"
            placeholder="Water bottle, ID card, hoodie..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="toolbar-group">
          <span className="toolbar-label">Status</span>
          <select
            className="select-input"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="lost">Lost</option>
            <option value="found">Found</option>
          </select>
        </div>
      </div>

      {filteredItems.length === 0 ? (
        <p>No items match your search/filter.</p>
      ) : (
        <div className="grid">
          {filteredItems.map((item) => {
            const imageSrc = item.imageUrl || DEFAULT_IMAGE_URL;
            return (
              <div className="card" key={item.id}>
                <div className="card-image-wrapper">
                  <img
                    src={imageSrc}
                    alt={item.title}
                    className="card-image"
                  />
                </div>

                <h2 className="card-title">{item.title}</h2>

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

                <Link
                  to={`/items/${item.id}`}
                  className="btn btn-primary"
                >
                  View details
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
