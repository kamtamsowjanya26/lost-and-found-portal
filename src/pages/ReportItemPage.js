// src/pages/ReportItemPage.js
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useCreateItem } from '../hooks/useCreateItem';

// Validation schema
const reportSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  status: Yup.string().oneOf(['lost', 'found']).required('Status is required'),
  category: Yup.string().required('Category is required'),
  location: Yup.string().required('Location is required'),
  description: Yup.string().required('Description is required'),
  tags: Yup.string().optional(),
  imageUrl: Yup.string()
    .url('Please enter a valid URL')
    .optional(),
});

export default function ReportItemPage() {
  const navigate = useNavigate();
  const user = useAuth();
  const createItemMutation = useCreateItem();

  return (
    <div className="page">
      <h1 className="page-title">Report a Lost / Found Item</h1>
      <p className="page-subtitle">
        Fill out the details below to add a new item to the campus lost &amp; found list.
      </p>

      <div className="form-card">
        <Formik
          initialValues={{
            title: '',
            status: 'found',
            category: '',
            location: '',
            description: '',
            tags: '',
            imageUrl: '',
          }}
          validationSchema={reportSchema}
          onSubmit={async (values, { resetForm }) => {
            try {
              const created = await createItemMutation.mutateAsync(values);
              resetForm();
              navigate(`/items/${created.id}`);
            } catch (err) {
              // errors handled by isError
            }
          }}
        >
          <Form>
            {/* Title */}
            <div className="form-field">
              <label htmlFor="title" className="form-label">
                Item title
              </label>
              <Field
                id="title"
                name="title"
                placeholder="e.g. Black laptop bag"
                className="form-input"
              />
              <ErrorMessage name="title" component="div" className="form-error" />
            </div>

            {/* Status */}
            <div className="form-field">
              <label htmlFor="status" className="form-label">
                Status
              </label>
              <Field as="select" id="status" name="status" className="form-input">
                <option value="found">Found</option>
                <option value="lost">Lost</option>
              </Field>
              <ErrorMessage name="status" component="div" className="form-error" />
            </div>

            {/* Category */}
            <div className="form-field">
              <label htmlFor="category" className="form-label">
                Category
              </label>
              <Field
                id="category"
                name="category"
                placeholder="Electronics, Clothing, ID card..."
                className="form-input"
              />
              <ErrorMessage name="category" component="div" className="form-error" />
            </div>

            {/* Location */}
            <div className="form-field">
              <label htmlFor="location" className="form-label">
                Location
              </label>
              <Field
                id="location"
                name="location"
                placeholder="Where was it lost / found?"
                className="form-input"
              />
              <ErrorMessage name="location" component="div" className="form-error" />
            </div>

            {/* Description */}
            <div className="form-field">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <Field
                as="textarea"
                id="description"
                name="description"
                placeholder="Brief description, color, special marks..."
                className="form-input"
                rows={3}
              />
              <ErrorMessage
                name="description"
                component="div"
                className="form-error"
              />
            </div>

            {/* Tags */}
            <div className="form-field">
              <label htmlFor="tags" className="form-label">
                Tags (optional)
              </label>
              <Field
                id="tags"
                name="tags"
                placeholder="e.g. black, dell, zipper (comma separated)"
                className="form-input"
              />
              <ErrorMessage name="tags" component="div" className="form-error" />
            </div>

            {/* Image URL */}
            <div className="form-field">
              <label htmlFor="imageUrl" className="form-label">
                Image URL (optional)
              </label>
              <Field
                id="imageUrl"
                name="imageUrl"
                placeholder="Paste image link (e.g. from Google Drive / Imgur)"
                className="form-input"
              />
              <ErrorMessage
                name="imageUrl"
                component="div"
                className="form-error"
              />
            </div>

            {createItemMutation.isError && (
              <p className="error">
                Could not create item. Please try again.
              </p>
            )}

            <button
              type="submit"
              className="btn btn-primary"
              disabled={createItemMutation.isPending}
            >
              {createItemMutation.isPending ? 'Submitting...' : 'Submit item'}
            </button>
          </Form>
        </Formik>
      </div>

      {user && (
        <p className="page-subtitle">
          Logged in as: <strong>{user.name}</strong> ({user.email})
        </p>
      )}
    </div>
  );
}
